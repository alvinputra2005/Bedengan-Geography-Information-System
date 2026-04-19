import {
    BadgeInfo,
    LayoutDashboard,
    LogOut,
    Map,
    Radio,
    ShieldAlert,
    Trees,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navigationItems = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Monitoring', to: '/monitoring', icon: Radio },
    { label: 'Peta', to: '/map', icon: Map },
    { label: 'Mitigasi', to: '/mitigation', icon: ShieldAlert },
    { label: 'Akun Saya', to: '/account', icon: BadgeInfo },
];

function SidebarLink({ icon: Icon, label, to }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`
            }
        >
            <Icon size={18} />
            <span>{label}</span>
        </NavLink>
    );
}

export default function UserSidebar() {
    const navigate = useNavigate();
    const { user, isAdmin, signOut } = useAuth();

    async function handleLogout() {
        await signOut();
        navigate('/');
    }

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-black/5 bg-white/90 px-5 py-6 backdrop-blur-xl md:flex md:flex-col">
            <div className="mb-8 flex items-center gap-3 px-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-white">
                    <Trees size={24} />
                </div>
                <div>
                    <p className="font-headline text-lg font-extrabold tracking-tight text-on-surface">Portal Pengguna</p>
                    <p className="text-xs font-semibold text-on-surface-variant">Bedengan GIS</p>
                </div>
            </div>

            <div className="mb-6 rounded-[1.75rem] border border-black/5 bg-surface-container-low p-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Akun Aktif</p>
                <h2 className="mt-3 font-headline text-xl font-bold text-on-surface">{user?.name}</h2>
                <p className="mt-1 text-sm font-medium text-on-surface-variant">{user?.email}</p>
                <span className="mt-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {user?.role?.name}
                </span>
            </div>

            <nav className="flex flex-1 flex-col gap-2">
                {navigationItems.map((item) => (
                    <SidebarLink key={item.to} {...item} />
                ))}
            </nav>

            <div className="mt-6 space-y-3 border-t border-black/5 pt-6">
                {isAdmin ? (
                    <NavLink
                        to="/admin"
                        className="flex items-center justify-center rounded-2xl bg-secondary px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    >
                        Buka Panel Admin
                    </NavLink>
                ) : null}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 px-4 py-3 text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-low"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
