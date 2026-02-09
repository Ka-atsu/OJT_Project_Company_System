<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'status' => $this->status,

            'clientId' => (string) $this->user_id,
            'clientName' => $this->user?->name ?? '',
            'clientEmail' => $this->user?->email ?? '',

            'startDate' => optional($this->start_date)->format('Y-m-d') ?? '',
            'dueDate' => optional($this->due_date)->format('Y-m-d') ?? '',

            'budget' => (int) $this->budget,
            'progress' => (int) $this->progress,
            'description' => $this->description ?? '',

            'milestones' => $this->milestones?->map(fn($m) => [
                'id' => (string) $m->id,
                'title' => $m->title,
                'due' => optional($m->due)->format('Y-m-d'),
                'status' => $m->status,
            ])->values() ?? [],

            'photos' => $this->photos?->map(fn($p) => [
                'id' => (string) $p->id,
                'url' => asset('storage/' . $p->path),
            ])->values() ?? [],

            'updatedAt' => optional($this->updated_at)->toISOString(),
        ];
    }
}
