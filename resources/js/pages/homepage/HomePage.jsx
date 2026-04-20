import {
    Trees,
    Clock,
    ArrowRight,
    Leaf,
    Droplets,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { pageContainerClassName, pageGutterClassName } from '../../components/layout/pageSpacing';

const sectionReveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
    viewport: { once: true, amount: 0.2 },
};

const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
    viewport: { once: true, amount: 0.2 },
};

const fadeUpItem = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: 'easeOut' },
};

const guideItems = [
    {
        title: 'Kelola Sampah Mandiri',
        image: '/images/two-perrson-sorting-garbage-concept-recycling-zero-waste.jpg',
        imagePosition: 'center',
        description:
            'Bawa kantong sampah sendiri dan pastikan tidak meninggalkan jejak apa pun di area wisata. Konservasi dimulai dari diri sendiri.',
    },
    {
        title: 'Aturan Api Unggun',
        image: '/images/night-campfire-night.jpg',
        imagePosition: 'center',
        description:
            'Nyalakan api unggun hanya di area yang telah disediakan. Pastikan api benar-benar padam sebelum meninggalkan lokasi.',
    },
    {
        title: 'Hargai Ketenangan',
        image: '/images/winter-camping-landscape-with-tent.jpg',
        imagePosition: 'center',
        description:
            'Jaga tingkat kebisingan seminimal mungkin, terutama di malam hari. Hormati alam dan pengunjung lain yang mencari ketenangan.',
    },
    {
        title: 'Jaga Kualitas Air',
        image: '/images/beautiful-view-river-flowing-through-forest.jpg',
        imagePosition: 'center',
        description:
            'Dilarang membuang sabun, deterjen, atau limbah ke dalam aliran sungai. Gunakan fasilitas kebersihan yang telah disediakan.',
    },
];

