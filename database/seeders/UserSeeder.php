<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminRoleId = Role::query()->where('name', 'admin')->value('id');
        $userRoleId = Role::query()->where('name', 'user')->value('id');

        foreach ([
            [
                'email' => 'admin@bedengan.test',
                'role_id' => $adminRoleId,
                'name' => 'Admin Bedengan',
                'password_hash' => 'password123',
                'phone' => '081234567890',
                'photo_url' => '/images/Foto-Icon-Bedengan.jpeg',
                'is_active' => true,
                'email_verified_at' => now(),
            ],
            [
                'email' => 'operator@bedengan.test',
                'role_id' => $userRoleId,
                'name' => 'Operator Monitoring',
                'password_hash' => 'password123',
                'phone' => '081234567891',
                'photo_url' => '/images/Foto-Icon-Bedengan.jpeg',
                'is_active' => true,
                'email_verified_at' => now(),
            ],
            [
                'email' => 'pengunjung@bedengan.test',
                'role_id' => $userRoleId,
                'name' => 'Pengunjung Demo',
                'password_hash' => 'password123',
                'phone' => '081234567892',
                'photo_url' => '/images/Foto-Icon-Bedengan.jpeg',
                'is_active' => true,
                'email_verified_at' => now(),
            ],
        ] as $user) {
            User::query()->updateOrCreate(
                ['email' => $user['email']],
                $user
            );
        }
    }
}
