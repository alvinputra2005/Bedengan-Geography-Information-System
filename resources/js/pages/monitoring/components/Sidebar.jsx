import { AlertTriangle, ClipboardList, RadioTower, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const insights = [
    {
        icon: ShieldCheck,
        title: 'Status Kawasan',
        description: 'Muka air masih pada level aman untuk aktivitas wisata umum dan area ground utama.',
        accent: 'text-green-600',
    },
    {
        icon: AlertTriangle,
        title: 'Catatan Risiko',
        description: 'Kenaikan kecil terpantau sejak dini hari. Tetap awasi intensitas hujan di hulu.',
        accent: 'text-amber-600',
    },
    {
        icon: RadioTower,
        title: 'Kondisi Sensor',
        description: 'Sensor aktif dan mengirim pembacaan reguler tanpa kehilangan paket data signifikan.',
        accent: 'text-primary',
    },
];

const quickActions = [
    'Verifikasi kondisi lapangan tiap 2 jam',
    'Pastikan jalur evakuasi bebas hambatan',
    'Siapkan notifikasi internal jika level > 1.8m',
];

export default function Sidebar({ status }) {
    return (
        <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex w-full flex-col gap-6 lg:max-w-sm"
        >
            <section className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_4px_40px_rgba(19,27,46,0.06)]">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-headline text-xl font-bold text-on-surface">Insight Cepat</h2>
                    <span className="rounded-full bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                        Hari ini
                    </span>
                </div>

                <div className="space-y-4">
                    {insights.map((item) => (
                        <div key={item.title} className="rounded-2xl bg-surface-container-low p-4">
                            <div className="mb-3 flex items-center gap-3">
                                <item.icon className={`h-5 w-5 ${item.accent}`} />
                                <h3 className="font-headline text-sm font-bold text-on-surface">{item.title}</h3>
                            </div>
                            <p className="text-sm font-medium leading-relaxed text-on-surface-variant">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_4px_40px_rgba(19,27,46,0.06)]">
                <div className="mb-4 flex items-center gap-3">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <h2 className="font-headline text-xl font-bold text-on-surface">Tindak Lanjut</h2>
                </div>

                <ul className="space-y-3">
                    {quickActions.map((action) => (
                        <li key={action} className="rounded-2xl border border-black/5 bg-surface px-4 py-3 text-sm font-medium text-on-surface-variant">
                            {action}
                        </li>
                    ))}
                </ul>
            </section>
        </motion.aside>
    );
}
