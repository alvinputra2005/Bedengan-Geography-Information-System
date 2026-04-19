import { Gauge, Radio, TrendingUp, Waves } from 'lucide-react';
import { motion } from 'motion/react';

function getStatusStyles(status) {
    const normalizedStatus = (status || '').toUpperCase();

    if (normalizedStatus === 'BAHAYA') {
        return {
            color: 'text-red-600',
            badge: 'bg-red-50 text-red-600',
        };
    }

    if (normalizedStatus === 'WASPADA') {
        return {
            color: 'text-amber-600',
            badge: 'bg-amber-50 text-amber-600',
        };
    }

    return {
        color: 'text-primary',
        badge: 'bg-secondary-container/20 text-primary',
    };
}

export default function KPISection({ summary }) {
    const statusStyles = getStatusStyles(summary.status);
    const deltaPrefix = summary.deltaCm > 0 ? '+' : '';
    const kpiData = [
        {
            icon: Waves,
            label: 'Jarak Permukaan Air',
            value: summary.jarakCm || '-',
            unit: 'cm',
            status: summary.status,
            color: statusStyles.color,
            badge: statusStyles.badge,
        },
        {
            icon: Radio,
            label: 'Perangkat Sensor',
            value: summary.deviceId,
            unit: '',
            status: null,
            color: 'text-secondary',
        },
        {
            icon: TrendingUp,
            label: 'Perubahan Terakhir',
            value: `${deltaPrefix}${summary.deltaCm}`,
            unit: 'cm',
            status: null,
            color: 'text-secondary-container',
        },
        {
            icon: Gauge,
            label: 'Durasi Ping',
            value: summary.durationUs || '-',
            unit: 'us',
            status: null,
            color: 'text-primary',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpiData.map((item, index) => (
                <motion.article
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_4px_40px_rgba(19,27,46,0.06)]"
                >
                    <div className="mb-6 flex items-start justify-between">
                        <item.icon className={`${item.color} h-8 w-8`} />
                        {item.status ? (
                            <div className={`rounded-full px-3 py-1 text-xs font-bold ${item.badge}`}>{item.status}</div>
                        ) : null}
                    </div>

                    <div>
                        <p className="mb-1 font-headline text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/50">
                            {item.label}
                        </p>
                        <p className="break-words font-headline text-3xl font-bold text-on-surface">
                            {item.value}{' '}
                            {item.unit ? <span className="text-lg font-medium text-on-surface/40">{item.unit}</span> : null}
                        </p>
                    </div>
                </motion.article>
            ))}
        </div>
    );
}
