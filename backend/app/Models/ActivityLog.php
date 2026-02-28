<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'action',
        'description',
        'related_id',
        'related_type',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
