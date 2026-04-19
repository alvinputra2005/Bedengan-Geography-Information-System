<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminActivityLogSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminId = User::query()->where('email', 'admin@bedengan.test')->value('id');
        $operatorId = User::query()->where('email', 'operator@bedengan.test')->value('id');

        foreach ([
            [
                'user_id' => $adminId,
                'activity_type' => 'create',
                'module' => 'tourist_places',
                'reference_id' => 1,
                'description' => 'Menambahkan data awal Bumi Perkemahan Bedengan.',
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Seeder/Console',
            ],
            [
                'user_id' => $adminId,
                'activity_type' => 'create',
                'module' => 'flood_zones',
                'reference_id' => 1,
                'description' => 'Mendaftarkan zona risiko tinggi di sekitar aliran sungai.',
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Seeder/Console',
            ],
            [
                'user_id' => $operatorId,
                'activity_type' => 'login',
                'module' => 'auth',
                'reference_id' => null,
                'description' => 'Operator monitoring masuk ke dashboard untuk pengecekan harian.',
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Seeder/Console',
            ],
        ] as $log) {
            DB::table('admin_activity_logs')->updateOrInsert(
                [
                    'activity_type' => $log['activity_type'],
                    'module' => $log['module'],
                    'description' => $log['description'],
                ],
                [
                    'user_id' => $log['user_id'],
                    'reference_id' => $log['reference_id'],
                    'ip_address' => $log['ip_address'],
                    'user_agent' => $log['user_agent'],
                ]
            );
        }
    }
}
