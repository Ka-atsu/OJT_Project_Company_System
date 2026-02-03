<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'user_id',
        'phone',
        'scheduled_at',
        'project',
        'purpose',
        'details',
        'mode',
        'approval_status',
        'meeting_link',
        'location',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];
}
