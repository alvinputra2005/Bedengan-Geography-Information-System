import { ArrowLeft, MapPin, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    PRIORITY_OPTIONS,
    STATUS_OPTIONS,
    buildReportHeadline,
    getLabel,
    getPriorityBadgeClass,
    getStatusBadgeClass,
} from './mitigationReportUi';

export default function AdminMitigationDetailHeader({ report }) {
    return (
        <section className="space-y-4">
            <Link
                to="/admin/mitigation"
                className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
                <ArrowLeft size={16} />
                Kembali ke daftar laporan
            </Link>

            <div className="flex flex-col gap-5 rounded-[28px] border border-outline-variant/15 bg-white/85 p-6 shadow-[0_16px_36px_-30px_rgba(19,27,46,0.45)] md:p-7">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                                {report.report_code}
                            </span>
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${getPriorityBadgeClass(report.priority)}`}
                            >
                                <TriangleAlert size={16} />
                                {report.incident_category || `Prioritas ${getLabel(PRIORITY_OPTIONS, report.priority)}`}
                            </span>
                        </div>
                        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">
                            {buildReportHeadline(report)}
                        </h1>
                        <div className="mt-3 flex items-center gap-2 text-sm text-on-surface-variant">
                            <MapPin size={16} className="text-primary" />
                            <span>{report.incident_location}</span>
                        </div>
                    </div>

                    <span
                        className={`inline-flex items-center self-start rounded-full border px-4 py-2 text-sm font-semibold ${getStatusBadgeClass(report.status)}`}
                    >
                        {getLabel(STATUS_OPTIONS, report.status)}
                    </span>
                </div>
            </div>
        </section>
    );
}
