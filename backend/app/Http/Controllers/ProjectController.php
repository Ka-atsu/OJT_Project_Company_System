<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        $status = (string) $request->query('status', '');
        $sort   = (string) $request->query('sort', '');

        // Allowed statuses for CLIENT
        $allowedStatuses = ['active', 'on_hold', 'completed'];

        // Build base query (🚫 NEVER include draft)
        $q = Project::query()
            ->with(['milestones', 'photos'])
            ->where('user_id', $request->user()->id)
            ->whereIn('status', $allowedStatuses);

        // Apply status filter if valid
        if ($status && $status !== 'all' && in_array($status, $allowedStatuses)) {
            $q->where('status', $status);
        }

        // Search filter
        if ($qText !== '') {
            $q->where(function ($sub) use ($qText) {
                $sub->where('name', 'like', "%{$qText}%")
                    ->orWhere('id', $qText);
            });
        }

        // Sorting
        switch ($sort) {
            case 'due_desc':
                $q->orderByDesc('due_date')->orderByDesc('updated_at');
                break;

            case 'updated_desc':
                $q->orderByDesc('updated_at');
                break;

            default:
                $q->orderBy('due_date')->orderByDesc('updated_at');
                break;
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
