<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Ringkasan admin berhasil dimuat.',
            'user' => $request->user()?->load('role:id,name'),
            'summary' => [
                'active_sensors' => 24,
                'total_sensors' => 25,
                'total_reports' => 1420,
                'report_trend' => '12%',
                'warning_status' => 'Waspada Angin',
                'warning_area' => 'Zona Pinus Utara',
            ],
            'sensors' => [
                [
                    'id' => 'SNS-001',
                    'name' => 'Jalur Sungai Timur',
                    'coords' => '-7.9231, 112.5478',
                    'type' => 'Ultrasonik',
                    'status' => 'Aktif',
                ],
                [
                    'id' => 'SNS-004',
                    'name' => 'Ground Keluarga A',
                    'coords' => '-7.9235, 112.5485',
                    'type' => 'Kelembapan Tanah',
                    'status' => 'Peringatan',
                ],
                [
                    'id' => 'SNS-010',
                    'name' => 'Pintu Masuk Selatan',
                    'coords' => '-7.9240, 112.5492',
                    'type' => 'Cuaca',
                    'status' => 'Aktif',
                ],
                [
                    'id' => 'SNS-013',
                    'name' => 'Pos Observasi Utara',
                    'coords' => '-7.9226, 112.5469',
                    'type' => 'Anemometer',
                    'status' => 'Offline',
                ],
            ],
            'notifications' => [
                [
                    'id' => 1,
                    'title' => 'Pembacaan angin meningkat',
                    'description' => 'Sensor angin pada Zona Pinus Utara naik 18% dari rata-rata harian.',
                    'severity' => 'warning',
                    'time' => '5 menit lalu',
                ],
                [
                    'id' => 2,
                    'title' => 'Ground A direkomendasikan',
                    'description' => 'Kondisi tanah stabil dan aman untuk area keluarga.',
                    'severity' => 'info',
                    'time' => '18 menit lalu',
                ],
                [
                    'id' => 3,
                    'title' => 'Sensor SNS-013 offline',
                    'description' => 'Koneksi terakhir terputus pada 09:42 WIB. Perlu pengecekan perangkat.',
                    'severity' => 'critical',
                    'time' => '42 menit lalu',
                ],
            ],
        ]);
    }
}
