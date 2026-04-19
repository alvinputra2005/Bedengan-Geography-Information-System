import { AlertTriangle, ClipboardList, RadioTower, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

function buildInsights(sensorSummary, status) {
    const normalizedStatus = (sensorSummary.status || '').toUpperCase();
    const areaInsight =
        normalizedStatus === 'BAHAYA'
            ? 'Status sensor berada pada level bahaya. Prioritaskan pengecekan lapangan dan pembatasan area rawan.'
            : normalizedStatus === 'WASPADA'
              ? 'Status sensor berada pada level waspada. Aktivitas masih bisa dipantau, tetapi perlu peningkatan kewaspadaan.'
              : 'Status sensor masih aman untuk pemantauan rutin dan aktivitas operasional normal.';

    const riskInsight =
        sensorSummary.deltaCm > 0
            ? `Jarak air berubah ${sensorSummary.deltaCm} cm dibanding pembacaan sebelumnya. Pantau potensi kenaikan lanjutan.`
            : 'Belum ada lonjakan signifikan pada pembacaan terakhir. Tetap awasi pembaruan berikutnya dari sensor.';

    const sensorInsight = sensorSummary.buzzer
        ? `Buzzer aktif sebagai respons status ${sensorSummary.status}. Sistem peringatan lokal sedang menyala.`
        : `Sensor ${sensorSummary.deviceId} aktif dan buzzer saat ini tidak menyala.`;

    return [
        {
            icon: ShieldCheck,
            title: 'Status Kawasan',
            description: areaInsight,
            accent: normalizedStatus === 'BAHAYA' ? 'text-red-600' : normalizedStatus === 'WASPADA' ? 'text-amber-600' : 'text-green-600',
        },
        {
            icon: AlertTriangle,
            title: 'Catatan Risiko',
            description: riskInsight,
            accent: 'text-amber-600',
        },
        {
            icon: RadioTower,
            title: 'Kondisi Sensor',
            description:
                sensorInsight +
                (status?.status === 'ok' ? ' API monitoring internal juga merespons normal.' : ' API internal perlu dicek ulang.'),
            accent: 'text-primary',
        },
    ];
}

function buildQuickActions(sensorSummary) {
    const normalizedStatus = (sensorSummary.status || '').toUpperCase();

    if (normalizedStatus === 'BAHAYA') {
        return [
            'Aktifkan prosedur tanggap darurat dan batasi akses ke zona dekat sungai.',
            'Konfirmasi pembacaan sensor dengan pengecekan visual lapangan sesegera mungkin.',
            'Pastikan alarm lokal dan kanal komunikasi operator tetap aktif.',
        ];
    }

    if (normalizedStatus === 'WASPADA') {
        return [
            'Tingkatkan frekuensi pemantauan operator pada dashboard monitoring.',
            'Siapkan jalur evakuasi dan pastikan area pengunjung tetap terpantau.',
            'Koordinasikan update kondisi sungai ke tim lapangan secara berkala.',
        ];
    }

    return [
        'Lanjutkan verifikasi kondisi lapangan secara berkala.',
        'Pastikan sensor tetap mendapat daya dan koneksi stabil.',
        'Simpan histori pemantauan untuk analisis tren kenaikan air.',
    ];
}

export default function Sidebar({ status, sensorSummary, sensorError }) {
    const insights = buildInsights(sensorSummary, status);
    const quickActions = buildQuickActions(sensorSummary);

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
                        Live
                    </span>
                </div>

                <div className="mb-4 rounded-2xl border border-black/5 bg-surface px-4 py-3 text-sm font-medium text-on-surface-variant">
                    <p className="font-bold text-on-surface">Pembacaan terakhir</p>
                    <p className="mt-1">Status: {sensorSummary.status}</p>
                    <p>Timestamp: {sensorSummary.formattedTimestamp}</p>
                    <p>Buzzer: {sensorSummary.buzzer ? 'Aktif' : 'Nonaktif'}</p>
                    {sensorError ? <p className="mt-2 text-red-600">{sensorError}</p> : null}
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
                        <li
                            key={action}
                            className="rounded-2xl border border-black/5 bg-surface px-4 py-3 text-sm font-medium text-on-surface-variant"
                        >
                            {action}
                        </li>
                    ))}
                </ul>
            </section>
        </motion.aside>
    );
}
