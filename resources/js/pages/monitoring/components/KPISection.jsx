import { Gauge, Radio, TrendingUp, Waves } from 'lucide-react';
import { motion } from 'motion/react';

const kpiData = [
    {
        icon: Waves,
        label: 'Tinggi Muka Air',
        value: '1.2',
        unit: 'm',
        status: 'Aman',
        color: 'text-primary',
        badge: 'bg-secondary-container/20 text-primary',
    },
    {
        icon: Radio,
        label: 'Jarak Sensor',
        value: '2.8',
        unit: 'm',
        status: null,
        color: 'text-secondary',
    },
    {
        icon: TrendingUp,
        label: 'Laju Kenaikan',
        value: '+0.1',
        unit: 'm/jam',
        status: null,
        color: 'text-secondary-container',
    },
    {
        icon: Gauge,
        label: 'Debit Air',
        value: 'Normal',
        unit: '',
        status: null,
        color: 'text-primary',
    },
];

export default function KPISection() {
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
                        <p className="font-headline text-3xl font-bold text-on-surface">
                            {item.value}{' '}
                            {item.unit ? <span className="text-lg font-medium text-on-surface/40">{item.unit}</span> : null}
                        </p>
                    </div>
                </motion.article>
            ))}
        </div>
    );
}
