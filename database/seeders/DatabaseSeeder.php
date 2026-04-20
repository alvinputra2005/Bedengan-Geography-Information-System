<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            BedenganSeeder::class,
            CampingGroundSeeder::class,
            TouristPlaceSeeder::class,
            FloodZoneSeeder::class,
            EvacuationRouteSeeder::class,
            MitigationContentSeeder::class,
            AdminActivityLogSeeder::class,
        ]);

        // \App\Models\User::factory(10)->create();
    }
}
