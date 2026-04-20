import { useEffect, useRef, useState } from 'react';
import { BellRing, CloudUpload, LoaderCircle, ShieldCheck, TriangleAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
    pageContainerClassName,
    pageGutterClassName,
    pageSectionGapClassName,
    pageShellClassName,
} from '../../components/layout/pageSpacing';
import { useAuth } from '../../hooks/useAuth';
import { createMitigationReport } from '../../services/mitigationReportService';

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

const incidentCategories = [
    'Kenaikan debit air',
    'Cedera pengunjung',
    'Longsor kecil',
    'Kehilangan arah',
    'Kerusakan fasilitas',
    'Lainnya',
];

const incidentLocations = [
    'Ground A',
    'Ground B',
    'Ground C',
    'Area Sungai',
    'Jalur Masuk',
    'Pos Jaga',
];

const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const INITIAL_FORM = {
    reporterName: '',
    incidentCategory: '',
    incidentLocation: '',
    description: '',
};

function SectionHeader({ eyebrow, title, description }) {
    return (
        <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-secondary">{eyebrow}</p>
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">{title}</h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">{description}</p>
        </div>
    );
}

function getFieldError(errors, field) {
    const value = errors?.[field];

    if (Array.isArray(value)) {
        return value[0] ?? '';
    }

    return typeof value === 'string' ? value : '';
}

export default function MitigationPage() {
    const { user } = useAuth();
    const [form, setForm] = useState(INITIAL_FORM);
    const [formErrors, setFormErrors] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setForm((current) => ({
            ...current,
            reporterName: current.reporterName || user?.name || '',
        }));
    }, [user?.name]);

    function handleInputChange(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function resetForm() {
        setForm({
            ...INITIAL_FORM,
            reporterName: user?.name || '',
        });
        setFormErrors({});
        setSelectedFile(null);
        setFileError('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    function handleFileChange(event) {
        const nextFile = event.target.files?.[0] ?? null;

        setFileError('');
        setSelectedFile(null);

        if (!nextFile) {
            return;
        }

        if (!ACCEPTED_FILE_TYPES.includes(nextFile.type)) {
            setFileError('Gunakan file JPG, PNG, atau WEBP.');
            event.target.value = '';
            return;
        }

        if (nextFile.size > MAX_FILE_SIZE_BYTES) {
            setFileError('Ukuran foto maksimal 5 MB.');
            event.target.value = '';
            return;
        }

        setSelectedFile(nextFile);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setFormErrors({});
        setFileError('');
        setSubmitError('');
        setSubmitSuccess('');

        try {
            const response = await createMitigationReport({
                ...form,
                photo: selectedFile,
            });

            setSubmitSuccess(response?.message || 'Laporan mitigasi berhasil dikirim.');
            resetForm();
        } catch (error) {
            if (error.response?.status === 422) {
                setFormErrors(error.response?.data?.errors ?? {});
            } else {
                const message = error.message || error.response?.data?.message || 'Pengiriman laporan gagal.';
                setSubmitError(message);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className={pageShellClassName}>
            <section className={pageGutterClassName}>
                <div className={`${pageContainerClassName} grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center`}>
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

            <section className={`${pageGutterClassName} ${pageSectionGapClassName}`}>
                <div className={`${pageContainerClassName} grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]`}>
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

            <section className={`${pageGutterClassName} ${pageSectionGapClassName}`}>
                <div className={`${pageContainerClassName} grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]`}>
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
                            <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface/50">
                                    Integrasi admin
                                </p>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-on-surface-variant">
                                    Semua laporan yang terkirim akan langsung masuk ke panel admin pada menu Laporan
                                    Mitigasi untuk ditinjau, diprioritaskan, dan ditindaklanjuti.
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

                        {submitError ? (
                            <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{submitError}</p>
                        ) : null}
                        {submitSuccess ? (
                            <p className="mt-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                                {submitSuccess}
                            </p>
                        ) : null}

                        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-on-surface" htmlFor="reporter-name">
                                    Nama Pelapor
                                </label>
                                <input
                                    id="reporter-name"
                                    name="reporterName"
                                    type="text"
                                    value={form.reporterName}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan nama Anda"
                                    className="w-full rounded-2xl border border-black/5 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors placeholder:text-on-surface/40 focus:border-primary/30"
                                />
                                {getFieldError(formErrors, 'reporter_name') ? (
                                    <p className="mt-2 text-xs font-medium text-red-600">{getFieldError(formErrors, 'reporter_name')}</p>
                                ) : null}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-on-surface" htmlFor="incident-category">
                                    Jenis Insiden
                                </label>
                                <select
                                    id="incident-category"
                                    name="incidentCategory"
                                    value={form.incidentCategory}
                                    onChange={handleInputChange}
                                    className="w-full rounded-2xl border border-black/5 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors focus:border-primary/30"
                                >
                                    <option value="">Pilih jenis insiden...</option>
                                    {incidentCategories.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                {getFieldError(formErrors, 'incident_category') ? (
                                    <p className="mt-2 text-xs font-medium text-red-600">{getFieldError(formErrors, 'incident_category')}</p>
                                ) : null}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-on-surface" htmlFor="incident-location">
                                    Lokasi Kejadian
                                </label>
                                <select
                                    id="incident-location"
                                    name="incidentLocation"
                                    value={form.incidentLocation}
                                    onChange={handleInputChange}
                                    className="w-full rounded-2xl border border-black/5 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors focus:border-primary/30"
                                >
                                    <option value="">Pilih area...</option>
                                    {incidentLocations.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                {getFieldError(formErrors, 'incident_location') ? (
                                    <p className="mt-2 text-xs font-medium text-red-600">{getFieldError(formErrors, 'incident_location')}</p>
                                ) : null}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-on-surface" htmlFor="incident-description">
                                    Deskripsi Insiden
                                </label>
                                <textarea
                                    id="incident-description"
                                    name="description"
                                    rows={4}
                                    value={form.description}
                                    onChange={handleInputChange}
                                    placeholder="Jelaskan apa yang terjadi..."
                                    className="w-full rounded-2xl border border-black/5 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors placeholder:text-on-surface/40 focus:border-primary/30"
                                ></textarea>
                                {getFieldError(formErrors, 'description') ? (
                                    <p className="mt-2 text-xs font-medium text-red-600">{getFieldError(formErrors, 'description')}</p>
                                ) : null}
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between gap-4">
                                    <p className="block text-sm font-bold text-on-surface">Bukti Foto (Opsional)</p>
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface/45">
                                        JPG, PNG, WEBP hingga 5 MB
                                    </span>
                                </div>

                                <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/20 bg-surface-container-low px-6 py-8 text-center transition-colors hover:border-primary/35 hover:bg-primary/5">
                                    <CloudUpload className="text-on-surface/45" size={28} />
                                    <span className="text-sm font-medium text-on-surface-variant">
                                        {selectedFile ? selectedFile.name : 'Klik untuk unggah foto'}
                                    </span>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>

                                {fileError ? <p className="mt-2 text-xs font-medium text-red-600">{fileError}</p> : null}
                                {getFieldError(formErrors, 'photo') ? (
                                    <p className="mt-2 text-xs font-medium text-red-600">{getFieldError(formErrors, 'photo')}</p>
                                ) : null}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-5 py-3.5 text-sm font-bold text-white transition-all hover:shadow-xl hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : null}
                                {isSubmitting ? 'Mengirim laporan...' : 'Kirim Laporan'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
