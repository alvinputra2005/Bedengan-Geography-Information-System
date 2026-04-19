import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import RegisterPage from '../pages/auth/RegisterPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import LoginPage from '../pages/auth/LoginPage';
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
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
