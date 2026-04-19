import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData } from '../../services/systemService';

const quickLinks = [
    {
        title: 'Monitoring Live',
        description: 'Lihat pembacaan sensor terbaru dan histori perubahan air.',
        to: '/monitoring',
    },
    {
        title: 'Peta Interaktif',
        description: 'Buka area jalur evakuasi, zona aman, dan lokasi strategis.',
        to: '/map',
    },
    {
        title: 'Mitigasi Risiko',
        description: 'Akses SOP lapangan, prioritas respon, dan checklist evakuasi.',
        to: '/mitigation',
    },
];

export default function DashboardPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const response = await getDashboardData();
                setData(response);
            } catch (requestError) {
                setError(requestError.response?.data?.message || 'Gagal memuat dashboard.');
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboard();
    }, []);

    return (
        <section className="space-y-8">
            <div className="mb-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-primary">Portal Pengguna</p>
                <h1 className="font-headline text-4xl font-extrabold text-on-surface md:text-5xl">Dashboard Pengguna</h1>
                <p className="mt-3 max-w-2xl text-on-surface-variant font-medium">
                    Setelah login, user masuk ke area private yang terpisah dari beranda publik. Semua menu utama ada di sidebar pengguna.
                </p>
            </div>

            {isLoading ? <p className="text-sm font-semibold text-on-surface-variant">Memuat data dashboard...</p> : null}
            {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}

            {data ? (
                <section className="grid gap-6 md:grid-cols-3">
                    <article className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">Water Level</p>
                        <h2 className="font-headline text-4xl font-black text-on-surface">{data.summary.water_level}</h2>
                    </article>
                    <article className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">Ground</p>
                        <h2 className="font-headline text-3xl font-black text-on-surface">
                            {data.summary.ground_recommendation}
                        </h2>
                    </article>
                    <article className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">Status</p>
                        <h2 className="font-headline text-3xl font-black text-on-surface">{data.summary.visitor_status}</h2>
                    </article>
                </section>
            ) : null}

            <section className="grid gap-5 md:grid-cols-3">
                {quickLinks.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
                    >
                        <h2 className="font-headline text-xl font-bold text-on-surface">{item.title}</h2>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-on-surface-variant">{item.description}</p>
                    </Link>
                ))}
            </section>
        </section>
    );
}
