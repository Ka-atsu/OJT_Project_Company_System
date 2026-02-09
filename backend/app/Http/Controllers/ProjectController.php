<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    /**
     * GET /api/projects?q=&status=all|active|draft|on_hold|completed&sort=due_asc|due_desc|updated_desc&page=1&limit=12
     */
    public function index(Request $request)
    {
        $limit  = (int) $request->query('limit', 12);
        $qText  = trim((string) $request->query('q', ''));
        $status = (string) $request->query('status', 'all');
        $sort   = (string) $request->query('sort', 'due_asc');

        $q = Project::query()
            ->with('milestones')
            ->where('user_id', $request->user()->id);

        if ($status !== '' && $status !== 'all') {
            $q->where('status', $status);
        }

        if ($qText !== '') {
            $q->where(function ($sub) use ($qText) {
                $sub->where('name', 'like', "%{$qText}%")
                    ->orWhere('id', $qText);
            });
        }

        // Sorting (match your frontend options)
        if ($sort === 'due_desc') {
            $q->orderByDesc('due_date')->orderByDesc('updated_at');
        } elseif ($sort === 'updated_desc') {
            $q->orderByDesc('updated_at');
        } else { // due_asc
            $q->orderBy('due_date')->orderByDesc('updated_at');
        }

        $p = $q->paginate($limit);

        return response()->json([
            'data' => ProjectResource::collection($p)->resolve(),
            'page' => $p->currentPage(),
            'totalPages' => $p->lastPage(),
            'total' => $p->total(),
        ]);
    }
}
