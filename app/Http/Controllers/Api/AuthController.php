<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['nullable', 'boolean'],
        ]);

        if (! Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
            'is_active' => true,
        ], $credentials['remember'] ?? false)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password tidak valid.'],
            ]);
        }

        $request->session()->regenerate();
        $request->user()->forceFill([
            'last_login_at' => now(),
        ])->save();

        return response()->json([
            'message' => 'Login berhasil.',
            'user' => $request->user()->load('role:id,name'),
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $userRoleId = Role::query()->where('name', 'user')->value('id');

        if (! $userRoleId) {
            throw ValidationException::withMessages([
                'email' => ['Role default user belum tersedia. Jalankan seeder role terlebih dahulu.'],
            ]);
        }

        $user = User::query()->create([
            'role_id' => $userRoleId,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password_hash' => $validated['password'],
            'is_active' => true,
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Pendaftaran berhasil.',
            'user' => $user->load('role:id,name'),
        ], 201);
    }

    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user()?->load('role:id,name'),
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        if (Auth::guard('web')->check()) {
            Auth::guard('web')->logout();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout berhasil.',
        ]);
    }
}
