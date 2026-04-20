import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminKpiSection from '../../components/admin/AdminKpiSection';
import AdminMonitoringOverview from '../../components/admin/AdminMonitoringOverview';
import AdminNotificationPanel from '../../components/admin/AdminNotificationPanel';
import AdminSensorTable from '../../components/admin/AdminSensorTable';
import { getAdminDashboardData } from '../../services/adminService';

const MAX_HISTORY_POINTS = 24;
const DASHBOARD_STORAGE_KEY = 'bedengan.admin.dashboard.payload';
const DASHBOARD_STORAGE_TTL_MS = 30_000;
const LazyAdminSensorChart = lazy(() => import('../../components/admin/AdminSensorChart'));

function readStoredDashboardData() {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const rawValue = window.localStorage.getItem(DASHBOARD_STORAGE_KEY);

        if (!rawValue) {
            return null;
        }

        const parsedValue = JSON.parse(rawValue);
        const cachedAt = Number(parsedValue?.cachedAt ?? 0);

        if (!cachedAt || Date.now() - cachedAt > DASHBOARD_STORAGE_TTL_MS) {
            window.localStorage.removeItem(DASHBOARD_STORAGE_KEY);
            return null;
        }

        return parsedValue.payload ?? null;
    } catch (error) {
        window.localStorage.removeItem(DASHBOARD_STORAGE_KEY);
        return null;
    }
}

function writeStoredDashboardData(payload) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(
        DASHBOARD_STORAGE_KEY,
        JSON.stringify({
            cachedAt: Date.now(),
            payload,
        })
    );
}

function normalizeTimestamp(rawTimestamp, fallbackTimestamp = Date.now()) {
    const numericTimestamp = Number(rawTimestamp ?? 0);

    if (!Number.isFinite(numericTimestamp) || numericTimestamp <= 0) {
        return fallbackTimestamp;
    }

    return numericTimestamp > 1_000_000_000_000 ? numericTimestamp : numericTimestamp * 1000;
}

function normalizeLatestSensor(data, receivedAt) {
    return {
        deviceId: data?.deviceId ?? 'ews-bedengan-01',
        jarakCm: Number(data?.jarakCm ?? 0),
        status: data?.status ?? 'Menunggu data',
        timestamp: receivedAt,
    };
}

function normalizeHistoryPayload(payload) {
    if (!payload) {
        return [];
    }

    const entries = Array.isArray(payload)
        ? payload.filter(Boolean).map((item, index) => ({ id: item?.id ?? `sensor-history-${index}`, ...item }))
        : Object.entries(payload).map(([id, item]) => ({ id, ...item }));

    return entries
        .map((item, index) => ({
            id: String(item.id ?? `sensor-history-${index}`),
            jarakCm: Number(item?.jarakCm ?? 0),
            status: item?.status ?? 'Menunggu data',
            timestamp: normalizeTimestamp(item?.timestamp, Date.now() + index * 1000),
        }))
        .filter((item) => Number.isFinite(item.jarakCm))
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(-MAX_HISTORY_POINTS);
}

function calculateAverageIncrease(history) {
    if (history.length < 2) {
        return 0;
    }

    const positiveDiffs = history
        .slice(1)
        .map((item, index) => Number((item.jarakCm - history[index].jarakCm).toFixed(1)))
        .filter((value) => value > 0);

    if (positiveDiffs.length === 0) {
        return 0;
    }

    const average = positiveDiffs.reduce((total, value) => total + value, 0) / positiveDiffs.length;
    return Number(average.toFixed(1));
}

