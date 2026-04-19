<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach ([
            [
                'name' => 'admin',
                'description' => 'Administrator dengan akses CRUD penuh.',
            ],
            [
                'name' => 'user',
                'description' => 'Pengguna umum untuk monitoring, peta, mitigasi, dan notifikasi.',
            ],
        ] as $role) {
            Role::query()->updateOrCreate(
                ['name' => $role['name']],
                ['description' => $role['description']]
            );
        }
    }
};
