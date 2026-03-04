<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Document;
use App\Http\Resources\DocumentResource;
use Illuminate\Support\Facades\Storage;
use App\Services\NotificationService;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;

class AdminDocumentController extends Controller
{
    /**
     * GET /api/admin/documents/clients
     * Returns: [{id, name}, ...]
     */
    public function clients(Request $request)
    {
        $limit = (int) $request->query('limit', 10);
        $qText = trim((string) $request->query('q', ''));
        $sort  = (string) $request->query('sort', 'name_asc');

        $query = \App\Models\User::query()
            ->where('is_admin', 0)
            ->withCount('documents'); // ← keep only this

        if ($qText !== '') {
            $query->where(function ($sub) use ($qText) {
                $sub->where('name', 'like', "%{$qText}%")
                    ->orWhere('email', 'like', "%{$qText}%")
                    ->orWhere('id', $qText);
            });
        }

        switch ($sort) {
            case 'name_desc':
                $query->orderByDesc('name');
                break;

            case 'recent':
                $query->orderByDesc('updated_at');
                break;

            default:
                $query->orderBy('name');
                break;
        }

        $paginator = $query->paginate($limit);

        return response()->json([
            'data' => $paginator->items(),
            'page' => $paginator->currentPage(),
            'totalPages' => $paginator->lastPage(),
            'total' => $paginator->total(),
        ]);
    }

    /**
     * GET /api/admin/documents?type=all|Contract|...&page=1&limit=12&q=
     */
    public function index(Request $request)
    {
        $type  = (string) $request->query('type', 'all');
        $limit = (int) $request->query('limit', 12);
        $qText = trim((string) $request->query('q', ''));

        $q = Document::query()->with('user');

        if ($type !== 'all') {
            $q->where('type', $type);
        }

        if ($qText !== '') {
            $q->where(function ($sub) use ($qText) {
                $sub->where('name', 'like', "%{$qText}%")
                    ->orWhere('id', $qText);
            });
        }

        $q->orderByDesc('document_date')->orderByDesc('id');

        $p = $q->paginate($limit);

        return response()->json([
            'data' => DocumentResource::collection($p)->resolve(),
            'page' => $p->currentPage(),
            'totalPages' => $p->lastPage(),
            'total' => $p->total(),
        ]);
    }

    public function clientDocuments(Request $request, \App\Models\User $user)
    {
        $type  = (string) $request->query('type', 'All Types');
        $limit = (int) $request->query('limit', 6);
        $qText = trim((string) $request->query('q', ''));
        $sort  = (string) $request->query('sort', 'newest');

        $q = \App\Models\Document::query()
            ->where('user_id', $user->id);

        if ($type !== 'All Types' && $type !== 'all') {
            $q->where('type', $type);
        }

        if ($qText !== '') {
            $q->where('name', 'like', "%{$qText}%");
        }

        // Filter by dateRange
        $dateRange = (string) $request->query('dateRange', 'All Time');
        switch ($dateRange) {
            case 'Last 3 Months':
                $q->where('document_date', '>=', now()->subMonths(3));
                break;
            case 'Last 6 Months':
                $q->where('document_date', '>=', now()->subMonths(6));
                break;
            case 'This Year':
                $q->whereYear('document_date', now()->year);
                break;
            case 'All Time':
            default:
                break;
        }

        if ($sort === 'oldest') {
            $q->orderBy('document_date');
        } else {
            $q->orderByDesc('document_date');
        }

        $p = $q->paginate($limit);

        return response()->json([
            'data' => \App\Http\Resources\DocumentResource::collection($p)->resolve(),
            'page' => $p->currentPage(),
            'totalPages' => $p->lastPage(),
            'total' => $p->total(),
        ]);
    }


    /**
     * POST /api/admin/documents
     * form-data:
     * - user_id (required)
     * - type (required)
     * - document_date (required date)
     * - shared_by (optional)
     * - file (required file: pdf)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'type' => ['required', 'string', 'max:80'],
            'document_date' => ['required', 'date'],
            'shared_by' => ['nullable', 'string', 'max:255'],
            'file' => ['required', 'file', 'mimes:pdf', 'max:10240'],
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();

        $path = $file->store("documents/{$validated['user_id']}", 'public');

        $doc = Document::create([
            'user_id' => $validated['user_id'],
            'name' => $originalName,
            'type' => $validated['type'],
            'shared_by' => $validated['shared_by'] ?? null,
            'document_date' => $validated['document_date'],
            'file_path' => $path,
        ]);

        $admin = Auth::user();
        $adminName = $admin ? $admin->name : 'System';

        ActivityLog::create([
            'user_id' => Auth::id(),
            'type' => 'document',
            'action' => 'created',
            'description' => "{$adminName} uploaded document: {$doc->name}",
            'related_id' => $doc->id,
            'related_type' => 'Document',
        ]);

        $user = User::find($validated['user_id']);

        NotificationService::send(
            $user,
            'document',
            "A new document '{$doc->name}' has been uploaded to your account.",
            $doc->id,
            'Document'
        );

        return (new DocumentResource($doc->load('user')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * PATCH /api/admin/documents/{document}
     * JSON or form-data:
     * - name (optional)
     * - type (optional)
     * - document_date (optional date)
     * - shared_by (optional)
     * - user_id (optional: move ownership)
     * - file (optional: replace pdf)
     */
    public function update(Request $request, Document $document)
    {
        $validated = $request->validate([
            'user_id' => ['sometimes', 'exists:users,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'type' => ['sometimes', 'string', 'max:80'],
            'document_date' => ['sometimes', 'date'],
            'shared_by' => ['sometimes', 'nullable', 'string', 'max:255'],
            'file' => ['sometimes', 'file', 'mimes:pdf', 'max:10240'],
        ]);

        // replace file if provided
        if ($request->hasFile('file')) {
            if ($document->file_path) {
                Storage::disk('public')->delete($document->file_path);
            }

            $file = $request->file('file');
            $newPath = $file->store(
                "documents/" . ($validated['user_id'] ?? $document->user_id),
                'public'
            );

            $validated['file_path'] = $newPath;

            // if they didn't provide name explicitly, use uploaded file name
            if (!array_key_exists('name', $validated)) {
                $validated['name'] = $file->getClientOriginalName();
            }
        }

        $document->update($validated);

        $admin = Auth::user();
        $adminName = $admin ? $admin->name : 'System';

        ActivityLog::create([
            'user_id' => Auth::id(),
            'type' => 'document',
            'action' => 'updated',
            'description' => "{$adminName} updated document: {$document->name}",
            'related_id' => $document->id,
            'related_type' => 'Document',
        ]);

        NotificationService::send(
            $document->user,
            'document',
            "Your document '{$document->name}' has been updated.",
            $document->id,
            'Document'
        );

        return (new DocumentResource($document->fresh()->load('user')))->response();
    }

    /**
     * DELETE /api/admin/documents/{document}
     */
    public function destroy(Document $document)
    {
        $name = $document->name;
        $id = $document->id;

        if ($document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        $admin = Auth::user();
        $adminName = $admin ? $admin->name : 'System';

        ActivityLog::create([
            'user_id' => Auth::id(),
            'type' => 'document',
            'action' => 'deleted',
            'description' => "{$adminName} deleted document: {$name}",
            'related_id' => $id,
            'related_type' => 'Document',
        ]);

        NotificationService::send(
            $document->user,
            'document',
            "Your document '{$name}' has been removed from your account.",
            $id,
            'Document'
        );

        return response()->json(['ok' => true]);
    }
}
