<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    protected $table = "transactions";
    protected $primaryKey = 'transaction_id';
    protected $fillable = ["transaction_total", "transaction_discount", "user_id", "transaction_status"];
    protected $hidden = ["updated_at", "deleted_at"];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id", "user_id");
    }
    public function items(): HasMany
    {
        return $this->hasMany(Item::class, "transaction_id", "transaction_id");
    }
}
