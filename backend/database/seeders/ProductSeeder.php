<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->command->warn('No categories found. Run CategorySeeder first.');
            return;
        }

        // создаём 50 товаров
        Product::factory()
            ->count(50)
            ->make()
            ->each(function ($product) use ($categories) {
                $product->category_id = $categories->random()->id;
                $product->save();
            });
    }
}
