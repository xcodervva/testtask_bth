<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Support\Facades\Hash;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function user_can_login_with_valid_credentials(): void
    {
        $password = 'secret123';

        $user = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => Hash::make($password),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@test.com',
            'password' => $password,
        ]);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'token',
            ]);

        $this->assertDatabaseCount('personal_access_tokens', 1);
    }
}
