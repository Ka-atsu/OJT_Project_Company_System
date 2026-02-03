<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => $this->scheduled_at?->format('M d, Y'),
            'time' => $this->scheduled_at?->format('h:i A'),
            'project' => $this->project,
            'purpose' => $this->purpose,
            'details' => $this->details,
            'mode' => $this->mode,
            'approvalStatus' => $this->approval_status,
            'meetingLink' => $this->meeting_link,
            'location' => $this->location,
        ];
    }
}
