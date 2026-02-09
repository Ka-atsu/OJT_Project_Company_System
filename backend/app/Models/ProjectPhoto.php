<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectPhoto extends Model
{
    protected $fillable = ['path'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
