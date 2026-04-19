<?php

namespace Database\Seeders;

use App\Models\Bedengan;
use Illuminate\Database\Seeder;

class BedenganSeeder extends Seeder
{
    public function run(): void
    {
        $bedengans = [
            [
                'name' => 'Bedengan A',
                'slug' => 'bedengan-a',
                'description' => 'Area pinus dekat akses utama dengan kontur relatif datar.',
                'access_lat' => -7.9396440,
                'access_lng' => 112.5310382,
                'polygon_json' => [
                    [-7.9398100, 112.5307900],
                    [-7.9394500, 112.5308200],
                    [-7.9394200, 112.5312400],
                    [-7.9397600, 112.5312600],
                ],
            ],
            [
                'name' => 'Bedengan B',
                'slug' => 'bedengan-b',
                'description' => 'Bedengan sisi tengah dengan akses dekat jalur setapak.',
                'access_lat' => -7.8846400,
                'access_lng' => 112.5521200,
                'polygon_json' => [
                    [-7.8847900, 112.5519000],
                    [-7.8844700, 112.5519200],
                    [-7.8844600, 112.5523100],
                    [-7.8847500, 112.5523400],
                ],
            ],
            [
                'name' => 'Bedengan C',
                'slug' => 'bedengan-c',
                'description' => 'Area atas dengan pandangan lapang dan akses tangga kayu.',
                'access_lat' => -7.8849400,
                'access_lng' => 112.5525800,
                'polygon_json' => [
                    [-7.8850900, 112.5523300],
                    [-7.8847900, 112.5523500],
                    [-7.8847800, 112.5527600],
                    [-7.8850700, 112.5527800],
                ],
            ],
            [
                'name' => 'Bedengan D',
                'slug' => 'bedengan-d',
                'description' => 'Area timur yang cocok untuk orientasi jalur wisata.',
                'access_lat' => -7.8852200,
                'access_lng' => 112.5530000,
                'polygon_json' => [
                    [-7.8853500, 112.5527900],
                    [-7.8850700, 112.5528100],
                    [-7.8850500, 112.5531800],
                    [-7.8853200, 112.5532200],
                ],
            ],
            [
                'name' => 'Bedengan E',
                'slug' => 'bedengan-e',
                'description' => 'Area ujung selatan dengan ruang putar yang lebih lega.',
                'access_lat' => -7.8855200,
                'access_lng' => 112.5533800,
                'polygon_json' => [
                    [-7.8856800, 112.5531300],
                    [-7.8853500, 112.5531500],
                    [-7.8853400, 112.5535700],
                    [-7.8856500, 112.5536000],
                ],
            ],
        ];

        foreach ($bedengans as $bedengan) {
            Bedengan::query()->updateOrCreate(
                ['slug' => $bedengan['slug']],
                $bedengan + ['is_active' => true]
            );
        }
    }
}
