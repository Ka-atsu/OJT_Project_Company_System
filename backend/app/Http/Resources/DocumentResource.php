<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class DocumentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'sharedBy' => $this->shared_by,
            'date' => $this->document_date ? $this->document_date->format('M. d, Y') : null,
            'fileUrl' => $this->file_path
                ? asset('storage/' . $this->file_path)
                : null,
        ];
    }
}
