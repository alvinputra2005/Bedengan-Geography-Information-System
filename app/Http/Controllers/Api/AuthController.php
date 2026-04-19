<?php

namespace App\Http\Controllers\Api;

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
        ]);

        if (! Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
            'is_active' => true,
        ])) {
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

    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user()?->load('role:id,name'),
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout berhasil.',
        ]);
    }
}
