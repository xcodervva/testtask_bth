<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

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
}
