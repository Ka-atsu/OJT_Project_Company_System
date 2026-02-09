<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Document;
use App\Http\Resources\DocumentResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class AdminDocumentController extends Controller
{
    /**
     * GET /api/admin/documents/clients
     * Returns: [{id, name}, ...]
     */
    public function clients()
    {
        $clients = \App\Models\User::query()
            ->where('is_admin', 0)
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return response()->json($clients);
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

        // dateRange hook (optional for now)
        // $dateRange = (string) $request->query('dateRange', 'All Time');

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
            'file' => ['required', 'file', 'mimes:pdf', 'max:10240'], // 10MB
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();

        // store under: storage/app/public/documents/{user_id}/...
        $path = $file->store("documents/{$validated['user_id']}", 'public');

        $doc = Document::create([
            'user_id' => $validated['user_id'],
            'name' => $originalName,
            'type' => $validated['type'],
            'shared_by' => $validated['shared_by'] ?? null,
            'document_date' => $validated['document_date'],
            'file_path' => $path,
        ]);

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

        return (new DocumentResource($document->fresh()->load('user')))->response();
    }

    /**
     * DELETE /api/admin/documents/{document}
     */
    public function destroy(Document $document)
    {
        if ($document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return response()->json(['ok' => true]);
    }
}
