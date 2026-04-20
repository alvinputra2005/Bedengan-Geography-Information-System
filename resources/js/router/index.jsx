import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import AdminPlaceholderPage from '../pages/admin/AdminPlaceholderPage';
import { GuestOnly, RequireAuth } from './guards';

const HomePage = lazy(() => import('../pages/homepage/HomePage'));
const CampingGroundPage = lazy(() => import('../pages/camping-ground/CampingGroundPage'));
const MonitoringPage = lazy(() => import('../pages/monitoring/MonitoringPage'));
const MapPage = lazy(() => import('../pages/map/MapPage'));
const MitigationPage = lazy(() => import('../pages/mitigation/MitigationPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminCampingPage = lazy(() => import('../pages/admin/AdminCampingPage'));
const AdminMitigationPage = lazy(() => import('../pages/admin/AdminMitigationPage'));
const NotFoundPage = lazy(() => import('../pages/system/NotFoundPage'));

function RouteFallback({ message = 'Memuat halaman...' }) {
    return (
        <main className="min-h-screen flex items-center justify-center px-6 pt-24">
            <div className="rounded-3xl border border-black/5 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-semibold text-on-surface-variant">{message}</p>
            </div>
        </main>
    );
}

function withSuspense(Component, props = {}, message) {
    return (
        <Suspense fallback={<RouteFallback message={message} />}>
            <Component {...props} />
        </Suspense>
    );
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: withSuspense(HomePage, null, 'Memuat beranda...'),
            },
            {
                path: 'camping-ground',
                element: withSuspense(CampingGroundPage, null, 'Memuat area camping...'),
            },
            {
                path: 'monitoring',
                element: (
                    <RequireAuth roles={['user', 'admin']}>
                        {withSuspense(MonitoringPage, null, 'Memuat monitoring...')}
                    </RequireAuth>
                ),
            },
            {
                path: 'map',
                element: (
                    <RequireAuth roles={['user', 'admin']}>
                        {withSuspense(MapPage, null, 'Memuat peta...')}
                    </RequireAuth>
                ),
            },
            {
                path: 'mitigation',
                element: (
                    <RequireAuth roles={['user', 'admin']}>
                        {withSuspense(MitigationPage, null, 'Memuat mitigasi...')}
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
                        {withSuspense(LoginPage, null, 'Memuat login...')}
                    </GuestOnly>
                ),
            },
            {
                path: '/register',
                element: (
                    <GuestOnly>
                        {withSuspense(RegisterPage, null, 'Memuat registrasi...')}
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
                element: withSuspense(AdminDashboardPage, null, 'Memuat dashboard admin...'),
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
                element: withSuspense(AdminCampingPage, null, 'Memuat data camping...'),
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
                element: withSuspense(AdminMitigationPage, null, 'Memuat laporan mitigasi...'),
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
        element: withSuspense(NotFoundPage, null, 'Memuat halaman...'),
    },
]);
