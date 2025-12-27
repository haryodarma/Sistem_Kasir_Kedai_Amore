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
        Schema::create('raws', function (Blueprint $table) {
            $table->id("raw_id");
            $table->string("raw_name");
            $table->integer("raw_stock");
            $table->enum("raw_unit", ["gr", "ml"]);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raws');
    }
};
