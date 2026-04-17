import { useEffect, useState } from 'react';
import { getDashboardData } from '../../services/systemService';

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
        <main className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-20">
            <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary mb-3">Protected Route</p>
                <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface">Dashboard Operator</h1>
                <p className="mt-3 max-w-2xl text-on-surface-variant font-medium">
                    Halaman ini hanya bisa diakses setelah login, sehingga cocok untuk panel internal monitoring.
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
        </main>
    );
}
