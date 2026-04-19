import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminMobileNav from '../components/admin/AdminMobileNav';

export default function AdminLayout() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-surface text-on-surface antialiased md:pl-64">
            <AdminSidebar />
            <main className="mx-auto flex min-h-screen w-full max-w-7xl min-w-0 flex-col p-4 pt-24 md:p-10 md:pt-10">
                <div className="md:hidden mb-6">
                    <AdminMobileNav />
                </div>
                <Outlet />
            </main>
        </div>
    );
}
