import { AlertTriangle, CheckCircle2, Clock3, LoaderCircle, ShieldAlert, Siren, TriangleAlert } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import AdminCampingStatCard from '../../components/admin/AdminCampingStatCard';
import AdminHeader from '../../components/admin/AdminHeader';
import { fetchAdminMitigationReports, updateMitigationReport } from '../../services/mitigationReportService';

const STATUS_OPTIONS = [
    { value: 'pending', label: 'Menunggu' },
    { value: 'reviewed', label: 'Ditinjau' },
    { value: 'in_progress', label: 'Diproses' },
    { value: 'resolved', label: 'Selesai' },
    { value: 'rejected', label: 'Ditolak' },
];

const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Rendah' },
    { value: 'medium', label: 'Sedang' },
    { value: 'high', label: 'Tinggi' },
    { value: 'critical', label: 'Kritis' },
];

function buildDrafts(reports) {
    return reports.reduce((result, report) => {
        result[report.id] = {
            status: report.status,
            priority: report.priority,
            adminNotes: report.admin_notes ?? '',
        };

        return result;
    }, {});
}

function formatDateTime(value) {
    if (!value) {
        return '-';
    }

    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value));
}

function getStatusBadgeClass(status) {
    return {
        pending: 'bg-amber-100 text-amber-700',
        reviewed: 'bg-sky-100 text-sky-700',
        in_progress: 'bg-blue-100 text-blue-700',
        resolved: 'bg-emerald-100 text-emerald-700',
        rejected: 'bg-rose-100 text-rose-700',
    }[status] ?? 'bg-slate-100 text-slate-700';
}

function getPriorityBadgeClass(priority) {
    return {
        low: 'bg-slate-100 text-slate-700',
        medium: 'bg-amber-100 text-amber-700',
        high: 'bg-orange-100 text-orange-700',
        critical: 'bg-rose-100 text-rose-700',
    }[priority] ?? 'bg-slate-100 text-slate-700';
}

function getLabel(options, value) {
    return options.find((item) => item.value === value)?.label ?? value;
}

