<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            // owner (for admin view)
            'userId' => $this->user_id,
            'client' => $this->whenLoaded('user', fn() => $this->user?->name),
            'email'  => $this->whenLoaded('user', fn() => $this->user?->email),

            // schedule (client/admin)
            'scheduled_at' => optional($this->scheduled_at)->toISOString(),
            'date' => $this->scheduled_at?->format('M d, Y'),
            'time' => $this->scheduled_at?->format('h:i A'),

            // fields
            'project' => $this->project,
            'purpose' => $this->purpose,
            'details' => $this->details,
            'mode' => $this->mode,

            // admin-controlled fields
            'approvalStatus' => $this->approval_status,
            'meetingLink' => $this->meeting_link,
            'location' => $this->location,
            'admin_note' => $this->admin_note,
            'meeting_notes' => $this->meeting_notes,
        ];
    }
}
