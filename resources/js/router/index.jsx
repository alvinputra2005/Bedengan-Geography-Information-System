import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
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
                element: <MonitoringPage />,
            },
            {
                path: 'map',
                element: <MapPage />,
            },
            {
                path: 'mitigation',
                element: <MitigationPage />,
            },
            {
                path: 'login',
                element: (
                    <GuestOnly>
                        <LoginPage />
                    </GuestOnly>
                ),
            },
            {
                path: 'dashboard',
                element: (
                    <RequireAuth>
                        <DashboardPage />
                    </RequireAuth>
                ),
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);
