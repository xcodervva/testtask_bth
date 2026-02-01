<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use PHPUnit\Framework\Attributes\Test;
use Laravel\Sanctum\Sanctum;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_returns_paginated_products_list()
    {
        $category = Category::factory()->create();

        Product::factory()->count(15)->create([
            'category_id' => $category->id
        ]);

        $response = $this->getJson('/api/products');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'price',
                        'description',
                        'category',
                        'created_at',
                    ]
                ],
                'links',
                'meta',
            ]);
    }

    #[Test]
    public function it_returns_single_product()
    {
        $product = Product::factory()
            ->for(Category::factory())
            ->create();

        $response = $this->getJson("/api/products/{$product->id}");

        $response
            ->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $product->id,
                    'name' => $product->name,
                ],
            ]);
    }

    #[Test]
    public function it_returns_404_if_product_not_found()
    {
        $response = $this->getJson('/api/products/999');

        $response
            ->assertStatus(404)
            ->assertJson([
                'message' => 'Product not found',
            ]);
    }

    #[Test]
    public function authenticated_user_can_create_product()
    {
        Sanctum::actingAs(User::factory()->create());

        $category = Category::factory()->create();

        $payload = [
            'name' => 'Test product',
            'price' => 1000,
            'category_id' => $category->id,
            'description' => 'Test description',
        ];

        $response = $this->postJson('/api/products', $payload);

        $response
            ->assertCreated()
            ->assertJson([
                'data' => [
                    'name' => 'Test product',
                    'price' => 1000,
                ],
            ]);

        $this->assertDatabaseHas('products', [
            'name' => 'Test product',
        ]);
    }

    #[Test]
    public function authenticated_user_can_update_product()
    {
        Sanctum::actingAs(User::factory()->create());

        $product = Product::factory()
            ->for(Category::factory())
            ->create();

        $payload = [
            'name' => 'Updated name',
            'price' => 2000,
        ];

        $response = $this->putJson(
            "/api/products/{$product->id}",
            $payload
        );

        $response
            ->assertOk()
            ->assertJson([
                'data' => [
                    'name' => 'Updated name',
                    'price' => 2000,
                ],
            ]);

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated name',
        ]);
    }

    #[Test]
    public function authenticated_user_can_delete_product()
    {
        Sanctum::actingAs(User::factory()->create());

        $product = Product::factory()->create();

        $response = $this->deleteJson(
            "/api/products/{$product->id}"
        );

        $response->assertNoContent();

        $this->assertSoftDeleted('products', [
            'id' => $product->id,
        ]);
    }
}
