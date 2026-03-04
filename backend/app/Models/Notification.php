<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'message',
        'related_id',
        'related_type',
        'is_read',
    ];

    /**
     * Notification belongs to a user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
