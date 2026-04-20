<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CampingGround;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CampingGroundController extends Controller
{
    public function publicIndex(): JsonResponse
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

    public function adminIndex(): JsonResponse
    {
        $campingGrounds = CampingGround::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $campingGrounds,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $campingGround = CampingGround::query()->create($this->validatePayload($request));

        return response()->json([
            'message' => 'Data camping berhasil ditambahkan.',
            'data' => $campingGround,
        ], 201);
    }

    public function update(Request $request, CampingGround $campingGround): JsonResponse
    {
        $campingGround->update($this->validatePayload($request, $campingGround));

        return response()->json([
            'message' => 'Data camping berhasil diperbarui.',
            'data' => $campingGround->fresh(),
        ]);
    }

    public function destroy(CampingGround $campingGround): JsonResponse
    {
        $campingGround->delete();

        return response()->json([
            'message' => 'Data camping berhasil dihapus.',
        ]);
    }

    private function validatePayload(Request $request, ?CampingGround $campingGround = null): array
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'slug' => ['nullable', 'string', 'max:140'],
            'image_url' => ['nullable', 'url', 'max:2000'],
            'flat_distance_m' => ['required', 'numeric', 'min:0'],
            'cliff_height_m' => ['required', 'numeric', 'min:0'],
            'base_water_level_cm' => ['required', 'integer', 'min:0', 'max:65535'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:65535'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $baseSlug = Str::slug(($validated['slug'] ?? '') ?: $validated['name']);
        if ($baseSlug === '') {
            $baseSlug = 'camping-ground';
        }

        $slug = $baseSlug;
        $suffix = 2;

        while (
            CampingGround::query()
                ->where('slug', $slug)
                ->when($campingGround, fn ($query) => $query->whereKeyNot($campingGround->id))
                ->exists()
        ) {
            $slug = "{$baseSlug}-{$suffix}";
            $suffix++;
        }

        return [
            'name' => $validated['name'],
            'slug' => $slug,
            'image_url' => ($validated['image_url'] ?? '') ?: null,
            'flat_distance_m' => $validated['flat_distance_m'],
            'cliff_height_m' => $validated['cliff_height_m'],
            'base_water_level_cm' => $validated['base_water_level_cm'],
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? true,
        ];
    }
}
