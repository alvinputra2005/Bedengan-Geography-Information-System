<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bedengan;
use Illuminate\Http\JsonResponse;

class BedenganController extends Controller
{
    public function index(): JsonResponse
    {
        $bedengans = Bedengan::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'slug',
                'description',
                'polygon_json',
                'access_lat',
                'access_lng',
                'is_active',
            ]);

        return response()->json([
            'data' => $bedengans,
        ]);
    }

    public function show(Bedengan $bedengan): JsonResponse
    {
        abort_unless($bedengan->is_active, 404);

        return response()->json([
            'data' => $bedengan,
        ]);
    }
}
