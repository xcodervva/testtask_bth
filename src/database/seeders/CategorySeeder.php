<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Electronics', 'description' => 'Electronic gadgets and devices'],
            ['name' => 'Books', 'description' => 'Books of all genres'],
            ['name' => 'Clothing', 'description' => 'Men and Women clothing'],
            ['name' => 'Electronics 2', 'description' => 'Electronic gadgets and devices 2'],
            ['name' => 'Books 2', 'description' => 'Books of all genres 2'],
            ['name' => 'Clothing 2', 'description' => 'Men and Women clothing 2'],
        ];

        foreach ($categories as $cat)
        {
            Category::updateOrCreate(['name' => $cat['name']], $cat);
        }
    }
}
