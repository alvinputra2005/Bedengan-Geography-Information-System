import { CalendarClock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    PRIORITY_OPTIONS,
    STATUS_OPTIONS,
    formatDateTime,
    getInitials,
    getLabel,
    getPriorityBadgeClass,
    getRowAccentClass,
    getStatusBadgeClass,
} from './mitigationReportUi';

export default function AdminMitigationTableRow({
    report,
}) {
    return (
        <tr className={`transition-colors hover:bg-surface-container-low/55 ${getRowAccentClass(report.priority)}`}>
            <td className="px-5 py-4 font-semibold text-on-surface lg:px-6">{report.report_code}</td>
            <td className="px-5 py-4 text-on-surface-variant lg:px-6">
                <div className="flex items-center gap-2">
                    <CalendarClock size={16} className="text-on-surface/35" />
                    <span>{formatDateTime(report.reported_at)}</span>
                </div>
            </td>
            <td className="px-5 py-4 lg:px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-xs font-bold text-primary">
                        {getInitials(report.reporter_name)}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-semibold text-on-surface">{report.reporter_name}</p>
                        <p className="truncate text-xs text-on-surface-variant">
                            {report.reporter_email || 'Email tidak tersedia'}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-4 lg:px-6">
                <div className="max-w-[260px]">
                    <p className="truncate font-semibold text-on-surface">{report.incident_location}</p>
                    <p className="truncate text-xs text-on-surface-variant">
                        {report.reviewer?.name ? `Ditinjau oleh ${report.reviewer.name}` : 'Belum ditinjau admin'}
                    </p>
                </div>
            </td>
            <td className="px-5 py-4 lg:px-6">
                <span className="inline-flex items-center rounded-full bg-surface-container-low px-3 py-1.5 text-xs font-semibold text-on-surface-variant">
                    {report.incident_category || 'Belum dikategorikan'}
                </span>
            </td>
            <td className="px-5 py-4 lg:px-6">
                <span
                    className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold ${getPriorityBadgeClass(report.priority)}`}
                >
                    {getLabel(PRIORITY_OPTIONS, report.priority)}
                </span>
            </td>
            <td className="px-5 py-4 lg:px-6">
                <span
                    className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusBadgeClass(report.status)}`}
                >
                    {getLabel(STATUS_OPTIONS, report.status)}
                </span>
            </td>
            <td className="px-5 py-4 text-right lg:px-6">
                <Link
                    to={`/admin/mitigation/${report.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-outline-variant/20 bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low"
                >
                    Detail
                    <ArrowRight size={16} />
                </Link>
            </td>
        </tr>
    );
}
