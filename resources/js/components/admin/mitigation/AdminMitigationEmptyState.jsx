import { AlertTriangle } from 'lucide-react';

export default function AdminMitigationEmptyState() {
    return (
        <section className="rounded-[28px] border border-dashed border-outline-variant/20 bg-white/80 px-6 py-10 text-center">
            <AlertTriangle className="mx-auto text-on-surface/40" size={28} />
            <h2 className="mt-4 font-headline text-2xl font-bold text-on-surface">Belum ada laporan masuk</h2>
            <p className="mt-2 text-sm text-on-surface-variant">
                Laporan dari halaman mitigasi akan muncul di sini setelah pengguna mengirim insiden.
            </p>
        </section>
    );
}
