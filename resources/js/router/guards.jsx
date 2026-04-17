import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function FullPageMessage({ message }) {
    return (
        <main className="min-h-screen flex items-center justify-center px-6 pt-24">
            <div className="rounded-3xl border border-black/5 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-semibold text-on-surface-variant">{message}</p>
            </div>
        </main>
    );
}

export function RequireAuth({ children }) {
    const location = useLocation();
    const { isAuthenticated, isBootstrapping } = useAuth();

    if (isBootstrapping) {
        return <FullPageMessage message="Memeriksa sesi login..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export function GuestOnly({ children }) {
    const { isAuthenticated, isBootstrapping } = useAuth();

    if (isBootstrapping) {
        return <FullPageMessage message="Menyiapkan halaman..." />;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
