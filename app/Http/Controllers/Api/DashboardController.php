<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Data dashboard berhasil dimuat.',
            'summary' => [
                'water_level' => '1.2 m',
                'ground_recommendation' => 'Ground A & C',
                'visitor_status' => 'Aman',
            ],
            'user' => $request->user(),
        ]);
    }
}
