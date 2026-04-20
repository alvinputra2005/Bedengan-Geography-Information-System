<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MitigationReport;
use App\Services\SupabaseStorageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use RuntimeException;

class MitigationReportController extends Controller
{
    public function __construct(
        protected SupabaseStorageService $storageService
    ) {
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reporter_name' => ['required', 'string', 'max:120'],
            'incident_location' => ['required', 'string', 'max:150'],
            'incident_category' => ['nullable', 'string', 'max:60'],
            'description' => ['required', 'string', 'max:5000'],
            'photo' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $user = $request->user();
        $uploadedPhoto = null;

        if ($request->hasFile('photo')) {
            try {
                $uploadedPhoto = $this->storageService->uploadMitigationReportImage($request->file('photo'));
            } catch (RuntimeException $exception) {
                return response()->json([
                    'message' => $exception->getMessage(),
                ], 500);
            }
        }

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
            'photo_bucket' => $uploadedPhoto['bucket'] ?? null,
            'photo_path' => $uploadedPhoto['path'] ?? null,
            'photo_url' => $uploadedPhoto['public_url'] ?? null,
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
            'photo_url' => $this->storageService->resolveAssetUrl($report->photo_bucket, $report->photo_path) ?? $report->photo_url,
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
