<?php

namespace Tests\Feature\Auth;

use App\Http\Middleware\VerifyCsrfToken;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_logout(): void
    {
        $this->withoutMiddleware(VerifyCsrfToken::class);

        $user = User::factory()->create();

        $response = $this->actingAs($user, 'web')->postJson('/api/auth/logout');

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Logout berhasil.');

        $this->getJson('/api/auth/me')->assertUnauthorized();
    }

    public function test_logout_endpoint_is_safe_when_user_is_already_logged_out(): void
    {
        $this->withoutMiddleware(VerifyCsrfToken::class);

        $this->postJson('/api/auth/logout')
            ->assertOk()
            ->assertJsonPath('message', 'Logout berhasil.');
    }
}
