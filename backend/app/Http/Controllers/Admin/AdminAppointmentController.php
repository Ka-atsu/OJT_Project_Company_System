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
        $status = $request->query('status', 'pending'); // pending|accepted|declined|all
        $limit  = (int) $request->query('limit', 12);
        $qText  = trim((string) $request->query('q', ''));

        $q = Appointment::query()
            ->with('user'); // STEP 1: load user for AppointmentResource

        if ($status !== 'all') {
            $q->where('approval_status', $status);
        }

        if ($qText !== '') {
            $q->where(function ($sub) use ($qText) {
                $sub->where('project', 'like', "%{$qText}%")
                    ->orWhere('purpose', 'like', "%{$qText}%")
                    ->orWhere('id', $qText);
            });
        }

        $q->orderByDesc('scheduled_at');

        $p = $q->paginate($limit);

        return response()->json([
            'data' => AppointmentResource::collection($p)->resolve(),
            'page' => $p->currentPage(),
            'totalPages' => $p->lastPage(),
            'total' => $p->total(),
        ]);
    }
}
