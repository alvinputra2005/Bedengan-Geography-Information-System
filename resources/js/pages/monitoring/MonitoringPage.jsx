import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import KPISection from './components/KPISection';
import MonitoringChart from './components/MonitoringChart';
import Sidebar from './components/Sidebar';
import { getHealthStatus } from '../../services/systemService';
import { subscribeToLatestSensor } from '../../services/monitoringService';

const MAX_LOCAL_POINTS = 120;

function formatRelativeUpdate(receivedAt) {
    if (!receivedAt) {
        return 'Menunggu data live dari sensor';
    }

    const diffMs = Date.now() - receivedAt;
    const diffSeconds = Math.max(Math.round(diffMs / 1000), 0);

    if (diffSeconds < 5) {
        return 'Baru saja';
    }

    if (diffSeconds < 60) {
        return `${diffSeconds} detik lalu`;
    }

    const diffMinutes = Math.round(diffSeconds / 60);
    return `${diffMinutes} menit lalu`;
}

function formatReceivedTime(receivedAt) {
    if (!receivedAt) {
        return '-';
    }

    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(receivedAt));
}

function normalizeLatest(data, receivedAt) {
    const jarakRaw = Number(data?.jarakCm ?? 0);

    return {
        deviceId: data?.deviceId ?? 'ews-bedengan-01',
        jarakCm: Number.isFinite(jarakRaw) ? jarakRaw : 0,
        status: data?.status ?? 'Menunggu data',
        durationUs: Number(data?.durationUs ?? 0),
        buzzer: Boolean(data?.buzzer ?? false),
        deviceTimestamp: Number(data?.timestamp ?? 0), // tetap disimpan, tapi tidak dipakai untuk jam dashboard
        receivedAt,
    };
}

export default function MonitoringPage() {
    const [status, setStatus] = useState(null);
    const [latestSensor, setLatestSensor] = useState(null);
    const [sensorHistory, setSensorHistory] = useState([]);
    const [sensorError, setSensorError] = useState('');
    const lastPointKeyRef = useRef('');

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

    useEffect(() => {
        const unsubscribeLatest = subscribeToLatestSensor(
            (data) => {
                const receivedAt = Date.now();
                const normalized = normalizeLatest(data, receivedAt);

                setLatestSensor(normalized);
                setSensorError('');

                const pointKey = `${normalized.status}-${normalized.jarakCm}-${Math.floor(receivedAt / 1000)}`;
                if (pointKey === lastPointKeyRef.current) {
                    return;
                }

                lastPointKeyRef.current = pointKey;

                setSensorHistory((prev) => {
                    const nextPoint = {
                        id: String(receivedAt),
                        jarakCm: normalized.jarakCm > 0 ? normalized.jarakCm : 0,
                        status: normalized.status,
                        timestamp: receivedAt,
                    };

                    const next = [...prev, nextPoint];
                    return next.slice(-MAX_LOCAL_POINTS);
                });
            },
            () => setSensorError('Gagal membaca data sensor terbaru dari Firebase.')
        );

        return () => {
            unsubscribeLatest();
        };
    }, []);

    const sensorSummary = useMemo(() => {
        const previous = sensorHistory.at(-2);
        const current = sensorHistory.at(-1);
        const deltaCm = current && previous ? current.jarakCm - previous.jarakCm : 0;

        return {
            deviceId: latestSensor?.deviceId ?? 'ews-bedengan-01',
            jarakCm: Number(latestSensor?.jarakCm ?? 0),
            durationUs: Number(latestSensor?.durationUs ?? 0),
            buzzer: Boolean(latestSensor?.buzzer),
            status: latestSensor?.status ?? 'Menunggu data',
            timestamp: latestSensor?.receivedAt ?? 0,
            formattedTimestamp: formatReceivedTime(latestSensor?.receivedAt ?? 0),
            relativeUpdate: formatRelativeUpdate(latestSensor?.receivedAt ?? 0),
            deltaCm,
            historyCount: sensorHistory.length,
        };
    }, [latestSensor, sensorHistory]);

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
                                Update Terakhir: {sensorSummary.relativeUpdate} ({sensorSummary.formattedTimestamp})
                            </p>
                        </div>

                        <p className="max-w-3xl text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">
                            Pantau pembacaan sensor ultrasonik Bedengan secara live dari Firebase Realtime Database,
                            termasuk status siaga, histori pembacaan, dan respons buzzer dalam satu halaman.
                        </p>
                    </motion.header>

                    <KPISection summary={sensorSummary} />
                    <MonitoringChart history={sensorHistory} />
                </div>

                <Sidebar status={status} sensorSummary={sensorSummary} sensorError={sensorError} />
            </div>
        </main>
    );
}