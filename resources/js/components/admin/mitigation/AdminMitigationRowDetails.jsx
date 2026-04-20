import { ArrowRight, CalendarClock, Image as ImageIcon, LoaderCircle, MapPin, UserRound } from 'lucide-react';
import {
    PRIORITY_OPTIONS,
    STATUS_OPTIONS,
    formatDateTime,
    getLabel,
} from './mitigationReportUi';

export default function AdminMitigationRowDetails({
    report,
    draft,
    savingId,
    onDraftChange,
    onSave,
}) {
    return (
        <tr className="bg-surface-container-low/45">
            <td colSpan={8} className="px-5 py-5 lg:px-6">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                    <div className="space-y-5">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-[24px] border border-outline-variant/10 bg-white/90 p-4">
                                <div className="flex items-center gap-2 text-on-surface/55">
                                    <UserRound size={16} />
                                    <p className="text-[11px] font-bold uppercase tracking-[0.16em]">Pelapor</p>
                                </div>
                                <p className="mt-3 text-sm font-semibold text-on-surface">{report.reporter_name}</p>
                                <p className="mt-1 text-xs text-on-surface-variant">
                                    {report.reporter_email || 'Email tidak tersedia'}
                                </p>
                            </div>

                            <div className="rounded-[24px] border border-outline-variant/10 bg-white/90 p-4">
                                <div className="flex items-center gap-2 text-on-surface/55">
                                    <MapPin size={16} />
                                    <p className="text-[11px] font-bold uppercase tracking-[0.16em]">Lokasi</p>
                                </div>
                                <p className="mt-3 text-sm font-semibold text-on-surface">{report.incident_location}</p>
                                <p className="mt-1 text-xs text-on-surface-variant">
                                    {report.incident_category || 'Kategori belum diisi'}
                                </p>
                            </div>

                            <div className="rounded-[24px] border border-outline-variant/10 bg-white/90 p-4">
                                <div className="flex items-center gap-2 text-on-surface/55">
                                    <CalendarClock size={16} />
                                    <p className="text-[11px] font-bold uppercase tracking-[0.16em]">Review</p>
                                </div>
                                <p className="mt-3 text-sm font-semibold text-on-surface">{formatDateTime(report.reviewed_at)}</p>
                                <p className="mt-1 text-xs text-on-surface-variant">
                                    {report.reviewer?.name ? `Terakhir oleh ${report.reviewer.name}` : 'Belum ada reviewer'}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-outline-variant/10 bg-white/90 p-5">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface/45">
                                Deskripsi Insiden
                            </p>
                            <p className="mt-3 text-sm leading-7 text-on-surface-variant">{report.description}</p>
                        </div>

                        <div className="grid gap-4 xl:grid-cols-[220px_220px_minmax(0,1fr)_200px]">
                            <div>
                                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface/45">
                                    Status
                                </label>
                                <select
                                    value={draft.status}
                                    onChange={(event) => onDraftChange(report.id, 'status', event.target.value)}
                                    className="w-full rounded-2xl border border-outline-variant/15 bg-white px-4 py-3 text-sm font-semibold text-on-surface outline-none focus:border-primary/30"
                                >
                                    {STATUS_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface/45">
                                    Prioritas
                                </label>
                                <select
                                    value={draft.priority}
                                    onChange={(event) => onDraftChange(report.id, 'priority', event.target.value)}
                                    className="w-full rounded-2xl border border-outline-variant/15 bg-white px-4 py-3 text-sm font-semibold text-on-surface outline-none focus:border-primary/30"
                                >
                                    {PRIORITY_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface/45">
                                    Catatan Admin
                                </label>
                                <textarea
                                    rows={4}
                                    value={draft.adminNotes}
                                    onChange={(event) => onDraftChange(report.id, 'adminNotes', event.target.value)}
                                    placeholder="Tulis tindak lanjut, hasil verifikasi, atau kebutuhan lapangan."
                                    className="w-full rounded-2xl border border-outline-variant/15 bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-primary/30"
                                ></textarea>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="button"
                                    onClick={() => onSave(report.id)}
                                    disabled={savingId === report.id}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {savingId === report.id ? (
                                        <LoaderCircle size={18} className="animate-spin" />
                                    ) : (
                                        <ArrowRight size={18} />
                                    )}
                                    {savingId === report.id ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {report.photo_url ? (
                            <a
                                href={report.photo_url}
                                target="_blank"
                                rel="noreferrer"
                                className="block overflow-hidden rounded-[28px] border border-outline-variant/10 bg-white shadow-sm"
                            >
                                <img
                                    src={report.photo_url}
                                    alt={`Lampiran ${report.report_code}`}
                                    className="h-72 w-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            </a>
                        ) : (
                            <div className="flex h-72 items-center justify-center rounded-[28px] border border-dashed border-outline-variant/20 bg-white px-6 text-center">
                                <div>
                                    <ImageIcon className="mx-auto text-on-surface/35" size={28} />
                                    <p className="mt-3 text-sm font-semibold text-on-surface">Tidak ada lampiran foto</p>
                                    <p className="mt-1 text-xs text-on-surface-variant">
                                        Laporan ini dikirim tanpa dokumentasi visual.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="rounded-[28px] border border-outline-variant/10 bg-white/90 p-5">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface/45">
                                Ringkasan Admin
                            </p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface/45">
                                        Dilaporkan
                                    </p>
                                    <p className="mt-2 text-sm font-semibold text-on-surface">
                                        {formatDateTime(report.reported_at)}
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface/45">
                                        Status Draft
                                    </p>
                                    <p className="mt-2 text-sm font-semibold text-on-surface">
                                        {getLabel(STATUS_OPTIONS, draft.status)}
                                    </p>
                                    <p className="mt-1 text-xs text-on-surface-variant">
                                        Prioritas {getLabel(PRIORITY_OPTIONS, draft.priority)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
}
