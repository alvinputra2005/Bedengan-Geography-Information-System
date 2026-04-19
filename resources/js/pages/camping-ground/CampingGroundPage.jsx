import { useEffect, useMemo, useState } from 'react';
import { Droplets, LayoutGrid, Mountain, TableProperties } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { subscribeToLatestSensor } from '../../services/monitoringService';

const CAMPING_GROUNDS = [
    {
        id: 'ground-a',
        name: 'Ground A',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPpS2lFSB_1ea5OM8mEw-aHWPruRobtPkKS1POeVoeQaXas3GEG5xFk-P8UuwYYB62jWAxGi0HsBLyRaWeKh8Hfw1KVRPT6_V5e7WwynTGHfWKEpQBPwYGiJ4YMt7aeztriptweMJDvTLe5Ea0Y0xJgbcA-gYux3JyYEQIYAbbX91dsCB7rkkJWEVjG_Se_PNRdoctKMlcMwm3CnqAmY5YRC6PRY0KVA9oMJjICMzVIyKolKlg0Re7k9q1qI_-sW4EAe8BiKdZJWE',
        flatDistanceM: 5,
        cliffHeightM: 0.5,
        baseWaterLevelCm: 12,
    },
    {
        id: 'ground-b',
        name: 'Ground B',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUTMfufEQOMS_ddT8nIOWC7gKY-EzSh1znxtQ4XVVdWKL4h9_8GTQO-ghpuA0XKSIU-LgCllluuFewjC9zliky9ah8SwX9agQ21VRJP2zjTIoTFSxRgBoB1OpCPdo2_mvKWDBwDK8vGJ2TLHSdzU7o3gC_JgyaFRMZnbB0vNg042QNCaF30SvTzKfLjWU2Annfv6s08Rfu7wHGyL5xRYbJBUameaZ5gLdjQ90aljm-vrhK2l0TcCwoYymrNdgAiq-wzC5b6Cmv79E',
        flatDistanceM: 3.35,
        cliffHeightM: 1.6,
        baseWaterLevelCm: 15,
    },
    {
        id: 'ground-c',
        name: 'Ground C',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzUZ3QHNxGT6WyWm_rXy2avf7I2jAxaGFMM7RzAlgqUL258WAo5z3r7RGjyowVqv8lM-0trpBRxL4HzXTfK84qMHYiLRm8HxWWQpt2KSeU0xBj5IwKAj3j8JL-j0xQxZVFT_8XoynIhPKN9Dzn6CWUeo4JREMeAsvxCecjp6EBB61mlkjAPgRxb4HzSUj2q6fXMgTy1HgRggdssK8lMxN9X9mlZJMWzTWuIqRLp3J1K3ltgZ-b7bkQMHpYyvaXpb8zg5Gl5ebc1AM',
        flatDistanceM: 4.95,
        cliffHeightM: 2.2,
        baseWaterLevelCm: 18,
    },
    {
        id: 'ground-d',
        name: 'Ground D',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPpS2lFSB_1ea5OM8mEw-aHWPruRobtPkKS1POeVoeQaXas3GEG5xFk-P8UuwYYB62jWAxGi0HsBLyRaWeKh8Hfw1KVRPT6_V5e7WwynTGHfWKEpQBPwYGiJ4YMt7aeztriptweMJDvTLe5Ea0Y0xJgbcA-gYux3JyYEQIYAbbX91dsCB7rkkJWEVjG_Se_PNRdoctKMlcMwm3CnqAmY5YRC6PRY0KVA9oMJjICMzVIyKolKlg0Re7k9q1qI_-sW4EAe8BiKdZJWE',
        flatDistanceM: 3,
        cliffHeightM: 1.2,
        baseWaterLevelCm: 18,
    },
    {
        id: 'ground-e',
        name: 'Ground E',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzUZ3QHNxGT6WyWm_rXy2avf7I2jAxaGFMM7RzAlgqUL258WAo5z3r7RGjyowVqv8lM-0trpBRxL4HzXTfK84qMHYiLRm8HxWWQpt2KSeU0xBj5IwKAj3j8JL-j0xQxZVFT_8XoynIhPKN9Dzn6CWUeo4JREMeAsvxCecjp6EBB61mlkjAPgRxb4HzSUj2q6fXMgTy1HgRggdssK8lMxN9X9mlZJMWzTWuIqRLp3J1K3ltgZ-b7bkQMHpYyvaXpb8zg5Gl5ebc1AM',
        flatDistanceM: 4.7,
        cliffHeightM: 1.48,
        baseWaterLevelCm: 18,
    },
    {
        id: 'ground-f',
        name: 'Ground F',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUTMfufEQOMS_ddT8nIOWC7gKY-EzSh1znxtQ4XVVdWKL4h9_8GTQO-ghpuA0XKSIU-LgCllluuFewjC9zliky9ah8SwX9agQ21VRJP2zjTIoTFSxRgBoB1OpCPdo2_mvKWDBwDK8vGJ2TLHSdzU7o3gC_JgyaFRMZnbB0vNg042QNCaF30SvTzKfLjWU2Annfv6s08Rfu7wHGyL5xRYbJBUameaZ5gLdjQ90aljm-vrhK2l0TcCwoYymrNdgAiq-wzC5b6Cmv79E',
        flatDistanceM: 4.53,
        cliffHeightM: 2.73,
        baseWaterLevelCm: 21,
    },
    {
        id: 'ground-g',
        name: 'Ground G',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPpS2lFSB_1ea5OM8mEw-aHWPruRobtPkKS1POeVoeQaXas3GEG5xFk-P8UuwYYB62jWAxGi0HsBLyRaWeKh8Hfw1KVRPT6_V5e7WwynTGHfWKEpQBPwYGiJ4YMt7aeztriptweMJDvTLe5Ea0Y0xJgbcA-gYux3JyYEQIYAbbX91dsCB7rkkJWEVjG_Se_PNRdoctKMlcMwm3CnqAmY5YRC6PRY0KVA9oMJjICMzVIyKolKlg0Re7k9q1qI_-sW4EAe8BiKdZJWE',
        flatDistanceM: 6.9,
        cliffHeightM: 2.4,
        baseWaterLevelCm: 25,
    },
    {
        id: 'ground-h',
        name: 'Ground H',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUTMfufEQOMS_ddT8nIOWC7gKY-EzSh1znxtQ4XVVdWKL4h9_8GTQO-ghpuA0XKSIU-LgCllluuFewjC9zliky9ah8SwX9agQ21VRJP2zjTIoTFSxRgBoB1OpCPdo2_mvKWDBwDK8vGJ2TLHSdzU7o3gC_JgyaFRMZnbB0vNg042QNCaF30SvTzKfLjWU2Annfv6s08Rfu7wHGyL5xRYbJBUameaZ5gLdjQ90aljm-vrhK2l0TcCwoYymrNdgAiq-wzC5b6Cmv79E',
        flatDistanceM: 3.13,
        cliffHeightM: 1.09,
        baseWaterLevelCm: 16,
    },
    {
        id: 'ground-i',
        name: 'Ground I',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzUZ3QHNxGT6WyWm_rXy2avf7I2jAxaGFMM7RzAlgqUL258WAo5z3r7RGjyowVqv8lM-0trpBRxL4HzXTfK84qMHYiLRm8HxWWQpt2KSeU0xBj5IwKAj3j8JL-j0xQxZVFT_8XoynIhPKN9Dzn6CWUeo4JREMeAsvxCecjp6EBB61mlkjAPgRxb4HzSUj2q6fXMgTy1HgRggdssK8lMxN9X9mlZJMWzTWuIqRLp3J1K3ltgZ-b7bkQMHpYyvaXpb8zg5Gl5ebc1AM',
        flatDistanceM: 9.03,
        cliffHeightM: 3,
        baseWaterLevelCm: 15,
    },
    {
        id: 'ground-j',
        name: 'Ground J',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPpS2lFSB_1ea5OM8mEw-aHWPruRobtPkKS1POeVoeQaXas3GEG5xFk-P8UuwYYB62jWAxGi0HsBLyRaWeKh8Hfw1KVRPT6_V5e7WwynTGHfWKEpQBPwYGiJ4YMt7aeztriptweMJDvTLe5Ea0Y0xJgbcA-gYux3JyYEQIYAbbX91dsCB7rkkJWEVjG_Se_PNRdoctKMlcMwm3CnqAmY5YRC6PRY0KVA9oMJjICMzVIyKolKlg0Re7k9q1qI_-sW4EAe8BiKdZJWE',
        flatDistanceM: 5.63,
        cliffHeightM: 2.97,
        baseWaterLevelCm: 10,
    },
    {
        id: 'ground-k',
        name: 'Ground K',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzUZ3QHNxGT6WyWm_rXy2avf7I2jAxaGFMM7RzAlgqUL258WAo5z3r7RGjyowVqv8lM-0trpBRxL4HzXTfK84qMHYiLRm8HxWWQpt2KSeU0xBj5IwKAj3j8JL-j0xQxZVFT_8XoynIhPKN9Dzn6CWUeo4JREMeAsvxCecjp6EBB61mlkjAPgRxb4HzSUj2q6fXMgTy1HgRggdssK8lMxN9X9mlZJMWzTWuIqRLp3J1K3ltgZ-b7bkQMHpYyvaXpb8zg5Gl5ebc1AM',
        flatDistanceM: 6.54,
        cliffHeightM: 2.75,
        baseWaterLevelCm: 16,
    },
    {
        id: 'ground-l',
        name: 'Ground L',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUTMfufEQOMS_ddT8nIOWC7gKY-EzSh1znxtQ4XVVdWKL4h9_8GTQO-ghpuA0XKSIU-LgCllluuFewjC9zliky9ah8SwX9agQ21VRJP2zjTIoTFSxRgBoB1OpCPdo2_mvKWDBwDK8vGJ2TLHSdzU7o3gC_JgyaFRMZnbB0vNg042QNCaF30SvTzKfLjWU2Annfv6s08Rfu7wHGyL5xRYbJBUameaZ5gLdjQ90aljm-vrhK2l0TcCwoYymrNdgAiq-wzC5b6Cmv79E',
        flatDistanceM: 6.64,
        cliffHeightM: 2.37,
        baseWaterLevelCm: 11,
    },
    {
        id: 'ground-m',
        name: 'Ground M',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzUZ3QHNxGT6WyWm_rXy2avf7I2jAxaGFMM7RzAlgqUL258WAo5z3r7RGjyowVqv8lM-0trpBRxL4HzXTfK84qMHYiLRm8HxWWQpt2KSeU0xBj5IwKAj3j8JL-j0xQxZVFT_8XoynIhPKN9Dzn6CWUeo4JREMeAsvxCecjp6EBB61mlkjAPgRxb4HzSUj2q6fXMgTy1HgRggdssK8lMxN9X9mlZJMWzTWuIqRLp3J1K3ltgZ-b7bkQMHpYyvaXpb8zg5Gl5ebc1AM',
        flatDistanceM: 4.62,
        cliffHeightM: 4.2,
        baseWaterLevelCm: 40,
    },
];

