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
        // Getting the query parameters
        $limit  = (int) $request->query('limit', 12);
        $qText  = trim((string) $request->query('q', ''));
        $status = (string) $request->query('status', '');
        $sort   = (string) $request->query('sort', '');

        // Log the incoming request parameters for debugging
        Log::info("Incoming Request Parameters: ", [
            'limit' => $limit,
            'qText' => $qText,
            'status' => $status,
            'sort' => $sort
        ]);

        Log::info("Received status in request: ", ['status' => $status]);
        // Status mapping: frontend status to database values
        $statusMapping = [
            'active'    => 'active',
            'draft'     => 'draft',
            'on_hold'   => 'on_hold',
            'completed' => 'completed',
        ];

        // If status is 'all', do not apply any status filter
        // If status is a valid status, map it to the corresponding database value
        if ($status === 'all' || !isset($statusMapping[$status])) {
            $status = null;  // This will cause the filter to be ignored in the query
        } else {
            $status = $statusMapping[$status];
        }

        // Log the final status that is being applied
        Log::info("Final Status Filter: ", ['status' => $status]);

        // Building the query for fetching projects
        $q = Project::query()
            ->with('milestones')  // Include related milestones (optional)
            ->where('user_id', $request->user()->id);  // Ensure projects belong to the current user

        // Apply the status filter only if it's not null
        if ($status !== null) {
            $q->where('status', $status);
            Log::info("Status filter applied: ", ['status' => $status]); // Log when the filter is applied
        }

        // Search by name or ID if provided
        if ($qText !== '') {
            $q->where(function ($sub) use ($qText) {
                $sub->where('name', 'like', "%{$qText}%")
                    ->orWhere('id', $qText);
            });
            Log::info("Search text applied: ", ['qText' => $qText]); // Log the search filter applied
        }

        // Sorting logic based on frontend options
        if ($sort === 'due_desc') {
            $q->orderByDesc('due_date')->orderByDesc('updated_at');
        } elseif ($sort === 'updated_desc') {
            $q->orderByDesc('updated_at');
        } else {
            // Default sorting by due date (ascending)
            $q->orderBy('due_date')->orderByDesc('updated_at');
        }

        // Log the final SQL query being executed
        Log::info("Final Query: ", ['query' => $q->toSql()]);

        // Paginate the results
        $p = $q->paginate($limit);

        // Return paginated results with additional metadata
        return response()->json([
            'data' => ProjectResource::collection($p)->resolve(),
            'page' => $p->currentPage(),
            'totalPages' => $p->lastPage(),
            'total' => $p->total(),
        ]);
    }
}
