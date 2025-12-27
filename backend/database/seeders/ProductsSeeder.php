<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */


    public function run(): void
    {


        $products = [
            [
                'product_name' => 'Kopi Hitam',
                'product_image' => '/images/coffee1.png',
                'product_price' => 10000,
                'product_size' => 'SMALL',
                'is_hot' => 1,
                'is_active' => 1,
            ],
            [
                'product_name' => 'Kopi Hitam',
                'product_image' => '/images/coffee2.png',
                'product_price' => 12000,
                'product_size' => 'MEDIUM',
                'is_hot' => 1,
                'is_active' => 1,
            ],
            [
                'product_name' => 'Kopi Hitam',
                'product_image' => '/images/coffee1.png',
                'product_price' => 15000,
                'product_size' => 'LARGE',
                'is_hot' => 1,
                'is_active' => 1,
            ],
            [
                'product_name' => 'Es Kopi Susu',
                'product_image' => '/images/coffee2.png',
                'product_price' => 15000,
                'product_size' => 'MEDIUM',
                'is_hot' => 0,
                'is_active' => 1,
            ],
            [
                'product_name' => 'Es Kopi Susu',
                'product_image' => '/images/logo.png',
                'product_price' => 18000,
                'product_size' => 'LARGE',
                'is_hot' => 0,
                'is_active' => 1,
            ],
            [
                'product_name' => 'Teh Manis',
                'product_image' => '/images/food1.png',
                'product_price' => 8000,
                'product_size' => 'SMALL',
                'is_hot' => 1,
                'is_active' => 1,
            ],
            [
                'product_name' => 'Es Teh Manis',
                'product_image' => '/images/food1.png',
                'product_price' => 10000,
                'product_size' => 'MEDIUM',
                'is_hot' => 0,
                'is_active' => 0,
            ],
            [
                'product_name' => 'Coklat Panas',
                'product_image' => '/images/food1.png',
                'product_price' => 13000,
                'product_size' => 'MEDIUM',
                'is_hot' => 1,
                'is_active' => 1,
            ],
            [
                'product_name' => 'Coklat Dingin',
                'product_image' => '/images/food1.png',
                'product_price' => 15000,
                'product_size' => 'LARGE',
                'is_hot' => 0,
                'is_active' => 0,
            ],
        ];

        foreach ($products as $product) {
            Product::create([
                'product_name' => $product['product_name'],
                'product_image' => $product['product_image'],
                'product_price' => $product['product_price'],
                'product_size' => $product['product_size'],
                'is_hot' => $product['is_hot'],
                'is_active' => $product['is_active'],
                'category_id' => 1,
            ]);
        }
    }
}
