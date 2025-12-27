<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table("products", function (Blueprint $table) {
            $table->foreign("category_id")->references("category_id")->on("categories");
        });
        Schema::table("recipes", function (Blueprint $table) {
            $table->foreign("product_id")->references("product_id")->on("products");
            $table->foreign("raw_id")->references("raw_id")->on("raws");
        });
        Schema::table("transactions", function (Blueprint $table) {
            $table->foreign("user_id")->references("user_id")->on("users");
        });
        Schema::table("items", function (Blueprint $table) {
            $table->foreign("product_id")->references("product_id")->on("products");
            $table->foreign("transaction_id")->references("transaction_id")->on("transactions");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("products", function (Blueprint $table) {
            $table->dropForeign("category_id");
        });
        Schema::table("recipes", function (Blueprint $table) {
            $table->dropForeign("product_id");
            $table->dropForeign("raw_id");
        });
        Schema::table("transactions", function (Blueprint $table) {
            $table->dropForeign("customer_id");
        });
        Schema::table("transaction_items", function (Blueprint $table) {
            $table->dropForeign("product_id");
            $table->dropForeign("transactions_id");
        });
    }
};
