<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FloodZoneSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminId = User::query()->where('email', 'admin@bedengan.test')->value('id');

        foreach ([
            [
                'name' => 'Zona Risiko Tinggi Sungai Bedengan',
                'risk_level' => 'high',
                'description' => 'Area terdekat dengan aliran sungai yang berpotensi terdampak cepat saat debit air meningkat tajam.',
                'geojson' => [
                    'type' => 'Feature',
                    'properties' => [
                        'label' => 'Risiko Tinggi',
                    ],
                    'geometry' => [
                        'type' => 'Polygon',
                        'coordinates' => [[
                            [112.8228000, -7.9136000],
                            [112.8242000, -7.9136000],
                            [112.8242000, -7.9122000],
                            [112.8228000, -7.9122000],
                            [112.8228000, -7.9136000],
                        ]],
                    ],
                ],
                'color' => '#DC2626',
                'status' => 'active',
            ],
            [
                'name' => 'Zona Risiko Sedang Camping Ground',
                'risk_level' => 'medium',
                'description' => 'Area transisi dari bantaran sungai ke camping ground yang perlu evakuasi bertahap jika status meningkat.',
                'geojson' => [
                    'type' => 'Feature',
                    'properties' => [
                        'label' => 'Risiko Sedang',
                    ],
                    'geometry' => [
                        'type' => 'Polygon',
                        'coordinates' => [[
                            [112.8239000, -7.9139000],
                            [112.8253000, -7.9139000],
                            [112.8253000, -7.9123000],
                            [112.8239000, -7.9123000],
                            [112.8239000, -7.9139000],
                        ]],
                    ],
                ],
                'color' => '#F59E0B',
                'status' => 'active',
            ],
            [
                'name' => 'Zona Risiko Rendah Area Parkir',
                'risk_level' => 'low',
                'description' => 'Area relatif aman dan dapat dijadikan titik kumpul awal untuk pengunjung saat proses evakuasi.',
                'geojson' => [
                    'type' => 'Feature',
                    'properties' => [
                        'label' => 'Risiko Rendah',
                    ],
                    'geometry' => [
                        'type' => 'Polygon',
                        'coordinates' => [[
                            [112.8248000, -7.9141000],
                            [112.8261000, -7.9141000],
                            [112.8261000, -7.9127000],
                            [112.8248000, -7.9127000],
                            [112.8248000, -7.9141000],
                        ]],
                    ],
                ],
                'color' => '#16A34A',
                'status' => 'active',
            ],
        ] as $zone) {
            DB::table('flood_zones')->updateOrInsert(
                ['name' => $zone['name']],
                [
                    'risk_level' => $zone['risk_level'],
                    'description' => $zone['description'],
                    'geojson' => json_encode($zone['geojson'], JSON_UNESCAPED_SLASHES),
                    'color' => $zone['color'],
                    'status' => $zone['status'],
                    'created_by' => $adminId,
                    'updated_at' => now(),
                ]
            );
        }
    }
}
