<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    protected const DASHBOARD_CACHE_KEY = 'admin_dashboard_payload_v1';
    protected const DASHBOARD_CACHE_TTL_SECONDS = 30;

    public function show(Request $request): JsonResponse
    {
        Carbon::setLocale('id');

        $payload = Cache::remember(
            self::DASHBOARD_CACHE_KEY,
            now()->addSeconds(self::DASHBOARD_CACHE_TTL_SECONDS),
            fn () => $this->buildDashboardPayload()
        );

        return response()->json([
            'message' => 'Ringkasan admin berhasil dimuat.',
            'user' => $request->user()?->load('role:id,name'),
        ] + $payload);
    }

    protected function buildDashboardPayload(): array
    {
        $summary = [
            'registered_users' => DB::table('users')->count(),
            'active_sensors' => DB::table('sensors')->where('status', 'active')->count(),
            'total_sensors' => DB::table('sensors')->count(),
            'total_mitigation_reports' => DB::table('mitigation_contents')->where('status', 'published')->count(),
        ];

        $latestSensorReading = DB::table('sensor_readings as sr')
            ->join('sensors as s', 's.id', '=', 'sr.sensor_id')
            ->select([
                'sr.id',
                'sr.sensor_id',
                'sr.distance_cm',
                'sr.water_level_cm',
                'sr.status_level',
                'sr.recorded_at',
                's.device_id',
                's.name as sensor_name',
                's.status as sensor_status',
            ])
            ->orderByDesc('sr.recorded_at')
            ->first();

        $chart = $this->loadChartHistory($latestSensorReading?->sensor_id);

        return [
            'summary' => $summary,
            'monitoring' => $this->buildMonitoringPayload($latestSensorReading, $chart),
            'chart' => $chart->values()->all(),
            'sensors' => $this->loadSensorRows()->all(),
            'notifications' => $this->loadNotifications()->all(),
        ];
    }

    protected function loadChartHistory(?int $sensorId): Collection
    {
        if (! $sensorId) {
            return collect();
        }

        return DB::table('sensor_readings')
            ->where('sensor_id', $sensorId)
            ->orderByDesc('recorded_at')
            ->limit(12)
            ->get(['id', 'distance_cm', 'water_level_cm', 'status_level', 'recorded_at'])
            ->reverse()
            ->values()
            ->map(function ($reading) {
                return [
                    'id' => (string) $reading->id,
                    'jarakCm' => round((float) ($reading->water_level_cm ?? $reading->distance_cm ?? 0), 1),
                    'status' => $this->formatReadingStatus($reading->status_level),
                    'timestamp' => Carbon::parse($reading->recorded_at)->getTimestamp() * 1000,
                ];
            });
    }

    protected function buildMonitoringPayload(object|null $latestSensorReading, Collection $chart): array
    {
        $history = $chart->values();
        $current = $history->last();
        $previous = $history->count() > 1 ? $history->slice(-2, 1)->first() : null;
        $fallbackValue = round((float) ($latestSensorReading?->water_level_cm ?? $latestSensorReading?->distance_cm ?? 0), 1);

        return [
            'device_id' => $latestSensorReading?->device_id ?? 'sensor-bedengan-01',
            'sensor_name' => $latestSensorReading?->sensor_name ?? 'Sensor Sungai Bedengan',
            'status' => $current['status'] ?? $this->formatSensorTableStatus(
                $latestSensorReading?->sensor_status,
                $latestSensorReading?->status_level
            ),
            'jarak_cm' => $current['jarakCm'] ?? $fallbackValue,
            'delta_cm' => $current && $previous ? round($current['jarakCm'] - $previous['jarakCm'], 1) : 0,
            'average_increase_cm' => $this->calculateAverageIncrease($history),
            'last_recorded_at' => $latestSensorReading?->recorded_at
                ? Carbon::parse($latestSensorReading->recorded_at)->toIso8601String()
                : null,
            'source' => $latestSensorReading ? 'database' : 'empty',
        ];
    }

    protected function loadSensorRows(): Collection
    {
        $latestReadings = DB::table('sensor_readings')
            ->select('sensor_id', DB::raw('MAX(id) as latest_reading_id'))
            ->groupBy('sensor_id');

        return DB::table('sensors as s')
            ->leftJoinSub($latestReadings, 'latest_readings', function ($join) {
                $join->on('latest_readings.sensor_id', '=', 's.id');
            })
            ->leftJoin('sensor_readings as sr', 'sr.id', '=', 'latest_readings.latest_reading_id')
            ->select([
                's.device_id',
                's.name',
                's.latitude',
                's.longitude',
                's.status',
                's.last_seen_at',
                'sr.distance_cm',
                'sr.water_level_cm',
                'sr.status_level',
                'sr.recorded_at',
            ])
            ->orderByRaw("CASE WHEN s.status = 'active' THEN 0 WHEN s.status = 'maintenance' THEN 1 ELSE 2 END")
            ->orderBy('s.name')
            ->limit(6)
            ->get()
            ->map(function ($sensor) {
                $latestValue = $sensor->water_level_cm ?? $sensor->distance_cm;
                $latestTimestamp = $sensor->recorded_at ?: $sensor->last_seen_at;

                return [
                    'id' => $sensor->device_id,
                    'name' => $sensor->name,
                    'coords' => number_format((float) $sensor->latitude, 4, '.', '').', '.number_format((float) $sensor->longitude, 4, '.', ''),
                    'latest_value' => $latestValue !== null
                        ? number_format((float) $latestValue, 1, ',', '.').' cm'
                        : '-',
                    'status' => $this->formatSensorTableStatus($sensor->status, $sensor->status_level),
                    'last_update' => $latestTimestamp
                        ? Carbon::parse($latestTimestamp)->diffForHumans()
                        : 'Belum ada pembacaan',
                ];
            });
    }

    protected function loadNotifications(): Collection
    {
        return DB::table('alerts as a')
            ->leftJoin('sensors as s', 's.id', '=', 'a.sensor_id')
            ->select([
                'a.id',
                'a.title',
                'a.message',
                'a.alert_level',
                'a.started_at',
                's.name as sensor_name',
            ])
            ->orderByDesc('a.started_at')
            ->limit(4)
            ->get()
            ->map(function ($alert) {
                return [
                    'id' => $alert->id,
                    'title' => $alert->title ?: 'Alert sensor',
                    'description' => $alert->message ?: 'Ada pembaruan status sensor yang perlu diperiksa.',
                    'severity' => $alert->alert_level === 'danger' ? 'critical' : 'warning',
                    'time' => $alert->started_at
                        ? Carbon::parse($alert->started_at)->diffForHumans()
                        : 'Baru saja',
                ];
            });
    }

    protected function calculateAverageIncrease(Collection $history): float
    {
        if ($history->count() < 2) {
            return 0;
        }

        $positiveDiffs = collect();

        foreach ($history->values() as $index => $point) {
            if ($index === 0) {
                continue;
            }

            $previousValue = (float) ($history[$index - 1]['jarakCm'] ?? 0);
            $currentValue = (float) ($point['jarakCm'] ?? 0);
            $diff = round($currentValue - $previousValue, 1);

            if ($diff > 0) {
                $positiveDiffs->push($diff);
            }
        }

        return $positiveDiffs->isEmpty() ? 0 : round((float) $positiveDiffs->avg(), 1);
    }

    protected function formatReadingStatus(?string $statusLevel): string
    {
        return match ($statusLevel) {
            'safe' => 'Aman',
            'warning' => 'Waspada',
            'danger' => 'Bahaya',
            'error' => 'Gangguan',
            default => 'Belum ada data',
        };
    }

    protected function formatSensorOperationalStatus(?string $status): string
    {
        return match ($status) {
            'active' => 'Aktif',
            'maintenance' => 'Perawatan',
            'inactive' => 'Offline',
            default => 'Belum aktif',
        };
    }

    protected function formatSensorTableStatus(?string $sensorStatus, ?string $readingStatus): string
    {
        if ($sensorStatus !== 'active' || ! $readingStatus) {
            return $this->formatSensorOperationalStatus($sensorStatus);
        }

        return $this->formatReadingStatus($readingStatus);
    }
}
