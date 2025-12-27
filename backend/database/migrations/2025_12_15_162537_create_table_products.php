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
        Schema::create('products', function (Blueprint $table) {
            $table->id("product_id");
            $table->string("product_name");
            $table->string("product_image")->nullable();
            $table->integer("product_price")->default(0);
            $table->enum("product_size", ["small", "medium", "large"])->default("small");
            $table->boolean("is_hot")->default(false);
            $table->boolean("is_active")->default(true);
            $table->unsignedBigInteger("category_id")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
