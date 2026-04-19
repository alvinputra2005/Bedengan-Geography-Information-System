import { useEffect, useMemo, useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminKpiSection from '../../components/admin/AdminKpiSection';
import AdminMonitoringOverview from '../../components/admin/AdminMonitoringOverview';
import AdminNotificationPanel from '../../components/admin/AdminNotificationPanel';
import AdminSensorChart from '../../components/admin/AdminSensorChart';
import AdminSensorTable from '../../components/admin/AdminSensorTable';
import { getAdminDashboardData } from '../../services/adminService';
import { subscribeToLatestSensor, subscribeToSensorHistory } from '../../services/monitoringService';

const MAX_HISTORY_POINTS = 24;

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
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [latestSensor, setLatestSensor] = useState(null);
    const [sensorHistory, setSensorHistory] = useState([]);
    const [sensorError, setSensorError] = useState('');

    useEffect(() => {
        async function loadDashboard() {
            try {
                const response = await getAdminDashboardData();
                setData(response);
            } catch (requestError) {
                setError(requestError.response?.data?.message || 'Gagal memuat dashboard admin.');
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboard();
    }, []);

    useEffect(() => {
        const unsubscribeLatest = subscribeToLatestSensor(
            (payload) => {
                setLatestSensor(normalizeLatestSensor(payload, Date.now()));
                setSensorError('');
            },
            () => setSensorError('Data sensor live dari Firebase belum bisa dimuat.')
        );

        const unsubscribeHistory = subscribeToSensorHistory(
            (payload) => {
                setSensorHistory(normalizeHistoryPayload(payload));
                setSensorError('');
            },
            () => setSensorError('Riwayat sensor live belum tersedia.')
        );

        return () => {
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
        <div className="flex flex-1 flex-col">
            <AdminHeader
                title="Dashboard Monitoring Sensor"
            />
            {isLoading ? <p className="mb-6 text-sm font-semibold text-on-surface-variant">Memuat ringkasan admin...</p> : null}
            {error ? <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}
            {data ? (
                <>
                    <AdminKpiSection summary={data.summary} />

                    <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
                        <AdminMonitoringOverview monitoring={monitoringSummary} sensorError={sensorError} />
                        <AdminSensorChart history={chartHistory} sensorName={monitoringSummary.sensorName} />
                    </div>

                    <div className="grid flex-1 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
                        <div>
                            <AdminSensorTable sensors={data.sensors} />
                        </div>
                        <div>
                            <AdminNotificationPanel notifications={data.notifications} />
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
