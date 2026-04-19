<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RoutingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use RuntimeException;

class RouteController extends Controller
{
    public function show(Request $request, RoutingService $routingService): JsonResponse
    {
        $validated = $request->validate([
            'start_lat' => ['required', 'numeric', 'between:-90,90'],
            'start_lng' => ['required', 'numeric', 'between:-180,180'],
            'end_lat' => ['required', 'numeric', 'between:-90,90'],
            'end_lng' => ['required', 'numeric', 'between:-180,180'],
        ]);

        try {
            $route = $routingService->getWalkingRoute(
                (float) $validated['start_lat'],
                (float) $validated['start_lng'],
                (float) $validated['end_lat'],
                (float) $validated['end_lng']
            );
        } catch (RuntimeException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        }

        return response()->json($route);
    }
}
