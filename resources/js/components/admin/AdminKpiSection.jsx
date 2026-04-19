import { FileText, Radio, Users } from 'lucide-react';
import { motion } from 'motion/react';

function KpiCard({ icon: Icon, label, value, helperText }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5"
        >
            <div className="mb-4 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-fixed/30 text-primary">
                    <Icon size={24} />
                </div>
            </div>

            <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">{label}</h3>

            <div className="flex items-baseline gap-2">
                <span className="font-headline text-3xl font-bold text-on-surface">{value}</span>
            </div>

            {helperText ? <span className="mt-1 block text-sm text-on-surface-variant">{helperText}</span> : null}
        </motion.div>
    );
}

export default function AdminKpiSection({ summary }) {
    const cards = [
        {
            icon: Users,
            label: 'User Terdaftar',
            value: (summary?.registered_users ?? 0).toLocaleString('id-ID'),
            helperText: 'Total akun admin dan pengguna yang sudah terdaftar.',
        },
        {
            icon: Radio,
            label: 'Sensor Nyala',
            value: (summary?.active_sensors ?? 0).toLocaleString('id-ID'),
            helperText: `Dari total ${(summary?.total_sensors ?? 0).toLocaleString('id-ID')} perangkat sensor.`,
        },
        {
            icon: FileText,
            label: 'Total Laporan Mitigasi',
            value: (summary?.total_mitigation_reports ?? 0).toLocaleString('id-ID'),
            helperText: 'Konten mitigasi yang sudah dipublikasikan.',
        },
    ];

    return (
        <section className="mb-6 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
                <KpiCard key={card.label} {...card} />
            ))}
        </section>
    );
}
