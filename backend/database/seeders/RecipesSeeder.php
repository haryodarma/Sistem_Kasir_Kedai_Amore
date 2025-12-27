<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipesSeeder extends Seeder
{
    public function run(): void
    {
        $units = ['ml', 'gr'];

        $data = [];

        // pilih satu product untuk testing
        $productId = 6;

        // total recipe yang ingin dibuat
        $totalRecipes = 25;

        for ($i = 0; $i < $totalRecipes; $i++) {
            $data[] = [
                'recipe_qty' => rand(10, 500),
                'product_id' => rand(1, 8),
                'raw_id' => rand(1, 5),

            ];
        }

        DB::table('recipes')->insert($data);
    }
}
