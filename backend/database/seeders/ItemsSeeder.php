<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productIds = Product::pluck('product_id')->toArray();

        if (empty($productIds)) {
            return;
        }

        Transaction::all()->each(function ($transaction) use ($productIds) {

            $itemsCount = rand(1, 3);

            collect($productIds)
                ->shuffle()
                ->take($itemsCount)
                ->each(function ($productId) use ($itemsCount, $transaction) {
                    Item::create([
                        'transaction_id' => $transaction->transaction_id,
                        'product_id' => $productId,
                        'item_qty' => $itemsCount
                    ]);
                });
        });
    }
}
