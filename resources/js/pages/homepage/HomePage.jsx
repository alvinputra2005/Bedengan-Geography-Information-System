import {
    Trees,
    Activity,
    Compass,
    Clock,
    Tent,
    ArrowRight,
    Leaf,
    Droplets,
    Trash2,
    Flame,
    VolumeX,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

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
        icon: Trash2,
        title: 'Kelola Sampah Mandiri',
        description:
            'Bawa kantong sampah sendiri dan pastikan tidak meninggalkan jejak apa pun di area wisata. Konservasi dimulai dari diri sendiri.',
    },
    {
        icon: Flame,
        title: 'Aturan Api Unggun',
        description:
            'Nyalakan api unggun hanya di area yang telah disediakan. Pastikan api benar-benar padam sebelum meninggalkan lokasi.',
    },
    {
        icon: VolumeX,
        title: 'Hargai Ketenangan',
        description:
            'Jaga tingkat kebisingan seminimal mungkin, terutama di malam hari. Hormati alam dan pengunjung lain yang mencari ketenangan.',
    },
    {
        icon: Droplets,
        title: 'Jaga Kualitas Air',
        description:
            'Dilarang membuang sabun, deterjen, atau limbah ke dalam aliran sungai. Gunakan fasilitas kebersihan yang telah disediakan.',
    },
];

