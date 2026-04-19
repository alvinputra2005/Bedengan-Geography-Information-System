<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EvacuationRouteSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminId = User::query()->where('email', 'admin@bedengan.test')->value('id');

        foreach ([
            [
                'name' => 'Rute Evakuasi Sungai ke Parkir Utama',
                'description' => 'Rute prioritas untuk mengarahkan pengunjung dari area sungai menuju titik kumpul parkir utama.',
                'start_point' => 'Tepi Sungai Bedengan',
                'end_point' => 'Area Parkir Utama',
                'geojson' => [
                    'type' => 'Feature',
                    'properties' => [
                        'label' => 'Rute 1',
                    ],
                    'geometry' => [
                        'type' => 'LineString',
                        'coordinates' => [
                            [112.8233000, -7.9133000],
                            [112.8239000, -7.9130000],
                            [112.8247000, -7.9127000],
                            [112.8256000, -7.9125000],
                        ],
                    ],
                ],
                'status' => 'active',
            ],
            [
                'name' => 'Rute Evakuasi Camping Ground ke Pos Jaga',
                'description' => 'Rute alternatif dari area tenda menuju pos jaga untuk koordinasi lanjutan.',
                'start_point' => 'Camping Ground Bedengan',
                'end_point' => 'Pos Jaga Bedengan',
                'geojson' => [
                    'type' => 'Feature',
                    'properties' => [
                        'label' => 'Rute 2',
                    ],
                    'geometry' => [
                        'type' => 'LineString',
                        'coordinates' => [
                            [112.8240000, -7.9135000],
                            [112.8245000, -7.9131000],
                            [112.8251000, -7.9128000],
                            [112.8258000, -7.9126000],
                        ],
                    ],
                ],
                'status' => 'active',
            ],
        ] as $route) {
            DB::table('evacuation_routes')->updateOrInsert(
                ['name' => $route['name']],
                [
                    'description' => $route['description'],
                    'start_point' => $route['start_point'],
                    'end_point' => $route['end_point'],
                    'geojson' => json_encode($route['geojson'], JSON_UNESCAPED_SLASHES),
                    'status' => $route['status'],
                    'created_by' => $adminId,
                    'updated_at' => now(),
                ]
            );
        }
    }
}
