import { ArrowRight, Clock3 } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminPlaceholderPage({ title, subtitle, description }) {
    return (
        <div className="flex flex-1 flex-col">
            <AdminHeader title={title} subtitle={subtitle} />

            <section className="relative overflow-hidden rounded-[28px] border border-outline-variant/20 bg-white/80 p-6 shadow-[0_28px_80px_-52px_rgba(19,27,46,0.45)] backdrop-blur md:p-8">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/6 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-secondary-container/10 blur-2xl" />

                <div className="relative max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        <Clock3 size={14} />
                        Dalam Pengembangan
                    </div>

                    <h2 className="mt-5 font-headline text-2xl font-extrabold tracking-tight text-on-surface">
                        Halaman admin ini sudah punya route aktif yang terpisah.
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-on-surface-variant">{description}</p>

                    <div className="mt-8 flex items-center gap-3 rounded-2xl border border-outline-variant/15 bg-surface-container-lowest/90 px-4 py-4 text-sm text-on-surface-variant">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <ArrowRight size={18} />
                        </div>
                        <p>
                            Navigasi sidebar sekarang bisa menandai menu aktif dengan benar karena tiap halaman admin memakai path unik di bawah
                            <span className="mx-1 font-semibold text-primary">/admin</span>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