const filterOptions = ['Semua', 'Direkomendasikan', 'Waspada', 'Tidak Direkomendasikan'];

const FALLBACK_WATER_LEVEL_CM = 18;
const ITEMS_PER_PAGE = 6;

function formatDistance(value) {
    return `${value.toFixed(2)} m`;
}

function computeGroundMetrics(ground, liveWaterLevelCm) {
    const currentWaterLevelCm = liveWaterLevelCm > 0 ? liveWaterLevelCm : ground.baseWaterLevelCm;
    const waterRiseM = Math.max((currentWaterLevelCm - ground.baseWaterLevelCm) / 100, 0);
    const effectiveHeightM = Math.max(ground.cliffHeightM - waterRiseM * 0.45, 0);
    const surfaceDistanceM = Math.sqrt(ground.flatDistanceM ** 2 + effectiveHeightM ** 2);
    const riskScore = Math.min(
        92,
        Math.max(8, Math.round(78 - ground.flatDistanceM * 7 - effectiveHeightM * 11 + waterRiseM * 14))
    );

    let riskLevel = `Sangat Tinggi (${riskScore}%)`;
    if (riskScore <= 25) {
        riskLevel = `Rendah (${riskScore}%)`;
    } else if (riskScore <= 50) {
        riskLevel = `Sedang (${riskScore}%)`;
    } else if (riskScore <= 75) {
        riskLevel = `Tinggi (${riskScore}%)`;
    }

    let status = 'Tidak Direkomendasikan';
    if (riskScore <= 25) {
        status = 'Direkomendasikan';
    } else if (riskScore <= 65) {
        status = 'Waspada';
    }

    return {
        ...ground,
        status,
        riskScore,
        riskLevel,
        currentWaterLevelCm,
        effectiveHeightM,
        surfaceDistanceM,
        displaySurfaceDistance: formatDistance(surfaceDistanceM),
        displayEffectiveHeight: formatDistance(effectiveHeightM),
    };
}