export default function HomePage() {
    return (
        <main className="pb-20">
            <motion.section
                className={`relative w-full ${pageGutterClassName} overflow-hidden mb-8 flex min-h-[780px] items-center pb-24 pt-28 md:mb-10 md:pb-28 md:pt-32 lg:mb-12 lg:pb-32 lg:pt-36`}
                id="beranda"
                {...sectionReveal}
            >
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.34]">
                    <img
                        src="/images/Bumi-Background-Perkemahan-Bedengan.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(180deg,rgba(250,248,255,0.58)_0%,rgba(250,248,255,0.66)_35%,rgba(250,248,255,0.8)_68%,rgba(250,248,255,0.94)_100%)]"></div>

                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-primary/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[70%] bg-secondary/5 rounded-full blur-[100px]"></div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-72 md:h-80 lg:h-96 bg-gradient-to-t from-[#faf8ff] via-[#faf8ff]/90 to-transparent z-10"></div>

                <div className={`relative z-10 ${pageContainerClassName} grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20`}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left max-w-2xl"
                    >
                        <h1 className="font-headline font-extrabold text-5xl md:text-6xl lg:text-7xl text-on-surface tracking-tighter leading-[1] mb-8">
                            Wisata Alam <br />
                            <span className="text-primary block mt-2">Bedengan</span>
                        </h1>

                        <p className="text-lg md:text-xl text-on-surface-variant mb-12 max-w-xl font-medium leading-relaxed">
                            Sistem pemantauan ekologis real-time untuk memastikan pengalaman wisata alam yang aman,
                            nyaman, dan terukur secara presisi.
                        </p>

                        <div className="flex flex-wrap items-center gap-5 md:gap-6">
                            <Link
                                to="/monitoring"
                                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-sm hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer"
                            >
                                Lihat Monitoring
                            </Link>
                            <Link
                                to="/map"
                                className="bg-white text-on-surface px-8 py-4 rounded-2xl font-bold text-sm hover:bg-surface-container-low border border-black/5 shadow-sm transition-all cursor-pointer"
                            >
                                Jelajahi Peta
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-[440px] h-[440px] xl:w-[500px] xl:h-[500px] mx-auto">
                            <div className="absolute inset-[-24px] rounded-full bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 blur-2xl"></div>

                            <div className="absolute inset-0 rounded-full border-[10px] border-white shadow-2xl overflow-hidden ring-1 ring-black/5">
                                <img
                                    src="/images/Foto-Icon-Bedengan.jpeg"
                                    alt="Foto icon Bedengan"
                                    className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-blue-900/10 hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className={`${pageContainerClassName} ${pageGutterClassName} relative mb-16 md:mb-20 lg:mb-24`}
                id="monitoring"
                {...sectionReveal}
            >
                <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 ambient-shadow border border-black/5">
                    <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center" {...staggerContainer}>
                        <motion.div {...fadeUpItem}>
                            <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface mb-4">
                                Kondisi Terkini
                            </h2>
                            <p className="text-on-surface-variant font-medium mb-8">
                                Pantauan otomatis dari sensor IoT di sepanjang aliran sungai Bedengan untuk memastikan
                                keamanan pengunjung.
                            </p>
                            <div className="flex items-center gap-4 rounded-2xl border border-[rgba(2,102,146,0.12)] bg-[rgba(2,102,146,0.08)] p-4">
                                <Clock className="text-primary" size={32} />
                                <div>
                                    <p className="text-xs font-bold text-on-surface-variant uppercase">Update Terakhir</p>
                                    <p className="font-headline font-bold text-on-surface">Hari ini, 08:45 WIB</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 relative" {...fadeUpItem}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-3xl p-6 border border-black/5 shadow-xl shadow-slate-200/70 hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between group min-h-[260px]"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-10 pointer-events-none">
                                    <motion.div
                                        animate={{
                                            x: [0, -400],
                                            y: [0, 5, 0],
                                        }}
                                        transition={{
                                            x: { duration: 10, repeat: Infinity, ease: 'linear' },
                                            y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                                        }}
                                        className="absolute bottom-0 left-0 w-[800px] h-full bg-primary"
                                        style={{
                                            borderRadius: '40% 45% 42% 48%',
                                            filter: 'blur(20px)',
                                        }}
                                    />
                                </div>

                                <div className="relative z-10">
                                    <p className="text-sm text-on-surface-variant font-bold uppercase tracking-[0.24em]">
                                        Status Air
                                    </p>
                                </div>

                                <div className="relative z-10 flex-1 flex flex-col justify-center py-3">
                                    <div className="flex items-end gap-2">
                                        <h3 className="font-headline font-black text-6xl text-on-surface tracking-tight leading-none">
                                            1.2
                                        </h3>
                                        <span className="text-2xl text-primary font-bold leading-none pb-1">m</span>
                                    </div>
                                    <p className="mt-4 max-w-[18rem] text-sm font-medium leading-relaxed text-on-surface-variant">
                                        Level air masih dalam batas aman dan menunjukkan perubahan yang stabil.
                                    </p>
                                </div>

                                <div className="relative z-10 p-4 bg-surface-container-low rounded-2xl flex items-center justify-between group-hover:bg-primary/5 transition-colors">
                                    <p className="text-sm font-bold text-on-surface-variant flex items-center gap-2">
                                        <ArrowRight className="-rotate-45 text-primary" size={15} />
                                        Tren Naik Perlahan
                                    </p>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3].map((i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [6, 14, 6] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                className="w-1.5 bg-primary/20 rounded-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-primary rounded-3xl p-6 shadow-xl shadow-primary/20 relative overflow-hidden flex flex-col justify-between group min-h-[260px]"
                            >
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage:
                                            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                        backgroundSize: '20px 20px',
                                    }}
                                ></div>
                                <div className="relative z-10 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <p className="text-xs text-white font-bold uppercase tracking-wide">
                                            Rekomendasi Ground
                                        </p>
                                    </div>
                                    <h3 className="font-headline font-black text-3xl text-white mb-2">Ground A & C</h3>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm border border-white/10">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                                                Status
                                            </p>
                                            <p className="mt-2 text-lg font-black text-white">Aman</p>
                                        </div>
                                        <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm border border-white/10">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                                                Kontur
                                            </p>
                                            <p className="mt-2 text-lg font-black text-white">Stabil</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="relative z-10 mt-5 flex items-center justify-between w-full bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors text-white font-bold text-sm backdrop-blur-sm cursor-pointer">
                                    <span>Lihat Peta Ground</span>
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-transparent" {...sectionReveal}>
                <motion.div
                    className={`${pageContainerClassName} ${pageGutterClassName} grid grid-cols-1 items-center gap-20 lg:grid-cols-2`}
                    {...staggerContainer}
                >
                    <motion.div className="order-2 lg:order-1" {...fadeUpItem}>
                        <span className="text-secondary text-xs font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-4 before:content-[''] before:w-12 before:h-px before:bg-secondary">
                            Profil Kawasan
                        </span>
                        <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-surface mb-6 leading-[1.1] tracking-tight">
                            Mengenal Lebih Dekat <br />
                            <span className="text-primary">Wisata Alam Bedengan</span>
                        </h2>
                        <p className="text-base md:text-lg text-on-surface-variant max-w-md leading-relaxed font-medium mb-10">
                            Menyelami harmoni ekosistem hutan pinus dan kejernihan aliran sungai yang mempesona di
                            jantung alam Malang.
                        </p>
                        <div className="flex gap-12">
                            <div>
                                <div className="font-headline font-black text-3xl text-secondary mb-1">
                                    700<span className="text-lg">m</span>
                                </div>
                                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                                    Ketinggian
                                </div>
                            </div>
                            <div>
                                <div className="font-headline font-black text-3xl text-secondary mb-1">
                                    24<span className="text-lg">°C</span>
                                </div>
                                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                                    Suhu Rata-rata
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="order-1 lg:order-2 relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl"
                        {...fadeUpItem}
                    >
                        <img
                            src="/images/Camping-Bumi-Perkemahan-Bedengan.webp"
                            alt="Camping Bumi Perkemahan Bedengan"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                    </motion.div>
                </motion.div>
            </motion.section>

            <motion.section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-transparent" {...sectionReveal}>
                <motion.div
                    className={`${pageContainerClassName} ${pageGutterClassName} grid grid-cols-1 items-center gap-20 lg:grid-cols-2`}
                    {...staggerContainer}
                >
                    <motion.div
                        className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl order-1 lg:max-w-[48rem]"
                        {...fadeUpItem}
                    >
                        <img
                            src="/images/Hutan-Pohon-Pinus.jpg"
                            alt="Hutan Pohon Pinus Bedengan"
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>
                    <motion.div className="order-2 lg:px-6 max-w-2xl self-center" {...fadeUpItem}>
                        <h2 className="font-headline text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold text-on-surface leading-[1.08] tracking-tight mb-6">
                            Harmoni Hutan Pinus & <br />
                            <span className="text-primary">Aliran Sungai Jernih</span>
                        </h2>
                        <div className="space-y-5 mb-10 text-on-surface-variant font-medium leading-relaxed text-base md:text-lg max-w-xl">
                            <p>
                                Berada di area perhutani yang dikelola secara berkelanjutan, Bedengan menawarkan ruang
                                bagi pengunjung untuk terhubung kembali dengan alam sembari memastikan kelestarian
                                lingkungan tetap terjaga.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/10">
                            <div>
                                <Leaf className="text-secondary mb-4" size={32} />
                                <h4 className="font-bold text-on-surface mb-2 uppercase text-sm tracking-wide">
                                    Ekosistem Terjaga
                                </h4>
                                <p className="text-sm text-on-surface-variant">Habitat alami flora dan fauna lokal.</p>
                            </div>
                            <div>
                                <Droplets className="text-secondary mb-4" size={32} />
                                <h4 className="font-bold text-on-surface mb-2 uppercase text-sm tracking-wide">
                                    Mata Air Alami
                                </h4>
                                <p className="text-sm text-on-surface-variant">
                                    Sungai berbatu dengan air sebening kristal.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.section>

            <motion.section
                className={`relative overflow-hidden ${pageGutterClassName} bg-transparent pb-20 pt-16 md:pb-24 md:pt-20 lg:pb-28 lg:pt-24`}
                id="panduan"
                {...sectionReveal}
            >
                <motion.div className={`${pageContainerClassName} flex flex-col gap-12 lg:flex-row`} {...staggerContainer}>
                    <motion.div className="lg:w-1/3" {...fadeUpItem}>
                        <div className="lg:sticky lg:top-32 rounded-[2rem] border border-black/5 shadow-[0_20px_55px_rgba(15,23,42,0.1),0_8px_24px_rgba(15,23,42,0.06)] overflow-hidden relative">
                            <div
                                className="absolute inset-0 bg-cover bg-center scale-105"
                                style={{ backgroundImage: "url('/images/Foto-Icon-Bedengan.jpeg')" }}
                            ></div>
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.88)_45%,rgba(255,255,255,0.94)_100%)]"></div>
                            <div className="absolute inset-0 bg-primary/[0.03]"></div>
                            <div className="relative py-8 pl-7 pr-8 md:py-10 md:pl-8 md:pr-10">
                                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-primary">
                                    Perhatian
                                </span>
                                <h2 className="font-headline text-4xl lg:text-5xl font-extrabold text-on-surface mb-6 leading-tight">
                                    Panduan <br />
                                    <span className="text-primary">Keselamatan</span> <br />& Etika
                                </h2>
                                <p className="text-on-surface-variant font-medium leading-relaxed text-sm">
                                    Untuk menjaga kelestarian kawasan dan kenyamanan bersama, pengunjung diwajibkan mematuhi
                                    panduan ekologis Bedengan.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5" {...fadeUpItem}>
                        {guideItems.map((item) => {
                            return (
                                <motion.div
                                    key={item.title}
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-[2rem] px-6 py-7 border border-black/5 relative overflow-hidden group shadow-[0_18px_45px_rgba(15,23,42,0.08),0_6px_18px_rgba(15,23,42,0.05)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12),0_10px_26px_rgba(15,23,42,0.07)] transition-shadow"
                                >
                                    <img
                                        src={item.image}
                                        alt=""
                                        aria-hidden="true"
                                        className="absolute inset-0 h-full w-full object-cover opacity-[0.4] scale-105 transition duration-300 group-hover:scale-[1.08] group-hover:opacity-[0.46]"
                                        style={{ objectPosition: item.imagePosition }}
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.8)_40%,rgba(255,255,255,0.54)_68%,rgba(255,255,255,0.62)_100%)]"></div>
                                    <div className="relative">
                                        <h4 className="font-headline font-bold text-primary mb-3 text-lg tracking-wide">
                                            {item.title}
                                        </h4>
                                        <p className="text-on-surface-variant font-medium leading-relaxed text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </motion.section>
        </main>
    );
}