export default function AdminMitigationPage() {
    const [reports, setReports] = useState([]);
    const [summary, setSummary] = useState(null);
    const [drafts, setDrafts] = useState({});
    const [error, setError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [savingId, setSavingId] = useState(null);

    async function loadReports() {
        try {
            const response = await fetchAdminMitigationReports();
            const nextReports = response?.data ?? [];

            setReports(nextReports);
            setSummary(response?.summary ?? null);
            setDrafts(buildDrafts(nextReports));
            setError('');
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Gagal memuat laporan mitigasi.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadReports();
    }, []);

    const cards = useMemo(() => ([
        { icon: ShieldAlert, label: 'Total Laporan', value: summary?.total_reports ?? 0, tone: 'primary' },
        { icon: Clock3, label: 'Menunggu', value: summary?.pending_reports ?? 0, tone: 'warning' },
        { icon: TriangleAlert, label: 'Aktif Diproses', value: summary?.active_reports ?? 0, tone: 'danger' },
        { icon: CheckCircle2, label: 'Selesai', value: summary?.resolved_reports ?? 0, tone: 'success' },
        { icon: Siren, label: 'Prioritas Kritis', value: summary?.critical_reports ?? 0, tone: 'danger' },
    ]), [summary]);

    function handleDraftChange(reportId, field, value) {
        setDrafts((current) => ({
            ...current,
            [reportId]: {
                ...(current[reportId] ?? {}),
                [field]: value,
            },
        }));
    }

    async function handleSave(reportId) {
        const draft = drafts[reportId];
        if (!draft) {
            return;
        }

        setSavingId(reportId);
        setSubmitError('');
        setSubmitSuccess('');

        try {
            await updateMitigationReport(reportId, draft);
            await loadReports();
            setSubmitSuccess('Perubahan laporan mitigasi berhasil disimpan.');
        } catch (requestError) {
            setSubmitError(requestError.response?.data?.message || 'Pembaruan laporan mitigasi gagal.');
        } finally {
            setSavingId(null);
        }
    }

    return (
        <div className="flex min-w-0 flex-1 flex-col">
            <AdminHeader
                title="Laporan Mitigasi"
                subtitle="Tinjau laporan insiden dari halaman mitigasi, atur prioritas, dan dokumentasikan tindak lanjut lapangan."
            />

            {error ? <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}
            {submitError ? <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{submitError}</p> : null}
            {submitSuccess ? (
                <p className="mb-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{submitSuccess}</p>
            ) : null}

            <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
                {cards.map((card) => (
                    <AdminCampingStatCard key={card.label} {...card} />
                ))}
            </div>

            {isLoading ? <p className="text-sm font-semibold text-on-surface-variant">Memuat laporan mitigasi...</p> : null}

            {!isLoading && reports.length === 0 ? (
                <section className="rounded-[28px] border border-dashed border-outline-variant/20 bg-white/80 px-6 py-10 text-center">
                    <AlertTriangle className="mx-auto text-on-surface/40" size={28} />
                    <h2 className="mt-4 font-headline text-2xl font-bold text-on-surface">Belum ada laporan masuk</h2>
                    <p className="mt-2 text-sm text-on-surface-variant">
                        Laporan dari halaman mitigasi akan muncul di sini setelah pengguna mengirim insiden.
                    </p>
                </section>
            ) : null}

            <div className="grid grid-cols-1 gap-5">
                {reports.map((report) => {
                    const draft = drafts[report.id] ?? {
                        status: report.status,
                        priority: report.priority,
                        adminNotes: report.admin_notes ?? '',
                    };

                    return (
                        <article
                            key={report.id}
                            className="rounded-[28px] border border-outline-variant/20 bg-white/90 p-5 shadow-xs md:p-6"
                        >
                            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <p className="font-headline text-2xl font-bold text-on-surface">{report.report_code}</p>
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${getStatusBadgeClass(report.status)}`}>
                                            {getLabel(STATUS_OPTIONS, report.status)}
                                        </span>
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${getPriorityBadgeClass(report.priority)}`}>
                                            Prioritas {getLabel(PRIORITY_OPTIONS, report.priority)}
                                        </span>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                                        <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/45">Pelapor</p>
                                            <p className="mt-2 text-sm font-semibold text-on-surface">{report.reporter_name}</p>
                                            <p className="mt-1 text-xs text-on-surface-variant">{report.reporter_email || 'Email tidak tersedia'}</p>
                                        </div>
                                        <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/45">Lokasi</p>
                                            <p className="mt-2 text-sm font-semibold text-on-surface">{report.incident_location}</p>
                                            <p className="mt-1 text-xs text-on-surface-variant">{report.incident_category || 'Kategori belum diisi'}</p>
                                        </div>
                                        <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/45">Dilaporkan</p>
                                            <p className="mt-2 text-sm font-semibold text-on-surface">{formatDateTime(report.reported_at)}</p>
                                            <p className="mt-1 text-xs text-on-surface-variant">
                                                {report.reviewer?.name
                                                    ? `Ditinjau oleh ${report.reviewer.name}`
                                                    : 'Belum ada petugas yang meninjau'}
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/45">Review Terakhir</p>
                                            <p className="mt-2 text-sm font-semibold text-on-surface">{formatDateTime(report.reviewed_at)}</p>
                                            <p className="mt-1 text-xs text-on-surface-variant">
                                                {report.photo_url ? 'Foto lampiran tersedia' : 'Tanpa lampiran foto'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 rounded-2xl border border-outline-variant/15 bg-surface px-4 py-4">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/45">Deskripsi Insiden</p>
                                        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{report.description}</p>
                                    </div>
                                </div>

                                {report.photo_url ? (
                                    <a
                                        href={report.photo_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block overflow-hidden rounded-[24px] border border-outline-variant/20 bg-surface-container-low xl:w-[260px]"
                                    >
                                        <img
                                            src={report.photo_url}
                                            alt={`Lampiran ${report.report_code}`}
                                            className="h-56 w-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    </a>
                                ) : null}
                            </div>

                            <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[220px_220px_minmax(0,1fr)_180px]">
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-on-surface/45">
                                        Status
                                    </label>
                                    <select
                                        value={draft.status}
                                        onChange={(event) => handleDraftChange(report.id, 'status', event.target.value)}
                                        className="w-full rounded-2xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface outline-none focus:border-primary/30"
                                    >
                                        {STATUS_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-on-surface/45">
                                        Prioritas
                                    </label>
                                    <select
                                        value={draft.priority}
                                        onChange={(event) => handleDraftChange(report.id, 'priority', event.target.value)}
                                        className="w-full rounded-2xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface outline-none focus:border-primary/30"
                                    >
                                        {PRIORITY_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-on-surface/45">
                                        Catatan Admin
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={draft.adminNotes}
                                        onChange={(event) => handleDraftChange(report.id, 'adminNotes', event.target.value)}
                                        placeholder="Tulis tindak lanjut, hasil verifikasi, atau kebutuhan lapangan."
                                        className="w-full rounded-2xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none focus:border-primary/30"
                                    ></textarea>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        type="button"
                                        onClick={() => handleSave(report.id)}
                                        disabled={savingId === report.id}
                                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {savingId === report.id ? <LoaderCircle size={18} className="animate-spin" /> : null}
                                        {savingId === report.id ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
