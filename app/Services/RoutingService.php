<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class RoutingService
{
    public function getWalkingRoute(float $startLat, float $startLng, float $endLat, float $endLng): array
    {
        $baseUrl = rtrim((string) config('services.osrm.base_url'), '/');

        if ($baseUrl === '') {
            throw new RuntimeException('Routing service belum dikonfigurasi. Atur OSRM_BASE_URL pada environment.');
        }

        $url = sprintf(
            '%s/route/v1/foot/%s,%s;%s,%s',
            $baseUrl,
            $startLng,
            $startLat,
            $endLng,
            $endLat
        );

        try {
            $response = Http::timeout(10)->get($url, [
                'overview' => 'full',
                'geometries' => 'geojson',
                'steps' => 'false',
            ]);
        } catch (ConnectionException $exception) {
            throw new RuntimeException('Routing service tidak dapat dijangkau saat ini.');
        }

        if (! $response->successful()) {
            throw new RuntimeException('Routing service gagal merespons dengan data rute.');
        }

        $route = $response->json('routes.0');

        if (! $route || ! is_array($route)) {
            throw new RuntimeException('Routing service tidak mengembalikan rute yang valid.');
        }

        $coordinates = collect($route['geometry']['coordinates'] ?? [])
            ->map(fn ($coordinate) => [isset($coordinate[1]) ? (float) $coordinate[1] : 0.0, isset($coordinate[0]) ? (float) $coordinate[0] : 0.0])
            ->values()
            ->all();

        return [
            'distance_meters' => (float) ($route['distance'] ?? 0),
            'duration_seconds' => (float) ($route['duration'] ?? 0),
            'coordinates' => $coordinates,
        ];
    }
}
