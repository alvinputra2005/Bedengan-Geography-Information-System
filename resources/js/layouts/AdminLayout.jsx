import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminMobileNav from '../components/admin/AdminMobileNav';

export default function AdminLayout() {
    return (
        <div className="bg-surface text-on-surface min-h-screen antialiased">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-4 pt-24 md:p-10 md:pt-10 flex flex-col w-full max-w-7xl mx-auto">
                <div className="md:hidden mb-6">
                    <AdminMobileNav />
                </div>
                <Outlet />
            </main>
        </div>
    );
}
