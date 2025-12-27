<?php

namespace Database\Seeders;

use App\Models\Raw;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RawsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $materials = [
            // Bahan padat → GRAM
            ['raw_name' => 'Gula Pasir', 'raw_stock' => 25000, 'raw_unit' => 'gr'],
            ['raw_name' => 'Kopi Bubuk', 'raw_stock' => 10000, 'raw_unit' => 'gr'],
            ['raw_name' => 'Coklat Bubuk', 'raw_stock' => 8000, 'raw_unit' => 'gr'],
            ['raw_name' => 'Teh Hitam', 'raw_stock' => 7000, 'raw_unit' => 'gr'],
            ['raw_name' => 'Es Batu', 'raw_stock' => 2000, 'raw_unit' => 'gr'],

            // Bahan cair → MILI
            ['raw_name' => 'Susu Cair', 'raw_stock' => 15000, 'raw_unit' => 'ml'],
            ['raw_name' => 'Air Mineral', 'raw_stock' => 50000, 'raw_unit' => 'ml'],
            ['raw_name' => 'Sirup Vanilla', 'raw_stock' => 5000, 'raw_unit' => 'ml'],
            ['raw_name' => 'Susu Kental', 'raw_stock' => 3000, 'raw_unit' => 'ml'],
        ];

        foreach ($materials as $material) {
            Raw::create($material);
        }
    }
}
