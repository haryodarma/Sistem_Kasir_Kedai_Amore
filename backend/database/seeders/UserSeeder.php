<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'Owner',
            'email' => 'owner@amor.test',
            'password' => Hash::make('password'),
            'role' => 'owner',
        ]);

        User::create([
            'username' => 'Employee ',
            'email' => 'employee@amor.test',
            'password' => Hash::make('password'),
            'role' => 'employee',
        ]);

        User::create([
            'username' => 'Customer',
            'email' => 'customer@amor.test',
            'password' => Hash::make('password'),
            'role' => 'customers',
        ]);
    }
}
