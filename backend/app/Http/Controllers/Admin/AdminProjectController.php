<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\ProjectPhoto;
use Illuminate\Support\Facades\Storage;

class AdminProjectController extends Controller
{
    public function clients()
    {
        return response()->json(
            User::where('is_admin', 0)
                ->select('id', 'name', 'email')
                ->orderBy('name')
                ->get()
        );
    }

    public function index(Request $request)
    {
        $page = (int) $request->query('page', 1);
        $pageSize = (int) $request->query('pageSize', 12);
        $status = (string) $request->query('status', 'active');
        $qText = trim((string) $request->query('q', ''));
        $sort = (string) $request->query('sort', 'due_asc');

        $q = Project::query()
            ->with(['user:id,name,email', 'milestones', 'photos'])
            ->when($status !== 'all', fn($qq) => $qq->where('status', $status))
            ->when($qText !== '', function ($qq) use ($qText) {
                $qq->where('name', 'like', "%{$qText}%")
                    ->orWhere('id', $qText)
                    ->orWhereHas(
                        'user',
                        fn($u) =>
                        $u->where('name', 'like', "%{$qText}%")
                    );
            });

        match ($sort) {
            'due_desc' => $q->orderByDesc('due_date'),
            'updated_desc' => $q->orderByDesc('updated_at'),
            default => $q->orderBy('due_date'),
        };

        $p = $q->paginate($pageSize, ['*'], 'page', $page);

        return response()->json([
            'items' => ProjectResource::collection($p)->resolve(),
            'total' => $p->total(),
        ]);
    }

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

            // photos only
            'photos' => ['nullable', 'array'],
            'photos.*' => ['image', 'max:5120'],
        ]);

        // decode milestones JSON
        $milestones = json_decode($request->input('milestones', '[]'), true);
        if (!is_array($milestones)) $milestones = [];

        $project = Project::create([
            'user_id' => $data['clientId'] ?? $request->user()->id,
            'name' => $data['name'],
            'status' => $data['status'],
            'start_date' => $data['startDate'] ?? null,
            'due_date' => $data['dueDate'] ?? null,
            'budget' => (int) ($data['budget'] ?? 0),
            'progress' => (int) ($data['progress'] ?? 0),
            'description' => $data['description'] ?? null,
        ]);

        foreach ($milestones as $m) {
            $project->milestones()->create([
                'title' => $m['title'],
                'due' => $m['due'] ?? null,
                'status' => $m['status'],
            ]);
        }

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $project->photos()->create([
                    'path' => $photo->store('projects', 'public'),
                ]);
            }
        }

        return (new ProjectResource(
            $project->load(['user', 'milestones', 'photos'])
        ))->response()->setStatusCode(201);
    }

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

            'photos' => ['nullable', 'array'],
            'photos.*' => ['image', 'max:5120'],
        ]);

        $milestones = json_decode($request->input('milestones', '[]'), true);
        if (!is_array($milestones)) $milestones = [];

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

        $project->milestones()->delete();
        foreach ($milestones as $m) {
            $project->milestones()->create([
                'title' => $m['title'],
                'due' => $m['due'] ?? null,
                'status' => $m['status'],
            ]);
        }

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $project->photos()->create([
                    'path' => $photo->store('projects', 'public'),
                ]);
            }
        }

        return new ProjectResource(
            $project->load(['user', 'milestones', 'photos'])
        );
    }

    public function destroyPhoto(ProjectPhoto $photo)
    {
        // delete file from storage
        Storage::disk('public')->delete($photo->path);

        // delete database row
        $photo->delete();

        return response()->json(['ok' => true]);
    }
}
