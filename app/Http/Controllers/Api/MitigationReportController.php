<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MitigationReport;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MitigationReportController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reporter_name' => ['required', 'string', 'max:120'],
            'incident_location' => ['required', 'string', 'max:150'],
            'incident_category' => ['nullable', 'string', 'max:60'],
            'description' => ['required', 'string', 'max:5000'],
            'photo_bucket' => ['nullable', 'string', 'max:120'],
            'photo_path' => ['nullable', 'string', 'max:255'],
            'photo_url' => ['nullable', 'url', 'max:2000'],
        ]);

        $user = $request->user();

        $report = MitigationReport::query()->create([
            'report_code' => $this->generateReportCode(),
            'user_id' => $user?->id,
            'reporter_name' => trim($validated['reporter_name']),
            'reporter_email' => $user?->email,
            'incident_location' => trim($validated['incident_location']),
            'incident_category' => filled($validated['incident_category'] ?? null)
                ? trim($validated['incident_category'])
                : null,
            'description' => trim($validated['description']),
            'photo_bucket' => filled($validated['photo_bucket'] ?? null)
                ? trim($validated['photo_bucket'])
                : null,
            'photo_path' => filled($validated['photo_path'] ?? null)
                ? trim($validated['photo_path'])
                : null,
            'photo_url' => filled($validated['photo_url'] ?? null)
                ? trim($validated['photo_url'])
                : null,
            'reported_at' => now(),
        ]);

        return response()->json([
            'message' => 'Laporan mitigasi berhasil dikirim.',
            'data' => $this->transformReport($report->load(['reporter:id,name,email', 'reviewer:id,name'])),
        ], 201);
    }

    public function index(): JsonResponse
    {
        $reports = MitigationReport::query()
            ->with(['reporter:id,name,email', 'reviewer:id,name'])
            ->orderByDesc('reported_at')
            ->orderByDesc('id')
            ->get();

        return response()->json([
            'summary' => [
                'total_reports' => $reports->count(),
                'pending_reports' => $reports->where('status', 'pending')->count(),
                'active_reports' => $reports->whereIn('status', ['reviewed', 'in_progress'])->count(),
                'resolved_reports' => $reports->where('status', 'resolved')->count(),
                'critical_reports' => $reports->where('priority', 'critical')->count(),
            ],
            'data' => $reports->map(fn (MitigationReport $report) => $this->transformReport($report))->values(),
        ]);
    }

    public function update(Request $request, MitigationReport $mitigationReport): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,reviewed,in_progress,resolved,rejected'],
            'priority' => ['required', 'in:low,medium,high,critical'],
            'admin_notes' => ['nullable', 'string', 'max:5000'],
        ]);

        $nextStatus = $validated['status'];

        $mitigationReport->fill([
            'status' => $nextStatus,
            'priority' => $validated['priority'],
            'admin_notes' => filled($validated['admin_notes'] ?? null)
                ? trim($validated['admin_notes'])
                : null,
        ]);

        if ($nextStatus === 'pending') {
            $mitigationReport->reviewed_by = null;
            $mitigationReport->reviewed_at = null;
        } else {
            $mitigationReport->reviewed_by = $request->user()->id;
            $mitigationReport->reviewed_at = now();
        }

        $mitigationReport->save();

        return response()->json([
            'message' => 'Laporan mitigasi berhasil diperbarui.',
            'data' => $this->transformReport($mitigationReport->fresh()->load(['reporter:id,name,email', 'reviewer:id,name'])),
        ]);
    }

    protected function transformReport(MitigationReport $report): array
    {
        return [
            'id' => $report->id,
            'report_code' => $report->report_code,
            'reporter_name' => $report->reporter_name,
            'reporter_email' => $report->reporter_email,
            'incident_location' => $report->incident_location,
            'incident_category' => $report->incident_category,
            'description' => $report->description,
            'photo_bucket' => $report->photo_bucket,
            'photo_path' => $report->photo_path,
            'photo_url' => $report->photo_url,
            'status' => $report->status,
            'priority' => $report->priority,
            'admin_notes' => $report->admin_notes,
            'reported_at' => optional($report->reported_at)->toIso8601String(),
            'reviewed_at' => optional($report->reviewed_at)->toIso8601String(),
            'reporter' => $report->reporter ? [
                'id' => $report->reporter->id,
                'name' => $report->reporter->name,
                'email' => $report->reporter->email,
            ] : null,
            'reviewer' => $report->reviewer ? [
                'id' => $report->reviewer->id,
                'name' => $report->reviewer->name,
            ] : null,
        ];
    }

    protected function generateReportCode(): string
    {
        do {
            $candidate = 'MR-'.now()->format('Ymd').'-'.Str::upper(Str::random(6));
        } while (
            MitigationReport::query()
                ->where('report_code', $candidate)
                ->exists()
        );

        return $candidate;
    }
}
