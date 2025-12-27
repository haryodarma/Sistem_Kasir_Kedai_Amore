<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recipe extends Model
{
    protected $table = "recipes";
    protected $primaryKey = 'recipe_id';
    protected $fillable = ["recipe_qty", "product_id", "raw_id"];
    protected $hidden = ["created_at", "updated_at",];
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, "product_id", "product_id");
    }
    public function raw(): BelongsTo
    {
        return $this->belongsTo(Raw::class, "raw_id", "raw_id");
    }
}
