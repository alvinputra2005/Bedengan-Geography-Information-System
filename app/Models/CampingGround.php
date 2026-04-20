<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampingGround extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'image_url',
        'flat_distance_m',
        'cliff_height_m',
        'base_water_level_cm',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'flat_distance_m' => 'float',
        'cliff_height_m' => 'float',
        'base_water_level_cm' => 'integer',
        'sort_order' => 'integer',
        'is_active' => 'boolean',
    ];
}
