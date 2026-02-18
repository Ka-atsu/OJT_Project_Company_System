<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Appointment extends Model
{
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
        'scheduled_at',
        'admin_note',
        'meeting_notes',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
