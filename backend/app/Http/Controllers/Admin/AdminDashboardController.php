<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Project;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;
use App\Models\ActivityLog;

class AdminDashboardController extends Controller
{
    public function show(Request $request)
    {
        $apptLimit     = (int) $request->query('apptLimit', 10);
        $projectLimit  = (int) $request->query('projectLimit', 8);
        $docLimit      = (int) $request->query('docLimit', 8);
        $milestoneDays = (int) $request->query('milestoneDays', 7);

        /* =========================
           APPOINTMENTS (list + KPI)
        ========================= */

        $appointmentsRaw = Appointment::query()
            ->with('user:id,name,email')
            ->orderByRaw("CASE WHEN approval_status='pending' THEN 0 ELSE 1 END")
            ->orderByDesc('scheduled_at')
            ->limit($apptLimit)
            ->get();

        $appointments = $appointmentsRaw->map(function ($a) {
            $status = strtolower((string) ($a->approval_status ?? 'pending'));
            $status = $status === 'accepted' ? 'approved' : $status;
            $status = $status === 'declined' ? 'rejected' : $status;

            $mode = strtolower((string) ($a->mode ?? ''));
            $modeUi = $mode === 'online'
                ? 'Online'
                : ($mode === 'f2f' ? 'Face-to-face' : ($a->mode ?? ''));

            return [
                'id' => $a->id,
                'client' => $a->user->name ?? 'Client',
                'type' => $a->purpose ?? $a->project ?? 'Appointment',
                'status' => $status,
                'mode' => $modeUi,
                'requestedFor' => $a->scheduled_at
                    ? $a->scheduled_at->format('Y-m-d H:i')
                    : ($a->created_at?->format('Y-m-d H:i') ?? ''),
            ];
        })->values();

        $pendingCount = Appointment::where('approval_status', 'pending')->count();

        /* =========================
           PROJECTS (list + KPI)
        ========================= */

        $projectsRaw = Project::query()
            ->with(['user:id,name,email', 'milestones'])
            ->where('status', '!=', 'draft')
            ->orderByDesc('updated_at')
            ->limit($projectLimit)
            ->get();

        $projects = $projectsRaw->map(function ($p) {
            $milestones = collect($p->milestones ?? [])->filter();

            $next = $milestones
                ->filter(fn($m) => strtolower((string)($m->status ?? '')) !== 'done')
                ->sortBy(fn($m) => $m->due ?? '9999-12-31')
                ->first();

            $nextTitle = $next?->title ?? '—';

            $dueRaw = trim((string)($next?->due ?? ''));
            $milestoneDue = $dueRaw !== ''
                ? Carbon::parse($dueRaw)->format('Y-m-d')
                : ($p->due_date ? $p->due_date->format('Y-m-d') : '—');

            return [
                'id' => $p->id,
                'name' => $p->name ?? 'Project',
                'status' => $p->status ?? 'draft',
                'client' => $p->user->name ?? 'Client',
                'progress' => (int) ($p->progress ?? 0),
                'nextMilestone' => $nextTitle,
                'milestoneDue' => $milestoneDue,
                'updatedAt' => $p->updated_at?->format('Y-m-d') ?? '',
            ];
        })->values();

        $activeCount = Project::where('status', 'active')->count();

        $milestonesDueSoon = Project::query()
            ->where('status', 'active')
            ->whereNotNull('due_date')
            ->whereBetween('due_date', [now()->startOfDay(), now()->addDays($milestoneDays)->endOfDay()])
            ->count();

        /* =========================
           DOCUMENTS (list + KPI)
        ========================= */

        $documentsRaw = Document::query()
            ->with('user:id,name,email')
            ->orderByDesc('document_date')
            ->orderByDesc('id')
            ->limit($docLimit)
            ->get();

        $documents = $documentsRaw->map(function ($d) {
            $status = $d->status ?? 'new';

            return [
                'id' => $d->id,
                'file' => $d->name ?? 'Document',
                'client' => $d->user->name ?? 'Client',
                'uploadedAt' => $d->document_date
                    ? Carbon::parse($d->document_date)->format('Y-m-d')
                    : ($d->created_at?->format('Y-m-d') ?? ''),
                'status' => strtolower((string) $status),
            ];
        })->values();

        $docsNew = Schema::hasColumn('documents', 'status')
            ? Document::where('status', 'new')->count()
            : Document::where('created_at', '>=', now()->subDays(7))->count();

        /* =========================
           CHARTS
        ========================= */

        // Appointments by status (pending/approved/rejected)
        $appointmentsByStatusRaw = Appointment::query()
            ->selectRaw("approval_status, COUNT(*) as c")
            ->groupBy("approval_status")
            ->pluck("c", "approval_status");

        $appointmentsByStatus = [
            'pending'  => (int) ($appointmentsByStatusRaw['pending'] ?? 0),
            'approved' => (int) ($appointmentsByStatusRaw['accepted'] ?? 0),
            'rejected' => (int) ($appointmentsByStatusRaw['declined'] ?? 0),
        ];

        // Projects by status
        $projectsByStatusRaw = Project::query()
            ->selectRaw("status, COUNT(*) as c")
            ->groupBy("status")
            ->pluck("c", "status");

        $projectsByStatus = [
            'active'    => (int) ($projectsByStatusRaw['active'] ?? 0),
            'on_hold'   => (int) ($projectsByStatusRaw['on_hold'] ?? 0),
            'completed' => (int) ($projectsByStatusRaw['completed'] ?? 0),
            'draft'     => (int) ($projectsByStatusRaw['draft'] ?? 0),
        ];

        // Documents per month (last 6 months)
        $start = now()->startOfMonth()->subMonths(5);

        $docsMonthlyRaw = Document::query()
            ->where('document_date', '>=', $start)
            ->selectRaw("DATE_FORMAT(document_date, '%Y-%m') as ym, COUNT(*) as c")
            ->groupBy('ym')
            ->orderBy('ym')
            ->pluck('c', 'ym');

        $documentsMonthly = [];
        for ($i = 0; $i < 6; $i++) {
            $key = $start->copy()->addMonths($i)->format('Y-m');
            $documentsMonthly[] = [
                'month' => $key,
                'count' => (int) ($docsMonthlyRaw[$key] ?? 0),
            ];
        }

        /* =========================
           ACTIVITY
        ========================= */

        $activity = ActivityLog::with('user')
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'user' => $log->user?->name ?? 'System',
                    'type' => $log->type,
                    'action' => $log->action,
                    'description' => $log->description,
                    'when' => $log->created_at->diffForHumans(),
                ];
            })
            ->values();

        return response()->json([
            'kpis' => [
                'pendingCount' => $pendingCount,
                'activeCount' => $activeCount,
                'docsNew' => $docsNew,
                'milestonesDue' => $milestonesDueSoon,
            ],
            'charts' => [
                'appointmentsByStatus' => $appointmentsByStatus,
                'projectsByStatus' => $projectsByStatus,
                'documentsMonthly' => $documentsMonthly,
            ],
            'appointments' => $appointments,
            'projects' => $projects,
            'documents' => $documents,
            'activity' => $activity,
        ]);
    }
}
