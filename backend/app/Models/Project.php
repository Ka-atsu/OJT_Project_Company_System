<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'status',
        'start_date',
        'due_date',
        'completed_date',
        'budget',
        'progress',
        'description',
    ];

    protected $casts = [
        'start_date' => 'date',
        'due_date' => 'date',
        'budget' => 'int',
        'progress' => 'int',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function milestones()
    {
        return $this->hasMany(Milestone::class);
    }

    public function photos()
    {
        return $this->hasMany(ProjectPhoto::class);
    }
}
