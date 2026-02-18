<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AdminAppointmentController extends Controller
{
    // GET /api/admin/appointments?status=pending|accepted|declined|all&page=1&limit=12&q=
    public function index(Request $request)
    {
        $status = $request->query('status', 'pending');
        $limit  = (int) $request->query('limit', 12);
        $qText  = trim((string) $request->query('q', ''));
        $sort   = $request->query('sort', 'scheduled_at_asc');

        $q = Appointment::query()
            ->with('user');

        if ($status !== 'all') {
            $q->where('approval_status', $status);
        }

        if ($qText !== '') {
            $q->where(function ($sub) use ($qText) {

                $sub->where('project', 'like', "%{$qText}%")
                    ->orWhere('purpose', 'like', "%{$qText}%")
                    ->orWhere('id', $qText)

                    ->orWhereHas('user', function ($u) use ($qText) {
                        $u->where('name', 'like', "%{$qText}%")
                            ->orWhere('email', 'like', "%{$qText}%");
                    });
            });
        }

        // REPLACE HARD-CODED SORT WITH THIS
        switch ($sort) {
            case 'scheduled_at_desc':
                $q->orderBy('scheduled_at', 'desc');
                break;

            case 'created_at_desc':
                $q->orderBy('created_at', 'desc');
                break;

            default:
                $q->orderBy('scheduled_at', 'asc');
                break;
        }

        $p = $q->paginate($limit);

        return response()->json([
            'data' => AppointmentResource::collection($p)->resolve(),
            'page' => $p->currentPage(),
            'totalPages' => $p->lastPage(),
            'total' => $p->total(),
        ]);
    }

    public function update(Request $request, Appointment $appointment)
    {
        $appointment->update($request->only([
            'approval_status',
            'meeting_link',
            'location',
            'scheduled_at'
        ]));

        return new AppointmentResource($appointment->fresh('user'));
    }
}
