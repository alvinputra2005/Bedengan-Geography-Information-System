import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import RegisterPage from '../pages/auth/RegisterPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminCampingPage from '../pages/admin/AdminCampingPage';
import AdminPlaceholderPage from '../pages/admin/AdminPlaceholderPage';
import LoginPage from '../pages/auth/LoginPage';
import CampingGroundPage from '../pages/camping-ground/CampingGroundPage';
import HomePage from '../pages/homepage/HomePage';
import MapPage from '../pages/map/MapPage';
import MitigationPage from '../pages/mitigation/MitigationPage';
import MonitoringPage from '../pages/monitoring/MonitoringPage';
import NotFoundPage from '../pages/system/NotFoundPage';
import { GuestOnly, RequireAuth } from './guards';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'camping-ground',
                element: <CampingGroundPage />,
            },
            {
                path: 'monitoring',
                element: (
                    <RequireAuth roles={['user', 'admin']}>
                        <MonitoringPage />
                    </RequireAuth>
                ),
            },
            {
                path: 'map',
                element: (
                    <RequireAuth roles={['user', 'admin']}>
                        <MapPage />
                    </RequireAuth>
                ),
            },
            {
                path: 'mitigation',
                element: (
                    <RequireAuth roles={['user', 'admin']}>
                        <MitigationPage />
                    </RequireAuth>
                ),
            },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: (
                    <GuestOnly>
                        <LoginPage />
                    </GuestOnly>
                ),
            },
            {
                path: '/register',
                element: (
                    <GuestOnly>
                        <RegisterPage />
                    </GuestOnly>
                ),
            },
        ],
    },
    {
        path: '/admin',
        element: (
            <RequireAuth roles={['admin']}>
                <AdminLayout />
            </RequireAuth>
        ),
        children: [
            {
                index: true,
                element: <AdminDashboardPage />,
            },
            {
                path: 'monitoring',
                element: (
                    <AdminPlaceholderPage
                        title="Monitoring Sensor"
                        subtitle="Pantau kualitas data dan status perangkat langsung dari panel admin."
                        description="Bagian ini disiapkan untuk kontrol data monitoring, validasi pembacaan sensor, dan tindak lanjut gangguan perangkat."
                    />
                ),
            },
            {
                path: 'camping',
                element: <AdminCampingPage />,
            },
            {
                path: 'map',
                element: (
                    <AdminPlaceholderPage
                        title="Peta Spasial"
                        subtitle="Atur lapisan peta, titik lokasi, dan data geospasial kawasan."
                        description="Ruang ini disiapkan untuk manajemen layer GIS, validasi koordinat, dan pembaruan visualisasi peta untuk kebutuhan admin."
                    />
                ),
            },
            {
                path: 'mitigation',
                element: (
                    <AdminPlaceholderPage
                        title="Laporan Mitigasi"
                        subtitle="Kelola laporan insiden dan alur tindak lanjut mitigasi risiko."
                        description="Halaman ini nantinya dipakai untuk meninjau laporan masuk, mengurutkan prioritas, dan mendokumentasikan tindakan mitigasi."
                    />
                ),
            },
            {
                path: 'settings',
                element: (
                    <AdminPlaceholderPage
                        title="Pengaturan"
                        subtitle="Atur preferensi panel admin dan parameter sistem operasional."
                        description="Bagian ini disiapkan untuk konfigurasi hak akses, preferensi notifikasi, dan pengaturan inti dashboard admin."
                    />
                ),
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
