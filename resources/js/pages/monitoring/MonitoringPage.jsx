import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import KPISection from './components/KPISection';
import MonitoringChart from './components/MonitoringChart';
import Sidebar from './components/Sidebar';
import { getHealthStatus } from '../../services/systemService';

export default function MonitoringPage() {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        async function loadStatus() {
            try {
                const response = await getHealthStatus();
                setStatus(response);
            } catch (error) {
                setStatus({
                    status: 'error',
                    timestamp: 'API tidak terjangkau',
                });
            }
        }

        loadStatus();
    }, []);

    return (
        <main className="min-h-screen px-4 pb-20 pt-32 font-sans md:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row">
                <div className="flex flex-1 flex-col gap-8">
                    <motion.header
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        <h1 className="font-headline text-4xl font-black tracking-tight text-on-surface md:text-5xl">
                            Monitoring Sungai
                        </h1>

                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-container opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary-container"></span>
                            </span>
                            <p className="text-xs font-bold uppercase tracking-wider text-on-surface/50">
                                Update Terakhir: 10 Menit Lalu (Data Live)
                            </p>
                        </div>

                        <p className="max-w-3xl text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">
                            Pantau tinggi muka air, tren perubahan debit, dan insight operasional kawasan Bedengan
                            dalam satu tampilan yang lebih siap dipakai untuk monitoring harian.
                        </p>
                    </motion.header>

                    <KPISection />
                    <MonitoringChart />
                </div>

                <Sidebar status={status} />
            </div>
        </main>
    );
}
