<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CampingGround;
use Illuminate\Http\JsonResponse;

class CampingGroundController extends Controller
{
    public function index(): JsonResponse
    {
        $campingGrounds = CampingGround::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'slug',
                'image_url',
                'flat_distance_m',
                'cliff_height_m',
                'base_water_level_cm',
                'sort_order',
                'is_active',
            ]);

        return response()->json([
            'data' => $campingGrounds,
        ]);
    }
}
