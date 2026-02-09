<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'shared_by',
        'document_date',
        'file_path',
    ];

    protected $casts = [
        'document_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
