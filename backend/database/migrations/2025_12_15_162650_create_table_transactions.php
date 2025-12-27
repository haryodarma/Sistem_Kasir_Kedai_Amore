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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id("transaction_id");
            $table->integer("transaction_total");
            $table->integer("transaction_discount");
            $table->enum("transaction_status", ["pending", "paid", "cancelled"])->default("pending");
            $table->unsignedBigInteger("user_id")->nullable();
            $table->timestamps();

            // $table->primary("transaction_id");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
