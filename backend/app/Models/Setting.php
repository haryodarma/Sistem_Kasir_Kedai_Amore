<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $table = "settings";
    protected $primaryKey = 'setting_id';
    protected $fillable = ["setting_name", "setting_value", "setting_desc"];
    protected $hidden = ["created_at", "updated_at", "deleted_at"];
}