export default function AdminDashboardPage() {
    const [data, setData] = useState(() => readStoredDashboardData());
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(() => readStoredDashboardData() === null);
    const [latestSensor, setLatestSensor] = useState(null);
    const [sensorHistory, setSensorHistory] = useState([]);
    const [sensorError, setSensorError] = useState('');

    useEffect(() => {
        async function loadDashboard() {
            try {
                const response = await getAdminDashboardData();
                setData(response);
                writeStoredDashboardData(response);
            } catch (requestError) {
                setError(requestError.response?.data?.message || 'Gagal memuat dashboard admin.');
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboard();
    }, []);

    useEffect(() => {
        let timeoutId = null;
        let idleId = null;
        let unsubscribeLatest = () => {};
        let unsubscribeHistory = () => {};
        let isCancelled = false;

        async function subscribeRealtime() {
            try {
                const monitoringService = await import('../../services/monitoringService');

                if (isCancelled) {
                    return;
                }

                unsubscribeLatest = monitoringService.subscribeToLatestSensor(
                    (payload) => {
                        setLatestSensor(normalizeLatestSensor(payload, Date.now()));
                        setSensorError('');
                    },
                    () => setSensorError('Data sensor live dari Firebase belum bisa dimuat.')
                );

                unsubscribeHistory = monitoringService.subscribeToSensorHistory(
                    (payload) => {
                        setSensorHistory(normalizeHistoryPayload(payload));
                        setSensorError('');
                    },
                    () => setSensorError('Riwayat sensor live belum tersedia.')
                );
            } catch (error) {
                if (!isCancelled) {
                    setSensorError('Data sensor live dari Firebase belum bisa dimuat.');
                }
            }
        }

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(subscribeRealtime, { timeout: 1500 });
        } else {
            timeoutId = window.setTimeout(subscribeRealtime, 250);
        }

        return () => {
            isCancelled = true;

            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }

            if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
                window.cancelIdleCallback(idleId);
            }

            unsubscribeLatest();
            unsubscribeHistory();
        };
    }, []);

    const fallbackHistory = useMemo(() => normalizeHistoryPayload(data?.chart ?? []), [data]);
    const chartHistory = sensorHistory.length > 0 ? sensorHistory : fallbackHistory;

    const monitoringSummary = useMemo(() => {
        const previousPoint = chartHistory.at(-2);
        const latestPoint = chartHistory.at(-1);
        const apiMonitoring = data?.monitoring;
        const fallbackTimestamp = apiMonitoring?.last_recorded_at
            ? new Date(apiMonitoring.last_recorded_at).getTime()
            : null;

        return {
            sensorName: apiMonitoring?.sensor_name ?? 'Sensor Sungai Bedengan',
            deviceId: latestSensor?.deviceId ?? apiMonitoring?.device_id ?? 'ews-bedengan-01',
            jarakCm: latestSensor?.jarakCm ?? latestPoint?.jarakCm ?? Number(apiMonitoring?.jarak_cm ?? 0),
            status: latestSensor?.status ?? latestPoint?.status ?? apiMonitoring?.status ?? 'Menunggu data',
            deltaCm: latestPoint && previousPoint ? Number((latestPoint.jarakCm - previousPoint.jarakCm).toFixed(1)) : Number(apiMonitoring?.delta_cm ?? 0),
            averageIncreaseCm: chartHistory.length > 0 ? calculateAverageIncrease(chartHistory) : Number(apiMonitoring?.average_increase_cm ?? 0),
            timestamp: latestSensor?.timestamp ?? latestPoint?.timestamp ?? fallbackTimestamp,
            historyCount: chartHistory.length,
            sourceLabel: sensorHistory.length > 0 || latestSensor ? 'Firebase Realtime' : 'Ringkasan database',
        };
    }, [chartHistory, data, latestSensor, sensorHistory.length]);

    return (
        <div className="flex min-w-0 flex-1 flex-col">
            <AdminHeader
                title="Dashboard Monitoring Sensor"
            />
            {isLoading ? <p className="mb-6 text-sm font-semibold text-on-surface-variant">Memuat ringkasan admin...</p> : null}
            {error ? <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}

            <AdminKpiSection summary={data?.summary} />

            <div className="mb-6 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
                <AdminMonitoringOverview monitoring={monitoringSummary} sensorError={sensorError} />
                <Suspense
                    fallback={(
                        <section className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5">
                            <div className="mb-5">
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">Grafik Sensor</p>
                                <h2 className="mt-2 font-headline text-xl font-bold text-on-surface">
                                    {monitoringSummary.sensorName}
                                </h2>
                                <p className="mt-1 text-sm text-on-surface-variant">Menyiapkan grafik pembacaan sensor...</p>
                            </div>
                            <div className="flex h-[280px] items-center justify-center rounded-2xl border border-dashed border-outline-variant/20 bg-surface px-6 text-center text-sm font-medium text-on-surface-variant">
                                Grafik sedang dimuat.
                            </div>
                        </section>
                    )}
                >
                    <LazyAdminSensorChart history={chartHistory} sensorName={monitoringSummary.sensorName} />
                </Suspense>
            </div>

            <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
                <div className="min-w-0">
                    <AdminSensorTable sensors={data?.sensors ?? []} isLoading={isLoading && !data} />
                </div>
                <div className="min-w-0">
                    <AdminNotificationPanel notifications={data?.notifications ?? []} isLoading={isLoading && !data} />
                </div>
            </div>
        </div>
    );
}
