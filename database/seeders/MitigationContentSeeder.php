<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MitigationContentSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminId = User::query()->where('email', 'admin@bedengan.test')->value('id');

        foreach ([
            [
                'title' => 'Langkah Cepat Saat Status Naik Menjadi Waspada',
                'category' => 'kesiapsiagaan',
                'status' => 'published',
                'content' => "1. Hentikan aktivitas di tepi sungai.\n2. Arahkan pengunjung ke jalur evakuasi terdekat.\n3. Pastikan anak-anak dan lansia diprioritaskan.\n4. Ikuti arahan petugas lapangan dan pos jaga.",
            ],
            [
                'title' => 'Checklist Evakuasi untuk Pengelola Wisata',
                'category' => 'operasional',
                'status' => 'published',
                'content' => "Checklist minimum pengelola meliputi pengeras suara aktif, jalur evakuasi bersih, titik kumpul terbuka, lampu darurat siap, dan daftar kontak petugas tersedia di pos jaga.",
            ],
            [
                'title' => 'Edukasi Pengunjung Sebelum Memasuki Area Bedengan',
                'category' => 'edukasi',
                'status' => 'published',
                'content' => "Pengunjung perlu memahami peta zona risiko, mengenali sirine atau pengumuman evakuasi, serta menghindari mendirikan tenda terlalu dekat dengan aliran sungai.",
            ],
        ] as $content) {
            DB::table('mitigation_contents')->updateOrInsert(
                ['slug' => Str::slug($content['title'])],
                [
                    'title' => $content['title'],
                    'slug' => Str::slug($content['title']),
                    'content' => $content['content'],
                    'category' => $content['category'],
                    'status' => $content['status'],
                    'created_by' => $adminId,
                    'updated_at' => now(),
                ]
            );
        }
    }
}
