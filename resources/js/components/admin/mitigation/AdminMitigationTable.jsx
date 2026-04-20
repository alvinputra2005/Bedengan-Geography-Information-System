import AdminMitigationTableRow from './AdminMitigationTableRow';

export default function AdminMitigationTable({
    reports,
    summary,
    drafts,
    expandedReportId,
    savingId,
    onToggleExpanded,
    onDraftChange,
    onSave,
}) {
    return (
        <section className="overflow-hidden rounded-[32px] border border-outline-variant/15 bg-white/90 shadow-[0_20px_50px_-36px_rgba(19,27,46,0.45)]">
            <div className="flex flex-col gap-4 border-b border-outline-variant/10 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface/45">Data Table</p>
                    <h2 className="mt-2 font-headline text-2xl font-bold text-on-surface">Kelola laporan insiden lapangan</h2>
                </div>
            </div>

            <div className="border-b border-outline-variant/10 px-5 py-4 lg:px-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white">Semua Laporan</span>
                        
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full whitespace-nowrap text-left text-sm">
                    <thead className="bg-surface-container-low/70 text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                        <tr>
                            <th className="px-5 py-4 font-bold lg:px-6">ID Laporan</th>
                            <th className="px-5 py-4 font-bold lg:px-6">Tanggal</th>
                            <th className="px-5 py-4 font-bold lg:px-6">Pelapor</th>
                            <th className="px-5 py-4 font-bold lg:px-6">Lokasi</th>
                            <th className="px-5 py-4 font-bold lg:px-6">Kategori</th>
                            <th className="px-5 py-4 font-bold lg:px-6">Prioritas</th>
                            <th className="px-5 py-4 font-bold lg:px-6">Status</th>
                            <th className="px-5 py-4 text-right font-bold lg:px-6">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                        {reports.map((report) => (
                            <AdminMitigationTableRow
                                key={report.id}
                                report={report}
                                draft={drafts[report.id] ?? {
                                    status: report.status,
                                    priority: report.priority,
                                    adminNotes: report.admin_notes ?? '',
                                }}
                                isExpanded={expandedReportId === report.id}
                                savingId={savingId}
                                onToggle={() => onToggleExpanded(report.id)}
                                onDraftChange={onDraftChange}
                                onSave={onSave}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