export default function HomePage() {
    return (
        <main className="pb-20">
            <motion.section
                className="relative w-full px-6 pb-28 pt-28 md:px-12 md:pb-32 md:pt-32 lg:px-20 lg:pb-36 lg:pt-36 overflow-hidden mb-12 md:mb-16 lg:mb-20 min-h-[780px] md:min-h-[860px] lg:min-h-[920px] flex items-center"
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

                <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Live Monitoring System
                        </div>

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
                                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-sm hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center gap-3 group cursor-pointer"
                            >
                                <Activity size={18} />
                                Lihat Monitoring
                            </Link>
                            <Link
                                to="/map"
                                className="bg-white text-on-surface px-8 py-4 rounded-2xl font-bold text-sm hover:bg-surface-container-low border border-black/5 shadow-sm transition-all flex items-center gap-3 group cursor-pointer"
                            >
                                <Compass size={18} />
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
                className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mb-16 md:mb-20 lg:mb-24 relative"
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
                            <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl border border-black/5">
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
                                className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
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

                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 bg-primary/5 rounded-xl text-primary">
                                            <Droplets size={18} />
                                        </div>
                                        <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">
                                            Status Air
                                        </p>
                                    </div>
                                    <motion.span
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 font-bold text-[10px] uppercase tracking-wider relative overflow-hidden"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        Aman
                                    </motion.span>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-baseline gap-1">
                                        <h3 className="font-headline font-black text-5xl text-on-surface tracking-tight">
                                            1.2
                                        </h3>
                                        <span className="text-lg text-primary font-bold">m</span>
                                    </div>

                                    <div className="mt-4 p-3 bg-surface-container-low rounded-2xl flex items-center justify-between group-hover:bg-primary/5 transition-colors">
                                        <p className="text-xs font-bold text-on-surface-variant flex items-center gap-2">
                                            <ArrowRight className="-rotate-45 text-primary" size={14} />
                                            Tren Naik Perlahan
                                        </p>
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ height: [4, 12, 4] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                    className="w-1 bg-primary/20 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-primary rounded-3xl p-6 shadow-xl shadow-primary/20 relative overflow-hidden flex flex-col justify-between group"
                            >
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage:
                                            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                        backgroundSize: '20px 20px',
                                    }}
                                ></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Tent className="text-white bg-white/10 p-2 rounded-xl" size={36} />
                                        <p className="text-xs text-white font-bold uppercase tracking-wide">
                                            Rekomendasi Ground
                                        </p>
                                    </div>
                                    <h3 className="font-headline font-black text-3xl text-white mb-2">Ground A & C</h3>
                                    <p className="text-sm font-medium text-white/80">
                                        Jarak teraman dari bibir sungai dengan kondisi tanah stabil.
                                    </p>
                                </div>
                                <button className="relative z-10 mt-6 flex items-center justify-between w-full bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors text-white font-bold text-sm backdrop-blur-sm cursor-pointer">
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
                    className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
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
                            src="https://picsum.photos/seed/river-mist/800/600"
                            alt="Bedengan River"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                    </motion.div>
                </motion.div>
            </motion.section>

            <motion.section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-transparent" {...sectionReveal}>
                <motion.div
                    className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
                    {...staggerContainer}
                >
                    <motion.div
                        className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl order-1"
                        {...fadeUpItem}
                    >
                        <img
                            src="https://picsum.photos/seed/pines/800/600"
                            alt="Pine Forest"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute left-8 bottom-8 glass-panel p-8 rounded-3xl max-w-xs shadow-xl hidden md:block border border-black/10">
                            <p className="font-headline font-bold text-lg text-on-surface-variant">
                                &quot;Merawat kelestarian di setiap hela nafas alam.&quot;
                            </p>
                        </div>
                    </motion.div>
                    <motion.div className="order-2 px-6" {...fadeUpItem}>
                        <h2 className="font-headline text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-on-surface leading-tight mb-6">
                            Harmoni Hutan Pinus & <br />
                            <span className="text-primary">Aliran Sungai Jernih</span>
                        </h2>
                        <div className="space-y-5 mb-10 text-on-surface-variant font-medium leading-relaxed text-base md:text-lg">
                            <p>
                                Wisata Alam Bedengan menyajikan lanskap ekologis yang memadukan rimbunnya hutan pinus
                                (Pinus merkusii) dengan kesegaran aliran sungai yang bersumber langsung dari
                                pegunungan.
                            </p>
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
                className="relative overflow-hidden py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20 bg-transparent"
                id="daya-tarik"
                {...sectionReveal}
            >
                <motion.div className="max-w-[1920px] mx-auto" {...staggerContainer}>
                    <motion.div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8" {...fadeUpItem}>
                        <div className="max-w-2xl">
                            <h2 className="font-headline text-4xl lg:text-5xl font-extrabold text-on-surface mb-4">
                                Daya Tarik & Fasilitas
                            </h2>
                            <p className="text-on-surface-variant font-medium text-lg">
                                Menjelajahi beragam sudut menarik yang ditawarkan oleh kawasan konservasi dan wisata
                                Bedengan.
                            </p>
                        </div>
                        <Link
                            to="/map"
                            className="bg-white text-on-surface px-6 py-3 rounded-2xl font-bold text-sm hover:bg-surface border border-black/5 transition-colors flex items-center gap-2 ambient-shadow group cursor-pointer"
                        >
                            Lihat Peta Lengkap{' '}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                        </Link>
                    </motion.div>

                    <motion.div className="grid grid-cols-1 md:grid-cols-12 gap-6" {...fadeUpItem}>
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="md:col-span-8 relative group overflow-hidden h-[500px] rounded-3xl border border-black/5"
                        >
                            <img
                                src="https://picsum.photos/seed/camping-bedengan/1200/800"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                alt="Camping"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                            <div className="absolute bottom-0 left-0 p-10 w-full">
                                <span className="inline-block py-1 px-3 mb-4 border border-white/40 text-white text-xs font-bold tracking-widest uppercase bg-black/20 backdrop-blur-sm rounded-full">
                                    Area Utama
                                </span>
                                <h3 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    Camping Ground Ekologis
                                </h3>
                                <p className="text-white/90 max-w-xl font-medium leading-relaxed">
                                    Area berkemah luas di bawah naungan pohon pinus yang rindang, dilengkapi fasilitas
                                    dasar namun tetap mempertahankan suasana alam liar yang autentik.
                                </p>
                            </div>
                        </motion.div>
                        <div className="md:col-span-4 flex flex-col gap-6">
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="relative group overflow-hidden h-[238px] rounded-3xl border border-black/5"
                            >
                                <img
                                    src="https://picsum.photos/seed/river-stones/600/400"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    alt="River"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <h3 className="font-headline text-2xl font-extrabold text-white mb-2">
                                        Sungai Jernih
                                    </h3>
                                    <p className="text-sm text-white/90 font-medium">
                                        Aliran sungai dangkal yang aman untuk aktivitas bermain air ringan.
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="relative group overflow-hidden h-[238px] rounded-3xl border border-black/5"
                            >
                                <img
                                    src="https://picsum.photos/seed/trekking-path/600/400"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    alt="Trekking"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <h3 className="font-headline text-2xl font-extrabold text-white mb-2">
                                        Jalur Trekking
                                    </h3>
                                    <p className="text-sm text-white/90 font-medium">
                                        Rute pejalan kaki menyusuri tepi sungai dan menembus kelebatan hutan pinus.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.section>

            <motion.section
                className="relative overflow-hidden pt-16 pb-20 md:px-12 md:pt-20 md:pb-24 lg:px-20 lg:pt-24 lg:pb-28 px-6 bg-transparent"
                id="panduan"
                {...sectionReveal}
            >
                <motion.div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-12" {...staggerContainer}>
                    <motion.div className="lg:w-1/3" {...fadeUpItem}>
                        <div className="lg:sticky lg:top-32 bg-white p-8 md:p-10 rounded-[2rem] border border-black/5 ambient-shadow">
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
                    </motion.div>

                    <motion.div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5" {...fadeUpItem}>
                        {guideItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-[2rem] p-6 border border-black/5 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></div>
                                    <Icon className="text-primary mb-5 bg-primary/5 p-3 rounded-xl box-content" size={24} />
                                    <h4 className="font-headline font-bold text-on-surface mb-2 text-lg tracking-wide group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-on-surface-variant font-medium leading-relaxed text-xs">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </motion.section>
        </main>
    );
}
