<?php

namespace Tests\Feature\Auth;

use App\Http\Middleware\VerifyCsrfToken;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RegisterAndRbacTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_and_get_default_user_role(): void
    {
        $this->withoutMiddleware(VerifyCsrfToken::class);

        Role::query()->create([
            'name' => 'user',
            'description' => 'Pengguna umum',
        ]);

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Pengguna Baru',
            'email' => 'baru@bedengan.test',
            'phone' => '081234567890',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('user.email', 'baru@bedengan.test')
            ->assertJsonPath('user.role.name', 'user');

        $this->assertDatabaseHas('users', [
            'email' => 'baru@bedengan.test',
            'name' => 'Pengguna Baru',
        ]);
    }

    public function test_non_admin_user_cannot_access_admin_dashboard_api(): void
    {
        $userRole = Role::query()->create([
            'name' => 'user',
            'description' => 'Pengguna umum',
        ]);

        $user = User::factory()->create([
            'role_id' => $userRole->id,
        ]);

        Sanctum::actingAs($user);

        $this->getJson('/api/admin/dashboard')
            ->assertForbidden()
            ->assertJsonPath('message', 'Anda tidak memiliki akses ke resource ini.');
    }

    public function test_admin_can_access_admin_dashboard_api(): void
    {
        $adminRole = Role::query()->create([
            'name' => 'admin',
            'description' => 'Administrator',
        ]);

        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
        ]);

        Sanctum::actingAs($admin);

        $this->getJson('/api/admin/dashboard')
            ->assertOk()
            ->assertJsonPath('user.role.name', 'admin')
            ->assertJsonStructure([
                'message',
                'summary',
                'sensors',
                'notifications',
            ]);
    }
}
