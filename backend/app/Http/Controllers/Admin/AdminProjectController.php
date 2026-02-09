<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminProjectController extends Controller
{
    /**
     * GET /api/admin/projects/clients
     * Returns: [{id, name, email}, ...]
     */
    public function clients()
    {
        $clients = User::query()
            ->where('is_admin', 0)
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        return response()->json($clients);
    }

    /**
     * GET /api/admin/projects?page=1&pageSize=12&status=active&q=&sort=due_asc
     * Returns: { items: [], total: number }
     */
    public function index(Request $request)
    {
        $page = (int) $request->query('page', 1);
        $pageSize = (int) $request->query('pageSize', 12);
        $status = (string) $request->query('status', 'active');
        $qText = trim((string) $request->query('q', ''));
        $sort = (string) $request->query('sort', 'due_asc');

        $q = Project::query()
            ->with(['user:id,name,email', 'milestones'])
            ->when($status !== '' && $status !== 'all', fn($qq) => $qq->where('status', $status))
            ->when($qText !== '', function ($qq) use ($qText) {
                $qq->where(function ($w) use ($qText) {
                    $w->where('name', 'like', "%{$qText}%")
                        ->orWhere('id', $qText)
                        ->orWhereHas('user', fn($u) => $u->where('name', 'like', "%{$qText}%"));
                });
            });

        if ($sort === 'due_desc') {
            $q->orderByDesc('due_date')->orderByDesc('updated_at');
        } elseif ($sort === 'updated_desc') {
            $q->orderByDesc('updated_at');
        } else {
            $q->orderBy('due_date')->orderByDesc('updated_at'); // due_asc
        }

        $p = $q->paginate($pageSize, ['*'], 'page', $page);

        return response()->json([
            'items' => ProjectResource::collection($p)->resolve(),
            'total' => $p->total(),
        ]);
    }

    /**
     * POST /api/admin/projects
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'status' => ['required', Rule::in(['draft', 'active', 'on_hold', 'completed'])],

            'clientId' => ['nullable', 'exists:users,id'],

            'startDate' => ['nullable', 'date'],
            'dueDate' => ['nullable', 'date'],

            'budget' => ['nullable', 'numeric', 'min:0'],
            'progress' => ['nullable', 'integer', 'min:0', 'max:100'],
            'description' => ['nullable', 'string'],

            'milestones' => ['nullable', 'array'],
            'milestones.*.title' => ['required', 'string', 'max:255'],
            'milestones.*.due' => ['nullable', 'date'],
            'milestones.*.status' => ['required', Rule::in(['todo', 'doing', 'done'])],
        ]);

        $project = Project::create([
            'user_id' => $data['clientId'] ?? $request->user()->id, // fallback to logged in user if none
            'name' => $data['name'],
            'status' => $data['status'],
            'start_date' => $data['startDate'] ?? null,
            'due_date' => $data['dueDate'] ?? null,
            'budget' => (int) ($data['budget'] ?? 0),
            'progress' => (int) ($data['progress'] ?? 0),
            'description' => $data['description'] ?? null,
        ]);

        foreach (($data['milestones'] ?? []) as $m) {
            $project->milestones()->create([
                'title' => $m['title'],
                'due' => $m['due'] ?? null,
                'status' => $m['status'],
            ]);
        }

        return (new ProjectResource($project->fresh()->load(['user', 'milestones'])))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * PUT /api/admin/projects/{project}
     */
    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'status' => ['required', Rule::in(['draft', 'active', 'on_hold', 'completed'])],

            'clientId' => ['nullable', 'exists:users,id'],

            'startDate' => ['nullable', 'date'],
            'dueDate' => ['nullable', 'date'],

            'budget' => ['nullable', 'numeric', 'min:0'],
            'progress' => ['nullable', 'integer', 'min:0', 'max:100'],
            'description' => ['nullable', 'string'],

            'milestones' => ['nullable', 'array'],
            'milestones.*.title' => ['required', 'string', 'max:255'],
            'milestones.*.due' => ['nullable', 'date'],
            'milestones.*.status' => ['required', Rule::in(['todo', 'doing', 'done'])],
        ]);

        $project->update([
            'user_id' => $data['clientId'] ?? $project->user_id,
            'name' => $data['name'],
            'status' => $data['status'],
            'start_date' => $data['startDate'] ?? null,
            'due_date' => $data['dueDate'] ?? null,
            'budget' => (int) ($data['budget'] ?? 0),
            'progress' => (int) ($data['progress'] ?? 0),
            'description' => $data['description'] ?? null,
        ]);

        // simplest milestone sync: wipe + recreate
        $project->milestones()->delete();
        foreach (($data['milestones'] ?? []) as $m) {
            $project->milestones()->create([
                'title' => $m['title'],
                'due' => $m['due'] ?? null,
                'status' => $m['status'],
            ]);
        }

        return (new ProjectResource($project->fresh()->load(['user', 'milestones'])))->response();
    }
}
