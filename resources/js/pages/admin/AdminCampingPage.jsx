import { useEffect, useMemo, useState } from 'react';
import { Droplets, Mountain, ShieldAlert, Trees } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import { fetchCampingGrounds } from '../../services/campingGroundService';
import { subscribeToLatestSensor } from '../../services/monitoringService';
import {
    FALLBACK_WATER_LEVEL_CM,
    computeGroundMetrics,
    getRiskStyles,
    getStatusClass,
} from '../../utils/campingGrounds';

function StatCard({ icon: Icon, label, value, tone = 'primary' }) {
    const toneClasses = {
        primary: 'bg-primary/10 text-primary',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-rose-100 text-rose-700',
    };

    return (
        <article className="rounded-[24px] border border-outline-variant/20 bg-white/85 p-5 shadow-[0_22px_60px_-44px_rgba(19,27,46,0.35)]">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses[tone] ?? toneClasses.primary}`}>
                <Icon size={20} />
            </div>
            <p className="mt-4 text-sm font-medium text-on-surface-variant">{label}</p>
            <p className="mt-1 font-headline text-3xl font-extrabold tracking-tight text-on-surface">{value}</p>
        </article>
    );
}

export default function AdminCampingPage() {
    const [grounds, setGrounds] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [liveWaterLevelCm, setLiveWaterLevelCm] = useState(FALLBACK_WATER_LEVEL_CM);

    useEffect(() => {
        async function loadGrounds() {
            try {
                const nextGrounds = await fetchCampingGrounds();
                setGrounds(nextGrounds);
                setError('');
            } catch (requestError) {
                setError(requestError.response?.data?.message || 'Gagal memuat data camping.');
            } finally {
                setIsLoading(false);
            }
        }

        loadGrounds();
    }, []);

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
        () => grounds.map((ground) => computeGroundMetrics(ground, liveWaterLevelCm)),
        [grounds, liveWaterLevelCm]
    );

    const summary = useMemo(() => {
        const recommendedCount = calculatedGrounds.filter((ground) => ground.status === 'Direkomendasikan').length;
        const warningCount = calculatedGrounds.filter((ground) => ground.status === 'Waspada').length;
        const highRiskCount = calculatedGrounds.filter((ground) => ground.status === 'Tidak Direkomendasikan').length;

        return {
            total: calculatedGrounds.length,
            recommendedCount,
            warningCount,
            highRiskCount,
        };
    }, [calculatedGrounds]);

    return (
        <div className="flex min-w-0 flex-1 flex-col">
            <AdminHeader
                title="Data Camping"
                subtitle="Data area camping Bedengan tersimpan di database dan terhubung ke perhitungan risiko terbaru."
            />

            {isLoading ? <p className="mb-6 text-sm font-semibold text-on-surface-variant">Memuat data camping...</p> : null}
            {error ? <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}

            <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard icon={Trees} label="Total Ground" value={summary.total} />
                <StatCard icon={ShieldAlert} label="Direkomendasikan" value={summary.recommendedCount} tone="success" />
                <StatCard icon={Mountain} label="Waspada" value={summary.warningCount} tone="warning" />
                <StatCard icon={Droplets} label="Air Saat Ini" value={`${liveWaterLevelCm} cm`} tone="danger" />
            </div>

            <section className="overflow-hidden rounded-[28px] border border-outline-variant/20 bg-white/85 shadow-[0_28px_80px_-52px_rgba(19,27,46,0.45)]">
                <div className="flex flex-col gap-3 border-b border-outline-variant/15 px-6 py-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="font-headline text-xl font-extrabold tracking-tight text-on-surface">Daftar Area Camping</h2>
                        <p className="mt-1 text-sm text-on-surface-variant">
                            Menampilkan data ground yang sebelumnya dipakai di halaman rekomendasi camping.
                        </p>
                    </div>
                    <div className="rounded-full bg-surface-container px-4 py-2 text-sm font-semibold text-on-surface-variant">
                        Risiko tinggi: <span className="font-bold text-rose-700">{summary.highRiskCount}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1080px] border-collapse text-left">
                        <thead className="bg-surface-container-low">
                            <tr>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/55">
                                    Ground
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/55">
                                    Jarak Datar
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/55">
                                    Tebing Awal
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/55">
                                    Muka Air Dasar
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/55">
                                    Jarak Permukaan
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/55">
                                    Ketinggian Aman
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/55">
                                    Risiko
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/55">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {calculatedGrounds.map((ground) => {
                                const riskStyles = getRiskStyles(ground.riskScore);

                                return (
                                    <tr key={ground.id} className="align-top transition-colors hover:bg-surface-container-low/40">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={ground.image}
                                                    alt={ground.name}
                                                    referrerPolicy="no-referrer"
                                                    className="h-14 w-20 rounded-2xl object-cover"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-bold text-on-surface">{ground.name}</span>
                                                    <span className="text-sm text-on-surface-variant">{ground.slug}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-semibold text-on-surface">{ground.displayFlatDistance}</td>
                                        <td className="px-6 py-5 text-sm font-semibold text-on-surface">{ground.displayCliffHeight}</td>
                                        <td className="px-6 py-5 text-sm font-semibold text-on-surface">{ground.baseWaterLevelCm} cm</td>
                                        <td className="px-6 py-5 text-sm font-semibold text-on-surface">{ground.displaySurfaceDistance}</td>
                                        <td className="px-6 py-5 text-sm font-semibold text-on-surface">{ground.displayEffectiveHeight}</td>
                                        <td className="px-6 py-5">
                                            <div className="min-w-[180px]">
                                                <div className="mb-2 flex items-center justify-between gap-3">
                                                    <span className="text-xs font-semibold text-on-surface-variant">{ground.riskScore}%</span>
                                                    <span className={`text-xs font-bold ${riskStyles.text}`}>{ground.riskLevel}</span>
                                                </div>
                                                <div className="h-2 overflow-hidden rounded-full bg-surface-container-low">
                                                    <div className={`h-full rounded-full ${riskStyles.bar}`} style={{ width: `${ground.riskScore}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${getStatusClass(ground.status)}`}>
                                                {ground.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}

                            {!isLoading && calculatedGrounds.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-sm font-medium text-on-surface-variant">
                                        Belum ada data camping yang tersedia di database.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
