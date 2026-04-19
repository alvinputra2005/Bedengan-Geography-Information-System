export default function MitigationPage() {
    const mitigationSteps = [
        'Pantau perubahan status sensor dan konfirmasi area terdampak pada dashboard.',
        'Arahkan pengunjung ke jalur evakuasi terdekat sesuai zona pada peta.',
        'Sampaikan pembaruan kondisi lapangan ke operator dan dokumentasikan tindak lanjut.',
    ];

    return (
        <section className="space-y-8">
            <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-secondary">Halaman Private</p>
                <h1 className="mb-4 font-headline text-4xl font-extrabold text-on-surface md:text-5xl">Mitigasi Risiko</h1>
                <p className="max-w-2xl font-medium leading-relaxed text-on-surface-variant">
                    Konten mitigasi dipisah dari beranda publik agar SOP, edukasi, dan tindakan operasional hanya muncul untuk user yang sudah login.
                </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <article className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">SOP Ringkas</p>
                    <ol className="mt-5 space-y-4">
                        {mitigationSteps.map((step, index) => (
                            <li key={step} className="flex gap-4 rounded-2xl bg-surface-container-low p-4">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                    {index + 1}
                                </span>
                                <p className="text-sm font-medium leading-relaxed text-on-surface-variant">{step}</p>
                            </li>
                        ))}
                    </ol>
                </article>

                <article className="rounded-[2rem] bg-[linear-gradient(160deg,#fef2f2_0%,#fff6ef_100%)] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-error">Prioritas Tindakan</p>
                    <h2 className="mt-3 font-headline text-2xl font-bold text-on-surface">Checklist Lapangan</h2>
                    <div className="mt-5 space-y-3 text-sm font-medium text-on-surface-variant">
                        <p className="rounded-2xl bg-white/70 px-4 py-3">Verifikasi status peralatan dan alarm lokal.</p>
                        <p className="rounded-2xl bg-white/70 px-4 py-3">Pastikan jalur evakuasi dapat dilalui tanpa hambatan.</p>
                        <p className="rounded-2xl bg-white/70 px-4 py-3">Koordinasikan laporan situasi ke admin dan petugas lapangan.</p>
                    </div>
                </article>
            </div>
        </section>
    );
}
