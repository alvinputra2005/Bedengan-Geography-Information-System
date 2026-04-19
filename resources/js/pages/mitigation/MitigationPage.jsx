import { BellRing, CloudUpload, ShieldCheck, TriangleAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const heroStats = [
    {
        label: 'Status area',
        value: 'Aman',
        tone: 'bg-green-500/10 text-green-700',
    },
    {
        label: 'Update sensor',
        value: 'Live dari monitoring',
        tone: 'bg-primary/10 text-primary',
    },
    {
        label: 'Jalur evakuasi',
        value: '3 titik kumpul aktif',
        tone: 'bg-secondary/10 text-secondary',
    },
];

const guidanceSteps = [
    {
        id: '1',
        title: '1. Aman',
        dotColor: 'bg-emerald-500',
        description:
            'Kondisi normal. Aktivitas wisata dan camping dapat dilakukan tanpa pembatasan khusus. Tetap jaga kebersihan lingkungan dan posisi tenda.',
        cardClassName: 'bg-white border border-black/5',
    },
    {
        id: '2',
        title: '2. Waspada',
        dotColor: 'bg-yellow-500',
        description:
            'Cuaca mulai berubah. Kurangi aktivitas di area bantaran sungai dan siapkan perlengkapan darurat agar mudah dijangkau.',
        cardClassName: 'bg-yellow-50 border border-yellow-200',
        titleClassName: 'text-yellow-800',
        descriptionClassName: 'text-yellow-900/80',
    },
    {
        id: '3',
        title: '3. Siaga',
        dotColor: 'bg-orange-600',
        description:
            'Potensi bahaya terdeteksi. Ikuti arahan petugas, amankan barang penting, dan bersiap menuju jalur evakuasi yang ditetapkan.',
        cardClassName: 'bg-orange-50 border border-orange-200',
        titleClassName: 'text-orange-800',
        descriptionClassName: 'text-orange-900/80',
    },
    {
        id: '4',
        title: '4. Bahaya',
        dotColor: 'bg-rose-600',
        description:
            'Segera tinggalkan area menuju titik kumpul terdekat. Prioritaskan keselamatan diri, anak-anak, dan lansia sesuai instruksi lapangan.',
        cardClassName: 'bg-rose-50 border border-rose-200',
        titleClassName: 'text-rose-800',
        descriptionClassName: 'text-rose-700',
    },
];

const responseChecklist = [
    'Simpan barang penting dalam tas siap bawa.',
    'Pastikan anggota rombongan mengetahui titik kumpul.',
    'Hindari parkir atau mendirikan tenda terlalu dekat sungai.',
    'Periksa ulang prakiraan cuaca sebelum bermalam.',
];

function SectionHeader({ eyebrow, title, description }) {
    return (
        <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-secondary">{eyebrow}</p>
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">{title}</h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">{description}</p>
        </div>
    );
}

export default function MitigationPage() {
    return (
        <main className="overflow-hidden pb-20 pt-28 md:pt-32">
            <section className="px-6 md:px-12 lg:px-20">
                <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="max-w-3xl"
                    >
                        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                            Pusat Mitigasi Bedengan
                        </p>

                        <h1 className="font-headline text-4xl font-black leading-tight tracking-tight text-on-surface md:text-5xl lg:text-6xl">
                            Mitigasi & Laporan Insiden untuk kawasan wisata alam yang lebih siap.
                        </h1>

                        <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">
                            Halaman ini merangkum panduan status kawasan, langkah tanggap darurat, kanal pelaporan cepat,
                            dan kontak penting agar pengunjung serta petugas punya acuan yang sama saat kondisi berubah.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/monitoring"
                                className="bg-gradient-primary rounded-2xl px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-xl hover:shadow-primary/20"
                            >
                                Lihat Monitoring Live
                            </Link>
                            <Link
                                to="/map"
                                className="rounded-2xl border border-black/5 bg-white px-6 py-3 text-sm font-bold text-on-surface shadow-sm transition-colors hover:bg-surface-container-low"
                            >
                                Cek Jalur di Peta
                            </Link>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                            {heroStats.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-full border border-black/5 bg-white/90 px-4 py-2 text-sm font-semibold text-on-surface shadow-sm"
                                >
                                    <span className="mr-2 text-on-surface-variant">{item.label}:</span>
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${item.tone}`}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className="relative"
                    >
                        <div className="ambient-shadow relative overflow-hidden rounded-[2rem] border border-black/5 bg-white p-6 md:p-8">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(57,184,253,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(0,55,176,0.08),transparent_45%)]"></div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-on-surface/50">
                                            Status Terkini
                                        </p>
                                        <h2 className="mt-3 font-headline text-3xl font-black text-on-surface">
                                            Area Aman
                                        </h2>
                                    </div>
                                    <div className="rounded-2xl bg-secondary-container/20 p-3 text-secondary">
                                        <ShieldCheck size={28} />
                                    </div>
                                </div>

                                <p className="mt-5 text-sm font-medium leading-relaxed text-on-surface-variant">
                                    Kondisi cuaca dan area camping saat ini terpantau kondusif. Tetap patuhi rambu,
                                    perhatikan perubahan debit air, dan ikuti instruksi petugas bila ada pembaruan.
                                </p>

                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-surface-container-low p-4">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface/50">
                                            Rekomendasi
                                        </p>
                                        <p className="mt-2 text-sm font-semibold text-on-surface">
                                            Aktivitas camping tetap diperbolehkan dengan kewaspadaan normal.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl bg-surface-container-low p-4">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface/50">
                                            Titik kumpul
                                        </p>
                                        <p className="mt-2 text-sm font-semibold text-on-surface">
                                            Area parkir utama, pos jaga, dan lapangan dekat pintu masuk.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl border border-dashed border-primary/20 bg-primary/5 px-4 py-4">
                                    <div className="flex items-start gap-3">
                                        <TriangleAlert className="mt-0.5 text-primary" size={20} />
                                        <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
                                            Saat hujan deras berlangsung lebih dari 30 menit, prioritaskan menjauh dari
                                            bantaran sungai dan pastikan kendaraan siap dipindahkan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
                <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="ambient-shadow rounded-[2rem] border border-black/5 bg-white p-8 md:p-10 lg:sticky lg:top-28"
                    >
                        <SectionHeader
                            eyebrow="Prioritas Tanggap"
                            title="Panduan tindakan cepat saat status berubah"
                            description="Gunakan tingkatan ini sebagai acuan bersama agar pengunjung, relawan, dan petugas bergerak dengan ritme yang sama."
                        />

                        <div className="mt-8 space-y-3">
                            {responseChecklist.map((item) => (
                                <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface-container-low px-4 py-3">
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
                                    <p className="text-sm font-medium leading-relaxed text-on-surface-variant">{item}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        className="grid grid-cols-1 gap-5 md:grid-cols-2"
                    >
                        {guidanceSteps.map((step) => (
                            <div
                                key={step.id}
                                className={`ambient-shadow rounded-[2rem] p-6 ${step.cardClassName}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`h-3 w-3 rounded-full ${step.dotColor}`}></span>
                                    <h3 className={`font-headline text-xl font-bold ${step.titleClassName ?? 'text-on-surface'}`}>
                                        {step.title}
                                    </h3>
                                </div>
                                <p
                                    className={`mt-4 text-sm font-medium leading-relaxed ${
                                        step.descriptionClassName ?? 'text-on-surface-variant'
                                    }`}
                                >
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
                <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="ambient-shadow rounded-[2rem] border border-black/5 bg-white p-8 md:p-10"
                    >
                        <SectionHeader
                            eyebrow="Pelaporan Cepat"
                            title="Laporkan insiden secara ringkas dan terarah"
                            description="Gunakan formulir ini untuk membantu petugas menerima informasi awal secara lebih cepat saat terjadi kejadian di area wisata."
                        />

                        <div className="mt-8 space-y-3">
                            <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface/50">
                                    Kapan digunakan
                                </p>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-on-surface-variant">
                                    Saat ada kejadian seperti debit air naik cepat, pengunjung cedera, longsor kecil,
                                    kehilangan arah, atau kerusakan fasilitas penting.
                                </p>
                            </div>
                            <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface/50">
                                    Tips isi laporan
                                </p>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-on-surface-variant">
                                    Tulis lokasi sejelas mungkin, jelaskan kondisi inti dengan singkat, dan unggah foto
                                    jika tersedia agar respons lapangan lebih tepat.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        className="ambient-shadow rounded-[2rem] border border-black/5 bg-white p-6 md:p-8"
                    >
                        <div className="flex items-center gap-3 text-primary">
                            <div className="rounded-2xl bg-primary/10 p-3">
                                <BellRing size={22} />
                            </div>
                            <h3 className="font-headline text-2xl font-extrabold text-on-surface">Lapor Insiden</h3>
                        </div>

                        <form className="mt-6 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-on-surface" htmlFor="reporter-name">
                                    Nama Pelapor
                                </label>
                                <input
                                    id="reporter-name"
                                    type="text"
                                    placeholder="Masukkan nama Anda"
                                    className="w-full rounded-2xl border border-black/5 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors placeholder:text-on-surface/40 focus:border-primary/30"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-on-surface" htmlFor="incident-location">
                                    Lokasi Kejadian
                                </label>
                                <select
                                    id="incident-location"
                                    defaultValue=""
                                    className="w-full rounded-2xl border border-black/5 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors focus:border-primary/30"
                                >
                                    <option value="" disabled>
                                        Pilih area...
                                    </option>
                                    <option>Ground A</option>
                                    <option>Ground B</option>
                                    <option>Ground C</option>
                                    <option>Area Sungai</option>
                                    <option>Jalur Masuk</option>
                                    <option>Pos Jaga</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-on-surface" htmlFor="incident-description">
                                    Deskripsi Insiden
                                </label>
                                <textarea
                                    id="incident-description"
                                    rows={4}
                                    placeholder="Jelaskan apa yang terjadi..."
                                    className="w-full rounded-2xl border border-black/5 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors placeholder:text-on-surface/40 focus:border-primary/30"
                                ></textarea>
                            </div>

                            <div>
                                <p className="mb-2 block text-sm font-bold text-on-surface">Bukti Foto (Opsional)</p>
                                <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/20 bg-surface-container-low px-6 py-8 text-center transition-colors hover:border-primary/35 hover:bg-primary/5">
                                    <CloudUpload className="text-on-surface/45" size={28} />
                                    <span className="text-sm font-medium text-on-surface-variant">Klik untuk unggah foto</span>
                                    <input type="file" className="hidden" />
                                </label>
                            </div>

                            <button
                                type="button"
                                className="w-full rounded-2xl bg-gradient-primary px-5 py-3.5 text-sm font-bold text-white transition-all hover:shadow-xl hover:shadow-primary/20"
                            >
                                Kirim Laporan
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
