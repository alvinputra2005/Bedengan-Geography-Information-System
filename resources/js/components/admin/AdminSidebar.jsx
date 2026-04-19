import {
    AlertTriangle,
    LayoutDashboard,
    LogOut,
    Map as MapIcon,
    Plus,
    Radio,
    Settings,
    Trees,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const adminNavItems = [
    { icon: LayoutDashboard, label: 'Ringkasan', to: '/admin' },
    { icon: Radio, label: 'Monitoring', to: '/monitoring' },
    { icon: Trees, label: 'Data Camping', to: '/dashboard' },
    { icon: MapIcon, label: 'Peta Spasial', to: '/map' },
    { icon: AlertTriangle, label: 'Laporan Mitigasi', to: '/mitigation' },
    { icon: Settings, label: 'Pengaturan', to: '/account' },
];

function NavItem({ icon: Icon, label, to }) {
    return (
        <NavLink
            to={to}
            end={to === '/admin'}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ease-in-out ${
                    isActive
                        ? 'bg-white text-primary font-bold shadow-sm'
                        : 'text-on-surface opacity-60 hover:bg-white/50 font-medium'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <Icon size={20} className={isActive ? 'text-primary' : ''} />
                    {label}
                </>
            )}
        </NavLink>
    );
}

export default function AdminSidebar() {
    const navigate = useNavigate();
    const { signOut } = useAuth();

    async function handleLogout() {
        await signOut();
        navigate('/');
    }

    return (
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col space-y-2 border-r border-outline-variant/15 bg-surface-container-low p-4 md:flex">
            <div className="mb-8 flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <Trees size={22} fill="currentColor" />
                </div>
                <div>
                    <h2 className="font-headline text-lg font-extrabold leading-tight tracking-tight text-primary-container">
                        Panel Admin
                    </h2>
                    <p className="text-[10px] font-medium text-on-surface-variant">Wisata Alam Bedengan</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {adminNavItems.map((item) => (
                    <NavItem key={item.to} {...item} />
                ))}
            </nav>

            <div className="mt-auto space-y-4 border-t border-outline-variant/15 pt-4">
                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-container px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(29,78,216,0.39)] transition-opacity hover:opacity-90"
                >
                    <Plus size={18} />
                    Tambah Data Baru
                </button>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-error opacity-80 transition-all hover:bg-error-container hover:opacity-100"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
