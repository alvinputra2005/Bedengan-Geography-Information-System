import { AlertTriangle, ArrowUp, BarChart3, MoreVertical, Radio } from 'lucide-react';
import { motion } from 'motion/react';

function KpiCard({ icon: Icon, label, value, subValue, trend, status, variant = 'default', helperText }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-2xl border p-6 ${
                variant === 'error'
                    ? 'border-error/20 bg-error-container/5'
                    : 'border-transparent bg-surface-container-lowest'
            }`}
        >
            {variant === 'error' ? (
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-error/5 blur-xl transition-colors group-hover:bg-error/10" />
            ) : null}

            <div className="relative z-10 mb-4 flex items-start justify-between">
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        variant === 'error' ? 'bg-error/10 text-error' : 'bg-primary-fixed/30 text-primary'
                    }`}
                >
                    <Icon size={24} />
                </div>

                {status ? (
                    <span
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                            status === 'Optimal'
                                ? 'bg-secondary-container/20 text-on-secondary-container'
                                : 'bg-outline-variant/20 text-on-surface-variant'
                        }`}
                    >
                        {status === 'Optimal' ? <span className="h-1.5 w-1.5 rounded-full bg-secondary-container"></span> : null}
                        {status}
                    </span>
                ) : null}

                {variant === 'error' ? (
                    <button type="button" className="text-on-surface-variant hover:text-on-surface">
                        <MoreVertical size={20} />
                    </button>
                ) : null}
            </div>

            <h3
                className={`relative z-10 mb-1 text-sm font-medium uppercase tracking-wider ${
                    variant === 'error' ? 'font-bold text-error' : 'text-on-surface-variant'
                }`}
            >
                {label}
            </h3>

            <div className="relative z-10 flex items-baseline gap-2">
                <span className={`font-headline font-bold text-on-surface ${variant === 'error' ? 'text-2xl' : 'text-4xl'}`}>
                    {value}
                </span>
                {subValue ? <span className="text-sm text-outline">{subValue}</span> : null}
                {trend ? (
                    <span className="flex items-center text-sm font-medium text-primary">
                        <ArrowUp size={16} className="mr-0.5" />
                        {trend}
                    </span>
                ) : null}
            </div>

            {helperText ? (
                <span className="relative z-10 mt-1 block text-sm text-on-surface-variant">{helperText}</span>
            ) : null}
        </motion.div>
    );
}

export default function AdminKpiSection({ summary }) {
    return (
        <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <KpiCard
                icon={Radio}
                label="Sensor Aktif"
                value={String(summary?.active_sensors ?? 0)}
                subValue={`/ ${summary?.total_sensors ?? 0} Unit`}
                status="Optimal"
            />
            <KpiCard
                icon={BarChart3}
                label="Total Laporan"
                value={(summary?.total_reports ?? 0).toLocaleString('id-ID')}
                trend={summary?.report_trend ?? '0%'}
                status="Minggu ini"
            />
            <KpiCard
                icon={AlertTriangle}
                label="Status Peringatan"
                value={summary?.warning_status ?? 'Normal'}
                helperText={summary?.warning_area ?? 'Seluruh area'}
                variant="error"
            />
        </section>
    );
}
