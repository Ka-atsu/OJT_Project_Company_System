<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Http\Resources\DocumentResource;

class DocumentController extends Controller
{
    /**
     * GET /api/documents?q=&type=&dateRange=&sort=newest|oldest&page=1&limit=6
     */
    public function index(Request $request)
    {
        $limit = (int) $request->query('limit', 6);
        $qText = trim((string) $request->query('q', ''));
        $type = (string) $request->query('type', 'All Types');
        $dateRange = (string) $request->query('dateRange', 'Last 3 Months');
        $sort = (string) $request->query('sort', 'newest');

        $q = Document::query()
            ->where('user_id', $request->user()->id);

        if ($type !== '' && $type !== 'All Types') {
            $q->where('type', $type);
        }

        if ($qText !== '') {
            $q->where('name', 'like', "%{$qText}%");
        }

        if ($dateRange !== '' && $dateRange !== 'All Time') {
            $from = match ($dateRange) {
                'Last 3 Months' => now()->subMonths(3),
                'Last 6 Months' => now()->subMonths(6),
                'This Year'     => now()->startOfYear(),
                default         => null,
            };

            if ($from) {
                $q->whereDate('document_date', '>=', $from);
            }
        }

        if ($sort === 'oldest') {
            $q->orderBy('document_date')->orderBy('id');
        } else {
            $q->orderByDesc('document_date')->orderByDesc('id');
        }

        $p = $q->paginate($limit);

        return response()->json([
            'data' => DocumentResource::collection($p)->resolve(),
            'page' => $p->currentPage(),
            'totalPages' => $p->lastPage(),
            'total' => $p->total(),
        ]);
    }
}
