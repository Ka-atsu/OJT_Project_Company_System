<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Http\Resources\AppointmentResource;

class AppointmentController extends Controller
{
    /**
     * GET /api/appointments?status=upcoming|past&page=1&limit=7
     */
    public function index(Request $request)
    {
        $status = $request->query('status', 'upcoming');
        $limit  = (int) $request->query('limit', 7);

        $q = Appointment::query()
            ->where('user_id', $request->user()->id);

        if ($status === 'past') {
            $q->where('scheduled_at', '<', now())->orderByDesc('scheduled_at');
        } else {
            $q->where('scheduled_at', '>=', now())->orderBy('scheduled_at');
        }

        $p = $q->paginate($limit);

        return response()->json([
            'data' => AppointmentResource::collection($p)->resolve(),
            'page' => $p->currentPage(),
            'totalPages' => $p->lastPage(),
            'total' => $p->total(),
        ]);
    }

    /**
     * POST /api/appointments
     *
     * Expected payload:
     * - phone (optional)
     * - scheduled_at (required datetime string)
     * - project (required)
     * - purpose (required)
     * - details (optional)
     * - mode (required: online|f2f)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'phone' => ['nullable', 'string', 'max:50'],
            'scheduled_at' => ['required', 'date'],
            'project' => ['required', 'string', 'max:255'],
            'purpose' => ['required', 'string', 'max:255'],
            'details' => ['nullable', 'string'],
            'mode' => ['required', 'in:online,f2f'],
        ]);

        $appt = Appointment::create([
            'user_id' => $request->user()->id,
            'phone' => $validated['phone'] ?? null,
            'scheduled_at' => $validated['scheduled_at'],

            'project' => $validated['project'],
            'purpose' => $validated['purpose'],
            'details' => $validated['details'] ?? null,
            'mode' => $validated['mode'],

            'approval_status' => 'pending',
            'meeting_link' => null,
            'location' => null,
        ]);

        return (new AppointmentResource($appt))
            ->response()
            ->setStatusCode(201);
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
