<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIds = User::pluck('user_id')->toArray();

        for ($i = 1; $i <= 10; $i++) {
            Transaction::create([
                'transaction_total' => rand(50_000, 500_000),
                'transaction_discount' => rand(0, 100),
                'transaction_status' => collect(['pending', 'paid', 'cancelled'])->random(),
                'user_id' => $userIds ? collect($userIds)->random() : null,
            ]);
        }
    }
}
