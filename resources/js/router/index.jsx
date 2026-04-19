import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import UserLayout from '../layouts/UserLayout';
import RegisterPage from '../pages/auth/RegisterPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import HomePage from '../pages/homepage/HomePage';
import MapPage from '../pages/map/MapPage';
import MitigationPage from '../pages/mitigation/MitigationPage';
import MonitoringPage from '../pages/monitoring/MonitoringPage';
import AccountPage from '../pages/account/AccountPage';
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
        element: (
            <RequireAuth roles={['user', 'admin']}>
                <UserLayout />
            </RequireAuth>
        ),
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/monitoring',
                element: <MonitoringPage />,
            },
            {
                path: '/map',
                element: <MapPage />,
            },
            {
                path: '/mitigation',
                element: <MitigationPage />,
            },
            {
                path: '/account',
                element: <AccountPage />,
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
