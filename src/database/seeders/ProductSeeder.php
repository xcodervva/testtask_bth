<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $electronics = Category::where('name', 'Electronics')->first();
        $books = Category::where('name', 'Books')->first();
        $clothing = Category::where('name', 'Clothing')->first();

        $products = [
            ['name' => 'Smartphone', 'description' => 'Latest smartphone', 'price' => 699.99, 'category_id' => $electronics->id],
            ['name' => 'Laptop', 'description' => 'High performance laptop', 'price' => 1299.99, 'category_id' => $electronics->id],
            ['name' => 'Novel', 'description' => 'Best-selling novel', 'price' => 19.99, 'category_id' => $books->id],
            ['name' => 'T-Shirt', 'description' => 'Cotton T-Shirt', 'price' => 29.99, 'category_id' => $clothing->id],
            ['name' => 'Sweater', 'description' => 'Sweater', 'price' => 38.76, 'category_id' => $clothing->id],
            ['name' => 'Hat', 'description' => 'Red hat', 'price' => 48.23, 'category_id' => $clothing->id],
        ];

        foreach ($products as $prod) {
            Product::updateOrCreate(['name' => $prod['name']], $prod);
        }
    }
}
