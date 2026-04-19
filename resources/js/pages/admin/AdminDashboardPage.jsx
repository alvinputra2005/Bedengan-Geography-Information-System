import { useEffect, useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminKpiSection from '../../components/admin/AdminKpiSection';
import AdminNotificationPanel from '../../components/admin/AdminNotificationPanel';
import AdminSensorTable from '../../components/admin/AdminSensorTable';
import { getAdminDashboardData } from '../../services/adminService';

export default function AdminDashboardPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div className="flex flex-1 flex-col">
            <AdminHeader />
            {isLoading ? <p className="mb-6 text-sm font-semibold text-on-surface-variant">Memuat ringkasan admin...</p> : null}
            {error ? <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}
            {data ? (
                <>
                    <AdminKpiSection summary={data.summary} />
                    <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <AdminSensorTable sensors={data.sensors} />
                        </div>
                        <div className="lg:col-span-1">
                            <AdminNotificationPanel notifications={data.notifications} />
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
