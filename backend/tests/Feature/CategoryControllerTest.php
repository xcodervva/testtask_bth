<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Category;
use PHPUnit\Framework\Attributes\Test;

class CategoryControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_returns_categories_list_ordered_by_name(): void
    {
        Category::factory()->create(['name' => 'M category']);
        Category::factory()->create(['name' => 'Z category']);
        Category::factory()->create(['name' => 'A category']);

        $response = $this->getJson('/api/categories');

        $response
            ->assertOk()
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                    ]
                ]
            ])
            ->assertJsonPath('data.0.name', 'A category')
            ->assertJsonPath('data.1.name', 'M category')
            ->assertJsonPath('data.2.name', 'Z category');
    }
}
