export const STATUS_OPTIONS = [
    { value: 'pending', label: 'Menunggu' },
    { value: 'reviewed', label: 'Ditinjau' },
    { value: 'in_progress', label: 'Diproses' },
    { value: 'resolved', label: 'Selesai' },
    { value: 'rejected', label: 'Ditolak' },
];

export const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Rendah' },
    { value: 'medium', label: 'Sedang' },
    { value: 'high', label: 'Tinggi' },
    { value: 'critical', label: 'Kritis' },
];

export function buildDrafts(reports) {
    return reports.reduce((result, report) => {
        result[report.id] = {
            status: report.status,
            priority: report.priority,
            adminNotes: report.admin_notes ?? '',
        };

        return result;
    }, {});
}

export function formatDateTime(value) {
    if (!value) {
        return '-';
    }

    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value));
}

export function getStatusBadgeClass(status) {
    return {
        pending: 'border-amber-200 bg-amber-50 text-amber-700',
        reviewed: 'border-sky-200 bg-sky-50 text-sky-700',
        in_progress: 'border-blue-200 bg-blue-50 text-blue-700',
        resolved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        rejected: 'border-rose-200 bg-rose-50 text-rose-700',
    }[status] ?? 'border-slate-200 bg-slate-50 text-slate-700';
}

export function getPriorityBadgeClass(priority) {
    return {
        low: 'border-slate-200 bg-slate-100 text-slate-700',
        medium: 'border-amber-200 bg-amber-50 text-amber-700',
        high: 'border-orange-200 bg-orange-50 text-orange-700',
        critical: 'border-rose-200 bg-rose-50 text-rose-700',
    }[priority] ?? 'border-slate-200 bg-slate-50 text-slate-700';
}

export function getRowAccentClass(priority) {
    return {
        critical: 'bg-rose-50/70',
        high: 'bg-orange-50/40',
    }[priority] ?? '';
}

export function getCardToneClass(tone) {
    return {
        primary: 'from-primary/12 via-white to-sky-100/70 text-primary',
        warning: 'from-amber-100 via-white to-orange-50 text-amber-700',
        danger: 'from-rose-100 via-white to-orange-50 text-rose-700',
        success: 'from-emerald-100 via-white to-teal-50 text-emerald-700',
    }[tone] ?? 'from-primary/12 via-white to-sky-100/70 text-primary';
}

export function getLabel(options, value) {
    return options.find((item) => item.value === value)?.label ?? value;
}

export function getInitials(name) {
    return (name ?? 'AR')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}

export function buildReportHeadline(report) {
    const category = (report?.incident_category ?? '').trim();
    const location = (report?.incident_location ?? '').trim();

    if (category && location) {
        return `${category} di ${location}`;
    }

    if (category) {
        return `Insiden ${category}`;
    }

    if (location) {
        return `Laporan insiden di ${location}`;
    }

    return report?.report_code ?? 'Detail Laporan';
}
