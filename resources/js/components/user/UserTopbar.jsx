import { BadgeInfo, LayoutDashboard, Map, Menu, Radio, ShieldAlert, Trees, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const mobileItems = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Monitoring', to: '/monitoring', icon: Radio },
    { label: 'Peta', to: '/map', icon: Map },
    { label: 'Mitigasi', to: '/mitigation', icon: ShieldAlert },
    { label: 'Akun Saya', to: '/account', icon: BadgeInfo },
];

export default function UserTopbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    async function handleLogout() {
        await signOut();
        setMenuOpen(false);
        navigate('/');
    }

    return (
        <header className="fixed inset-x-0 top-0 z-30 border-b border-black/5 bg-white/85 backdrop-blur-xl md:left-72">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white md:hidden">
                        <Trees size={22} />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Area Pengguna</p>
                        <h1 className="font-headline text-lg font-extrabold text-on-surface md:text-2xl">
                            Selamat datang, {user?.name?.split(' ')?.[0] ?? 'Pengguna'}
                        </h1>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="rounded-2xl border border-black/10 p-3 text-on-surface md:hidden"
                    aria-label="Buka menu pengguna"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {menuOpen ? (
                <div className="border-t border-black/5 bg-white px-4 py-4 md:hidden">
                    <div className="flex flex-col gap-2">
                        {mobileItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `rounded-2xl px-4 py-3 text-sm font-semibold ${
                                        isActive ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-2xl border border-black/10 px-4 py-3 text-left text-sm font-semibold text-on-surface"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
