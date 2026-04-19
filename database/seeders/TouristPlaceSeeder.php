<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TouristPlaceSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminId = User::query()->where('email', 'admin@bedengan.test')->value('id');

        foreach ([
            [
                'name' => 'Bumi Perkemahan Bedengan',
                'description' => 'Area wisata alam utama untuk berkemah, kegiatan keluarga, dan menikmati aliran sungai di Bedengan.',
                'address' => 'Jl. Raya Selokerto, Gubugklakah, Poncokusumo, Kabupaten Malang',
                'latitude' => -7.9124000,
                'longitude' => 112.8241000,
                'opening_hours' => '24 jam',
                'ticket_price' => 15000,
                'contact' => '0812-3456-7890',
                'photo_url' => '/images/Camping-Bumi-Perkemahan-Bedengan.webp',
                'status' => 'active',
            ],
            [
                'name' => 'Hutan Pinus Bedengan',
                'description' => 'Kawasan hutan pinus yang menjadi titik favorit untuk fotografi, piknik, dan tracking ringan.',
                'address' => 'Kawasan Wisata Bedengan, Gubugklakah, Poncokusumo, Kabupaten Malang',
                'latitude' => -7.9113000,
                'longitude' => 112.8224000,
                'opening_hours' => '07:00 - 17:00',
                'ticket_price' => 10000,
                'contact' => '0812-3456-7891',
                'photo_url' => '/images/Hutan-Pohon-Pinus.jpg',
                'status' => 'active',
            ],
            [
                'name' => 'Titik Foto Sungai Bedengan',
                'description' => 'Spot tepi sungai untuk menikmati pemandangan air dan pepohonan pinus di kawasan wisata Bedengan.',
                'address' => 'Area Sungai Bedengan, Gubugklakah, Poncokusumo, Kabupaten Malang',
                'latitude' => -7.9131000,
                'longitude' => 112.8235000,
                'opening_hours' => '06:00 - 18:00',
                'ticket_price' => 5000,
                'contact' => '0812-3456-7892',
                'photo_url' => '/images/Pohon-Pinus.jpg',
                'status' => 'active',
            ],
        ] as $place) {
            DB::table('tourist_places')->updateOrInsert(
                ['slug' => Str::slug($place['name'])],
                [
                    'name' => $place['name'],
                    'slug' => Str::slug($place['name']),
                    'description' => $place['description'],
                    'address' => $place['address'],
                    'latitude' => $place['latitude'],
                    'longitude' => $place['longitude'],
                    'opening_hours' => $place['opening_hours'],
                    'ticket_price' => $place['ticket_price'],
                    'contact' => $place['contact'],
                    'photo_url' => $place['photo_url'],
                    'status' => $place['status'],
                    'created_by' => $adminId,
                    'updated_at' => now(),
                ]
            );
        }
    }
}
