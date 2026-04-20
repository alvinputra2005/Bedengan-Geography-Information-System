<?php

namespace Database\Seeders;

use App\Models\CampingGround;
use Illuminate\Database\Seeder;

class CampingGroundSeeder extends Seeder
{
    public function run(): void
    {
        $campingGrounds = [
            [
                'name' => 'Ground A',
                'slug' => 'ground-a',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPpS2lFSB_1ea5OM8mEw-aHWPruRobtPkKS1POeVoeQaXas3GEG5xFk-P8UuwYYB62jWAxGi0HsBLyRaWeKh8Hfw1KVRPT6_V5e7WwynTGHfWKEpQBPwYGiJ4YMt7aeztriptweMJDvTLe5Ea0Y0xJgbcA-gYux3JyYEQIYAbbX91dsCB7rkkJWEVjG_Se_PNRdoctKMlcMwm3CnqAmY5YRC6PRY0KVA9oMJjICMzVIyKolKlg0Re7k9q1qI_-sW4EAe8BiKdZJWE',
                'flat_distance_m' => 5.00,
                'cliff_height_m' => 0.50,
                'base_water_level_cm' => 12,
                'sort_order' => 1,
            ],
            [
                'name' => 'Ground B',
                'slug' => 'ground-b',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUTMfufEQOMS_ddT8nIOWC7gKY-EzSh1znxtQ4XVVdWKL4h9_8GTQO-ghpuA0XKSIU-LgCllluuFewjC9zliky9ah8SwX9agQ21VRJP2zjTIoTFSxRgBoB1OpCPdo2_mvKWDBwDK8vGJ2TLHSdzU7o3gC_JgyaFRMZnbB0vNg042QNCaF30SvTzKfLjWU2Annfv6s08Rfu7wHGyL5xRYbJBUameaZ5gLdjQ90aljm-vrhK2l0TcCwoYymrNdgAiq-wzC5b6Cmv79E',
                'flat_distance_m' => 3.35,
                'cliff_height_m' => 1.60,
                'base_water_level_cm' => 15,
                'sort_order' => 2,
            ],
            [
                'name' => 'Ground C',
                'slug' => 'ground-c',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzUZ3QHNxGT6WyWm_rXy2avf7I2jAxaGFMM7RzAlgqUL258WAo5z3r7RGjyowVqv8lM-0trpBRxL4HzXTfK84qMHYiLRm8HxWWQpt2KSeU0xBj5IwKAj3j8JL-j0xQxZVFT_8XoynIhPKN9Dzn6CWUeo4JREMeAsvxCecjp6EBB61mlkjAPgRxb4HzSUj2q6fXMgTy1HgRggdssK8lMxN9X9mlZJMWzTWuIqRLp3J1K3ltgZ-b7bkQMHpYyvaXpb8zg5Gl5ebc1AM',
                'flat_distance_m' => 4.95,
                'cliff_height_m' => 2.20,
                'base_water_level_cm' => 18,
                'sort_order' => 3,
            ],
            [
                'name' => 'Ground D',
                'slug' => 'ground-d',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPpS2lFSB_1ea5OM8mEw-aHWPruRobtPkKS1POeVoeQaXas3GEG5xFk-P8UuwYYB62jWAxGi0HsBLyRaWeKh8Hfw1KVRPT6_V5e7WwynTGHfWKEpQBPwYGiJ4YMt7aeztriptweMJDvTLe5Ea0Y0xJgbcA-gYux3JyYEQIYAbbX91dsCB7rkkJWEVjG_Se_PNRdoctKMlcMwm3CnqAmY5YRC6PRY0KVA9oMJjICMzVIyKolKlg0Re7k9q1qI_-sW4EAe8BiKdZJWE',
                'flat_distance_m' => 3.00,
                'cliff_height_m' => 1.20,
                'base_water_level_cm' => 18,
                'sort_order' => 4,
            ],
            [
                'name' => 'Ground E',
                'slug' => 'ground-e',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzUZ3QHNxGT6WyWm_rXy2avf7I2jAxaGFMM7RzAlgqUL258WAo5z3r7RGjyowVqv8lM-0trpBRxL4HzXTfK84qMHYiLRm8HxWWQpt2KSeU0xBj5IwKAj3j8JL-j0xQxZVFT_8XoynIhPKN9Dzn6CWUeo4JREMeAsvxCecjp6EBB61mlkjAPgRxb4HzSUj2q6fXMgTy1HgRggdssK8lMxN9X9mlZJMWzTWuIqRLp3J1K3ltgZ-b7bkQMHpYyvaXpb8zg5Gl5ebc1AM',
                'flat_distance_m' => 4.70,
                'cliff_height_m' => 1.48,
                'base_water_level_cm' => 18,
                'sort_order' => 5,
            ],
            [
                'name' => 'Ground F',
                'slug' => 'ground-f',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUTMfufEQOMS_ddT8nIOWC7gKY-EzSh1znxtQ4XVVdWKL4h9_8GTQO-ghpuA0XKSIU-LgCllluuFewjC9zliky9ah8SwX9agQ21VRJP2zjTIoTFSxRgBoB1OpCPdo2_mvKWDBwDK8vGJ2TLHSdzU7o3gC_JgyaFRMZnbB0vNg042QNCaF30SvTzKfLjWU2Annfv6s08Rfu7wHGyL5xRYbJBUameaZ5gLdjQ90aljm-vrhK2l0TcCwoYymrNdgAiq-wzC5b6Cmv79E',
                'flat_distance_m' => 4.53,
                'cliff_height_m' => 2.73,
                'base_water_level_cm' => 21,
                'sort_order' => 6,
            ],
            [
                'name' => 'Ground G',
                'slug' => 'ground-g',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPpS2lFSB_1ea5OM8mEw-aHWPruRobtPkKS1POeVoeQaXas3GEG5xFk-P8UuwYYB62jWAxGi0HsBLyRaWeKh8Hfw1KVRPT6_V5e7WwynTGHfWKEpQBPwYGiJ4YMt7aeztriptweMJDvTLe5Ea0Y0xJgbcA-gYux3JyYEQIYAbbX91dsCB7rkkJWEVjG_Se_PNRdoctKMlcMwm3CnqAmY5YRC6PRY0KVA9oMJjICMzVIyKolKlg0Re7k9q1qI_-sW4EAe8BiKdZJWE',
                'flat_distance_m' => 6.90,
                'cliff_height_m' => 2.40,
                'base_water_level_cm' => 25,
                'sort_order' => 7,
            ],
            [
                'name' => 'Ground H',
                'slug' => 'ground-h',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUTMfufEQOMS_ddT8nIOWC7gKY-EzSh1znxtQ4XVVdWKL4h9_8GTQO-ghpuA0XKSIU-LgCllluuFewjC9zliky9ah8SwX9agQ21VRJP2zjTIoTFSxRgBoB1OpCPdo2_mvKWDBwDK8vGJ2TLHSdzU7o3gC_JgyaFRMZnbB0vNg042QNCaF30SvTzKfLjWU2Annfv6s08Rfu7wHGyL5xRYbJBUameaZ5gLdjQ90aljm-vrhK2l0TcCwoYymrNdgAiq-wzC5b6Cmv79E',
                'flat_distance_m' => 3.13,
                'cliff_height_m' => 1.09,
                'base_water_level_cm' => 16,
                'sort_order' => 8,
            ],
            [
                'name' => 'Ground I',
                'slug' => 'ground-i',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzUZ3QHNxGT6WyWm_rXy2avf7I2jAxaGFMM7RzAlgqUL258WAo5z3r7RGjyowVqv8lM-0trpBRxL4HzXTfK84qMHYiLRm8HxWWQpt2KSeU0xBj5IwKAj3j8JL-j0xQxZVFT_8XoynIhPKN9Dzn6CWUeo4JREMeAsvxCecjp6EBB61mlkjAPgRxb4HzSUj2q6fXMgTy1HgRggdssK8lMxN9X9mlZJMWzTWuIqRLp3J1K3ltgZ-b7bkQMHpYyvaXpb8zg5Gl5ebc1AM',
                'flat_distance_m' => 9.03,
                'cliff_height_m' => 3.00,
                'base_water_level_cm' => 15,
                'sort_order' => 9,
            ],
            [
                'name' => 'Ground J',
                'slug' => 'ground-j',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPpS2lFSB_1ea5OM8mEw-aHWPruRobtPkKS1POeVoeQaXas3GEG5xFk-P8UuwYYB62jWAxGi0HsBLyRaWeKh8Hfw1KVRPT6_V5e7WwynTGHfWKEpQBPwYGiJ4YMt7aeztriptweMJDvTLe5Ea0Y0xJgbcA-gYux3JyYEQIYAbbX91dsCB7rkkJWEVjG_Se_PNRdoctKMlcMwm3CnqAmY5YRC6PRY0KVA9oMJjICMzVIyKolKlg0Re7k9q1qI_-sW4EAe8BiKdZJWE',
                'flat_distance_m' => 5.63,
                'cliff_height_m' => 2.97,
                'base_water_level_cm' => 10,
                'sort_order' => 10,
            ],
            [
                'name' => 'Ground K',
                'slug' => 'ground-k',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzUZ3QHNxGT6WyWm_rXy2avf7I2jAxaGFMM7RzAlgqUL258WAo5z3r7RGjyowVqv8lM-0trpBRxL4HzXTfK84qMHYiLRm8HxWWQpt2KSeU0xBj5IwKAj3j8JL-j0xQxZVFT_8XoynIhPKN9Dzn6CWUeo4JREMeAsvxCecjp6EBB61mlkjAPgRxb4HzSUj2q6fXMgTy1HgRggdssK8lMxN9X9mlZJMWzTWuIqRLp3J1K3ltgZ-b7bkQMHpYyvaXpb8zg5Gl5ebc1AM',
                'flat_distance_m' => 6.54,
                'cliff_height_m' => 2.75,
                'base_water_level_cm' => 16,
                'sort_order' => 11,
            ],
            [
                'name' => 'Ground L',
                'slug' => 'ground-l',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUTMfufEQOMS_ddT8nIOWC7gKY-EzSh1znxtQ4XVVdWKL4h9_8GTQO-ghpuA0XKSIU-LgCllluuFewjC9zliky9ah8SwX9agQ21VRJP2zjTIoTFSxRgBoB1OpCPdo2_mvKWDBwDK8vGJ2TLHSdzU7o3gC_JgyaFRMZnbB0vNg042QNCaF30SvTzKfLjWU2Annfv6s08Rfu7wHGyL5xRYbJBUameaZ5gLdjQ90aljm-vrhK2l0TcCwoYymrNdgAiq-wzC5b6Cmv79E',
                'flat_distance_m' => 6.64,
                'cliff_height_m' => 2.37,
                'base_water_level_cm' => 11,
                'sort_order' => 12,
            ],
            [
                'name' => 'Ground M',
                'slug' => 'ground-m',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzUZ3QHNxGT6WyWm_rXy2avf7I2jAxaGFMM7RzAlgqUL258WAo5z3r7RGjyowVqv8lM-0trpBRxL4HzXTfK84qMHYiLRm8HxWWQpt2KSeU0xBj5IwKAj3j8JL-j0xQxZVFT_8XoynIhPKN9Dzn6CWUeo4JREMeAsvxCecjp6EBB61mlkjAPgRxb4HzSUj2q6fXMgTy1HgRggdssK8lMxN9X9mlZJMWzTWuIqRLp3J1K3ltgZ-b7bkQMHpYyvaXpb8zg5Gl5ebc1AM',
                'flat_distance_m' => 4.62,
                'cliff_height_m' => 4.20,
                'base_water_level_cm' => 40,
                'sort_order' => 13,
            ],
        ];

        foreach ($campingGrounds as $campingGround) {
            CampingGround::query()->updateOrCreate(
                ['slug' => $campingGround['slug']],
                $campingGround + ['is_active' => true]
            );
        }
    }
}
