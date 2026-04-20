import { CheckCircle2, Clock3, ShieldAlert, Siren, TriangleAlert } from 'lucide-react';
import { getCardToneClass } from './mitigationReportUi';

function SummaryCard({ icon: Icon, label, value, helper, tone }) {
    return (
        <article
            className={`overflow-hidden rounded-[26px] border border-outline-variant/15 bg-white p-5 shadow-[0_14px_40px_-34px_rgba(19,27,46,0.55)]`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="">
                    <Icon size={20} />
                </div>
            </div>
            <p className="mt-5 text-sm font-semibold text-on-surface-variant">{label}</p>
            <p className="mt-1 font-headline text-3xl font-extrabold tracking-tight text-on-surface">{value}</p>
            <p className="mt-3 text-xs font-medium text-on-surface-variant">{helper}</p>
        </article>
    );
}

export default function AdminMitigationSummaryGrid({ summary }) {
    const cards = [
        {
            icon: ShieldAlert,
            label: 'Total Laporan',
            value: summary?.total_reports ?? 0,
            helper: 'Semua insiden yang sudah masuk',
            tone: 'primary',
        },
        {
            icon: Clock3,
            label: 'Menunggu',
            value: summary?.pending_reports ?? 0,
            helper: 'Belum ditinjau admin',
            tone: 'warning',
        },
        {
            icon: TriangleAlert,
            label: 'Aktif Diproses',
            value: summary?.active_reports ?? 0,
            helper: 'Sedang ditangani tim',
            tone: 'danger',
        },
        {
            icon: CheckCircle2,
            label: 'Selesai',
            value: summary?.resolved_reports ?? 0,
            helper: 'Sudah terdokumentasi',
            tone: 'success',
        },
        {
            icon: Siren,
            label: 'Prioritas Kritis',
            value: summary?.critical_reports ?? 0,
            helper: 'Perlu perhatian cepat',
            tone: 'danger',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {cards.map((card) => (
                <SummaryCard key={card.label} {...card} />
            ))}
        </div>
    );
}
