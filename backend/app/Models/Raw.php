<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Raw extends Model
{
    protected $table = "raws";
    protected $primaryKey = 'raw_id';
    protected $fillable = ["raw_name", "raw_stock", "raw_unit"];
    protected $hidden = ["created_at", "updated_at", "deleted_at"];
    protected $casts = ["raw_stock" => "integer"];
}
