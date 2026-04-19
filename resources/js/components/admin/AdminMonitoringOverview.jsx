import { Activity, Radio, TrendingUp, Waves } from 'lucide-react';
import { motion } from 'motion/react';

function getStatusStyles(status) {
    const normalizedStatus = (status || '').toUpperCase();

    if (normalizedStatus === 'BAHAYA') {
        return {
            badge: 'bg-red-50 text-red-600',
            accent: 'text-red-600',
        };
    }

    if (normalizedStatus === 'WASPADA') {
        return {
            badge: 'bg-amber-50 text-amber-700',
            accent: 'text-amber-700',
        };
    }

    return {
        badge: 'bg-secondary-container/20 text-primary',
        accent: 'text-primary',
    };
}

function formatMetric(value) {
    const numericValue = Number(value ?? 0);

    return new Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 1,
        minimumFractionDigits: Number.isInteger(numericValue) ? 0 : 1,
    }).format(numericValue);
}

function formatSignedMetric(value) {
    const numericValue = Number(value ?? 0);
    const prefix = numericValue > 0 ? '+' : '';

    return `${prefix}${formatMetric(numericValue)}`;
}

function formatTimestamp(timestamp) {
    if (!timestamp) {
        return 'Belum ada update';
    }

    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(timestamp));
}

export default function AdminMonitoringOverview({ monitoring, sensorError }) {
    const statusStyles = getStatusStyles(monitoring?.status);

    return (
        <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5"
        >
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                        Hasil Monitoring Sensor
                    </p>
                    <h2 className="mt-2 font-headline text-xl font-bold text-on-surface">
                        {monitoring?.sensorName || 'Sensor Sungai Bedengan'}
                    </h2>
                    <p className="mt-1 text-sm text-on-surface-variant">
                        {monitoring?.deviceId || 'ews-bedengan-01'} | {monitoring?.sourceLabel || 'Sumber data belum tersedia'}
                    </p>
                </div>

                <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${statusStyles.badge}`}>
                    {monitoring?.status || 'Menunggu data'}
                </span>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <div className="rounded-2xl bg-surface-container-low p-4">
                    <div className="mb-3 flex items-center gap-2 text-on-surface-variant">
                        <Waves size={18} />
                        <span className="text-sm font-semibold">Pembacaan Terbaru</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="font-headline text-4xl font-black text-on-surface">
                            {formatMetric(monitoring?.jarakCm)}
                        </span>
                        <span className="pb-1 text-sm font-semibold text-on-surface-variant">cm</span>
                    </div>
                    <p className={`mt-3 text-sm font-medium ${statusStyles.accent}`}>
                        Status saat ini: {monitoring?.status || 'Belum ada data'}
                    </p>
                </div>

                <div className="grid gap-3">
                    <div className="rounded-2xl bg-surface-container-low p-4">
                        <div className="mb-2 flex items-center gap-2 text-on-surface-variant">
                            <TrendingUp size={16} />
                            <span className="text-xs font-bold uppercase tracking-[0.16em]">Rata-rata Kenaikan</span>
                        </div>
                        <p className="text-2xl font-bold text-on-surface">{formatMetric(monitoring?.averageIncreaseCm)} cm</p>
                    </div>

                    <div className="rounded-2xl bg-surface-container-low p-4">
                        <div className="mb-2 flex items-center gap-2 text-on-surface-variant">
                            <Activity size={16} />
                            <span className="text-xs font-bold uppercase tracking-[0.16em]">Perubahan Terakhir</span>
                        </div>
                        <p className="text-2xl font-bold text-on-surface">{formatSignedMetric(monitoring?.deltaCm)} cm</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3">
                    <div className="mb-1 flex items-center gap-2 text-on-surface-variant">
                        <Radio size={15} />
                        <span className="text-xs font-bold uppercase tracking-[0.16em]">Update Terakhir</span>
                    </div>
                    <p className="text-sm font-semibold text-on-surface">{formatTimestamp(monitoring?.timestamp)}</p>
                </div>

                <div className="rounded-2xl border border-outline-variant/10 bg-surface px-4 py-3">
                    <div className="mb-1 flex items-center gap-2 text-on-surface-variant">
                        <Activity size={15} />
                        <span className="text-xs font-bold uppercase tracking-[0.16em]">Titik Data</span>
                    </div>
                    <p className="text-sm font-semibold text-on-surface">{monitoring?.historyCount ?? 0} pembacaan</p>
                </div>
            </div>

            {sensorError ? (
                <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{sensorError}</p>
            ) : null}
        </motion.section>
    );
}
