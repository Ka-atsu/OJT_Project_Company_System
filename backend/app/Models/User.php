<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Mass assignable fields
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'two_factor_enabled',
        'account_activity_notifications',
    ];

    /**
     * Hidden fields for serialization
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Attribute casting
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'two_factor_enabled' => 'boolean',
            'account_activity_notifications' => 'boolean',
        ];
    }

    /**
     * Relationships
     */
    public function appointments()
    {
        return $this->hasMany(\App\Models\Appointment::class);
    }

    public function documents()
    {
        return $this->hasMany(\App\Models\Document::class, 'user_id');
    }

    public function projects()
    {
        return $this->hasMany(\App\Models\Project::class);
    }

    /**
     * Helper methods
     */
    public function isAdmin(): bool
    {
        return $this->is_admin;
    }

    public function hasTwoFactorEnabled(): bool
    {
        return $this->two_factor_enabled;
    }

    public function notificationsEnabled(): bool
    {
        return $this->account_activity_notifications;
    }
}
