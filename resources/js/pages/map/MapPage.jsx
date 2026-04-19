export default function MapPage() {
    const zoneCards = [
        {
            title: 'Zona Aman Camping',
            description: 'Area datar dengan akses cepat ke jalur keluar dan jarak cukup dari bibir sungai.',
        },
        {
            title: 'Jalur Evakuasi',
            description: 'Rute prioritas yang perlu ditampilkan pada layer peta saat status sensor meningkat.',
        },
        {
            title: 'Titik Sensor',
            description: 'Lokasi sensor sungai, curah hujan, dan angin untuk membantu analisis spasial.',
        },
    ];

    return (
        <section className="space-y-8">
            <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-secondary">Akses Private</p>
                <h1 className="mb-4 font-headline text-4xl font-extrabold text-on-surface md:text-5xl">Peta Interaktif</h1>
                <p className="max-w-2xl font-medium leading-relaxed text-on-surface-variant">
                    Halaman ini sekarang hanya tersedia setelah login dan disiapkan sebagai area kerja user untuk integrasi Leaflet, Google Maps, atau peta GIS lain.
                </p>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-[linear-gradient(135deg,#0037b0_0%,#006591_100%)] p-6 text-white shadow-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Canvas Spasial</p>
                <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="min-h-[320px] rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_26%),rgba(255,255,255,0.08)] p-6">
                        <div className="flex h-full items-center justify-center rounded-[1.4rem] border border-dashed border-white/25">
                            <p className="max-w-sm text-center text-sm font-medium leading-relaxed text-white/75">
                                Tempatkan komponen peta utama di sini. Layer zona aman, sensor, dan rute evakuasi bisa dipasang tanpa menyentuh layout publik.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {zoneCards.map((item) => (
                            <article key={item.title} className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur-sm">
                                <h2 className="font-headline text-lg font-bold">{item.title}</h2>
                                <p className="mt-2 text-sm leading-relaxed text-white/80">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
