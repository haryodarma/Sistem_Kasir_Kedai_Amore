<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    protected $table = "items";
    protected $primaryKey = 'item_id';
    protected $fillable = ["item_qty", "product_id", "transaction_id"];
    protected $hidden = ["created_at", "updated_at", "deleted_at"];
    public function products(): BelongsTo
    {
        return $this->belongsTo(Product::class, "product_id", "product_id");
    }
    public function transactions(): BelongsTo
    {
        return $this->belongsTo(Transaction::class, "transaction_id", "transaction_id");
    }
}
