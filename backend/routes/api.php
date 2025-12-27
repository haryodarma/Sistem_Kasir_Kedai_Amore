<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RawController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TransactionController;
use App\Http\Helpers\ResponseFormat;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('refresh-token', [AuthController::class, 'refreshToken']);


Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/auth/check', [AuthController::class, 'checkCredentials']);

    Route::resource("categories", CategoryController::class);
    Route::resource("logs", LogController::class);
    Route::resource('products', ProductController::class);
    Route::resource('transactions', TransactionController::class);
    Route::resource('recipes', RecipeController::class);
    Route::resource('raws', RawController::class);
    Route::resource("settings", SettingController::class);

    Route::get('/recipes/product/{product_id}', [RecipeController::class, "recipeByProduct"]);
    Route::post('logout', [AuthController::class, 'logout']);


    Route::get("/summary", function () {
        $transcation = Transaction::get()->count();
        $product = Product::get()->count();

        return ResponseFormat::success(["transaction" => $transcation, "product" => $product]);
    });
});