function getStatusClass(status) {
    if (status === 'Direkomendasikan') {
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }

    if (status === 'Waspada') {
        return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
    }

    return 'bg-rose-50 text-rose-800 border border-rose-200';
}

function getRiskStyles(riskScore) {
    if (riskScore <= 25) {
        return {
            bar: 'bg-emerald-500',
            text: 'text-emerald-700',
        };
    }

    if (riskScore <= 50) {
        return {
            bar: 'bg-yellow-500',
            text: 'text-yellow-700',
        };
    }

    if (riskScore <= 75) {
        return {
            bar: 'bg-orange-500',
            text: 'text-orange-700',
        };
    }

    return {
        bar: 'bg-rose-600',
        text: 'text-rose-700',
    };
}

function CampCard({ ground }) {
    const isRecommended = ground.status === 'Direkomendasikan';
    const riskStyles = getRiskStyles(ground.riskScore);

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            whileHover={{ y: -4 }}
            className="group ambient-shadow overflow-hidden rounded-[2rem] border border-black/5 bg-white transition-all duration-300 hover:shadow-[0_20px_55px_rgba(15,23,42,0.12),0_8px_24px_rgba(15,23,42,0.06)]"
        >
            <div className="relative h-44 overflow-hidden bg-surface-container-low">
                <img
                    src={ground.image}
                    alt={ground.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(19,27,46,0.2)_100%)]"></div>
            </div>

            <div className="p-5">
                <div>
                    <h3 className="font-headline text-xl font-black text-on-surface">{ground.name}</h3>
                </div>

                <div className="mt-4 space-y-0">
                    <div className="flex items-center justify-between gap-3 pb-1">
                        <p className="text-[0.78rem] font-semibold leading-snug text-on-surface/60">
                            Jarak ke permukaan air
                        </p>
                        <p className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-on-surface">
                            <Droplets className={`h-3.5 w-3.5 ${isRecommended ? 'text-emerald-600' : 'text-amber-600'}`} />
                            {ground.displaySurfaceDistance}
                        </p>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-[0.78rem] font-semibold leading-snug text-on-surface/60">
                            Ketinggian dari permukaan air
                        </p>
                        <p className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-on-surface">
                            <Mountain className="h-3.5 w-3.5 text-primary" />
                            {ground.displayEffectiveHeight}
                        </p>
                    </div>
                </div>

                <div className="mt-7">
                    <div className="mb-2 flex items-center justify-between gap-4">
                        <span className="text-xs font-medium text-on-surface-variant">Skor Risiko Total</span>
                        <span className={`text-xs font-bold uppercase tracking-[0.12em] ${riskStyles.text}`}>{ground.riskLevel}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-low">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${ground.riskScore}%` }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                            className={`h-full rounded-full ${riskStyles.bar}`}
                        />
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export default function CampingGroundPage() {
    const [filter, setFilter] = useState('Semua');
    const [viewMode, setViewMode] = useState('grid');
    const [liveWaterLevelCm, setLiveWaterLevelCm] = useState(FALLBACK_WATER_LEVEL_CM);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const unsubscribeLatest = subscribeToLatestSensor(
            (data) => {
                const nextLevel = Number(data?.jarakCm ?? 0);
                if (Number.isFinite(nextLevel) && nextLevel > 0) {
                    setLiveWaterLevelCm(nextLevel);
                }
            },
            () => {}
        );

        return () => {
            unsubscribeLatest();
        };
    }, []);

    const calculatedGrounds = useMemo(
        () => CAMPING_GROUNDS.map((ground) => computeGroundMetrics(ground, liveWaterLevelCm)),
        [liveWaterLevelCm]
    );

    const recommendedGrounds = useMemo(
        () => calculatedGrounds.filter((ground) => ground.status === 'Direkomendasikan').map((ground) => ground.name),
        [calculatedGrounds]
    );

    const filteredGrounds = useMemo(() => {
        if (filter === 'Semua') {
            return calculatedGrounds;
        }

        return calculatedGrounds.filter((ground) => ground.status === filter);
    }, [calculatedGrounds, filter]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filter, viewMode]);

    const totalPages = Math.max(1, Math.ceil(filteredGrounds.length / ITEMS_PER_PAGE));

    const paginatedGrounds = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredGrounds.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredGrounds]);

    return (
        <main className="overflow-hidden pb-20 pt-28 md:pt-32">
            <section className="px-6 md:px-12 lg:px-20">
                <div className="mx-auto max-w-[1440px]">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="relative overflow-hidden rounded-[2.5rem] border border-black/5 p-8 ambient-shadow md:p-12"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-[0.38]"
                            style={{ backgroundImage: "url('/images/Camping-Bumi-Perkemahan-Bedengan.webp')" }}
                        ></div>
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.76)_38%,rgba(255,255,255,0.84)_100%)]"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(57,184,253,0.1),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(2,102,146,0.06),transparent_42%)]"></div>
                        <div className="relative z-10 max-w-4xl">
                            <h1 className="font-headline text-[1.85rem] font-extrabold tracking-tight leading-[1.08] text-on-surface md:text-[2.4rem] lg:text-[3rem]">
                                Rekomendasi <span className="text-primary">Area Camping</span> yang lebih aman, terukur,
                                dan mudah dipilih.
                            </h1>
                            <div className="mt-7 flex flex-wrap gap-3">
                                <div className="rounded-full border border-black/5 bg-white/90 px-4 py-2 text-sm font-semibold text-on-surface shadow-sm">
                                    <span className="mr-2 text-on-surface-variant">Area dipantau:</span>
                                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                                        13 ground
                                    </span>
                                </div>
                                <div className="rounded-full border border-black/5 bg-white/90 px-4 py-2 text-sm font-semibold text-on-surface shadow-sm">
                                    <span className="mr-2 text-on-surface-variant">Rekomendasi aktif:</span>
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                                        {recommendedGrounds.length > 0 ? recommendedGrounds.slice(0, 3).join(', ') : 'Belum ada'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="px-6 pt-12 md:px-12 md:pt-14 lg:px-20 lg:pt-16">
                <div className="mx-auto max-w-[1440px]">
                    <section className="w-full">
                        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-black/5 bg-white/75 p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setFilter(option)}
                                        className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                                            filter === option
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-transparent text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 self-start rounded-2xl border border-black/5 bg-surface-container-low px-2 py-2 md:self-auto">
                                <button
                                    type="button"
                                    onClick={() => setViewMode('grid')}
                                    className={`rounded-xl p-2 transition-all ${
                                        viewMode === 'grid'
                                            ? 'bg-white text-primary shadow-sm'
                                            : 'text-on-surface-variant hover:text-on-surface'
                                    }`}
                                    aria-label="Tampilan grid"
                                >
                                    <LayoutGrid size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode('table')}
                                    className={`rounded-xl p-2 transition-all ${
                                        viewMode === 'table'
                                            ? 'bg-white text-primary shadow-sm'
                                            : 'text-on-surface-variant hover:text-on-surface'
                                    }`}
                                    aria-label="Tampilan tabel"
                                >
                                    <TableProperties size={18} />
                                </button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {viewMode === 'grid' ? (
                                <motion.div
                                    key="grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                                >
                                    {paginatedGrounds.map((ground) => (
                                        <CampCard key={ground.id} ground={ground} />
                                    ))}

                                    {filteredGrounds.length === 0 && (
                                        <div className="col-span-full rounded-[2rem] border border-dashed border-black/10 bg-white/80 px-6 py-16 text-center">
                                            <p className="text-sm font-medium text-on-surface-variant">
                                                Tidak ada data ditemukan untuk kategori ini.
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="table"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="overflow-hidden rounded-[2rem] border border-black/5 bg-white ambient-shadow"
                                >
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[720px] border-collapse text-left">
                                            <thead className="bg-surface-container-low">
                                                <tr>
                                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface/55">
                                                        Ground
                                                    </th>
                                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface/55">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface/55">
                                                        Jarak Permukaan Air
                                                    </th>
                                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface/55">
                                                        Ketinggian Aman
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-black/5">
                                                {paginatedGrounds.map((ground) => (
                                                    <tr key={ground.id} className="transition-colors hover:bg-surface-container-low/40">
                                                        <td className="px-6 py-5">
                                                            <div className="flex flex-col gap-1">
                                                                <span className="font-bold text-on-surface">{ground.name}</span>
                                                                <span className="text-sm text-on-surface-variant">
                                                                    Muka air acuan {ground.currentWaterLevelCm} cm
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${getStatusClass(ground.status)}`}>
                                                                {ground.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-5 text-sm font-semibold text-on-surface">
                                                            {ground.displaySurfaceDistance}
                                                        </td>
                                                        <td className="px-6 py-5 text-sm font-semibold text-on-surface">
                                                            {ground.displayEffectiveHeight}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {filteredGrounds.length > 0 ? (
                            <div className="mt-8 flex justify-center">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                        disabled={currentPage === 1}
                                        className="rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Prev
                                    </button>
                                    <span className="text-sm font-semibold text-on-surface-variant">
                                        {currentPage} / {totalPages}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                                        disabled={currentPage === totalPages}
                                        className="rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </section>
                </div>
            </section>
        </main>
    );
}
