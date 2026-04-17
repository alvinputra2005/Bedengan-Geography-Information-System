import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { router } from './router';

export default function MainApp() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
