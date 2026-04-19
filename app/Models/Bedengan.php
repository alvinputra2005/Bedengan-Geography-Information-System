<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bedengan extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'polygon_json',
        'access_lat',
        'access_lng',
        'is_active',
    ];

    protected $casts = [
        'polygon_json' => 'array',
        'access_lat' => 'float',
        'access_lng' => 'float',
        'is_active' => 'boolean',
    ];
}
