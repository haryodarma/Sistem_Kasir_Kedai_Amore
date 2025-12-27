<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $table = "products";
    protected $primaryKey = 'product_id';
    protected $fillable = ["product_name", "product_price", "product_size", "is_hot", "is_active", "category_id", "product_image"];
    protected $hidden = ["created_at", "updated_at", "deleted_at"];
    protected $casts = [
        "product_price" => "integer",
        "category_id" => "integer",
        "is_hot" => "boolean",
        "is_active" => "boolean"
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, "transcation_id", "transaction_id");
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, "category_id", "category_id");
    }

    public function recipes(): HasMany
    {
        return $this->hasMany(Recipe::class, "product_id", "product_id");
    }


}
