import { Trees, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getDefaultPrivateRoute } from '../../utils/auth';

const navigationItems = [
    { label: 'Beranda', to: '/' },
    { label: 'Monitoring', to: '/monitoring' },
    { label: 'Peta Interaktif', to: '/map' },
    { label: 'Mitigasi', to: '/mitigation' },
];

function NavItem({ to, children }) {
    return (
        <NavLink
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
                `px-5 py-2 rounded-full transition-all text-sm font-semibold tracking-wide ${
                    isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                }`
            }
        >
            {children}
        </NavLink>
    );
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();
    const { user, isAuthenticated, signOut } = useAuth();
    const workspaceRoute = getDefaultPrivateRoute(user);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    async function handleLogout() {
        setIsLoggingOut(true);

        try {
            await signOut();
            navigate('/');
        } finally {
            setIsLoggingOut(false);
            setMenuOpen(false);
        }
    }

    return (
        <header>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-white/40 backdrop-blur-2xl py-2.5 shadow-sm'
                        : 'bg-white py-4 shadow-md'
                }`}
            >
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center min-h-14">
                    <Link
                        to="/"
                        className="text-2xl font-extrabold tracking-tighter text-gradient font-headline flex items-center gap-2 flex-shrink-0"
                    >
                        <Trees className="text-primary" size={32} />
                        <span>Bedengan GIS</span>
                    </Link>

                    <div className="hidden lg:flex items-center font-headline font-semibold text-sm tracking-wide bg-surface-container-lowest/30 p-1.5 rounded-full border border-black/5 mx-8">
                        {navigationItems.map((item) => (
                            <NavItem key={item.label} to={item.to}>
                                {item.label}
                            </NavItem>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center flex-shrink-0">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                                        Login sebagai
                                    </p>
                                    <p className="text-sm font-bold text-on-surface">{user?.name}</p>
                                </div>
                                <Link
                                    to={workspaceRoute}
                                    className="rounded-full border border-primary/15 px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                                >
                                    Buka Panel
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="bg-gradient-primary text-white px-6 py-3 rounded-full font-bold text-sm hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-70"
                                >
                                    {isLoggingOut ? 'Keluar...' : 'Logout'}
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-gradient-primary text-white px-9 py-3 rounded-full font-bold text-sm hover:shadow-xl hover:shadow-primary/30 transition-all scale-100 active:scale-95 cursor-pointer"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="lg:hidden text-on-surface bg-surface-container-low/50 p-2.5 rounded-full"
                        aria-label="Buka menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="lg:hidden px-6 md:px-12 pb-4">
                        <div className="max-w-[1440px] mx-auto bg-white/95 backdrop-blur-xl rounded-3xl border border-black/5 shadow-lg p-4 flex flex-col gap-2">
                            {navigationItems.map((item) => (
                                <NavLink
                                    key={item.label}
                                    to={item.to}
                                    end={item.to === '/'}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `px-4 py-3 rounded-2xl text-sm font-semibold tracking-wide transition-colors ${
                                            isActive
                                                ? 'text-primary bg-primary/10'
                                                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to={workspaceRoute}
                                        onClick={() => setMenuOpen(false)}
                                        className="px-4 py-3 rounded-2xl text-sm font-semibold tracking-wide bg-primary/10 text-primary"
                                    >
                                        Buka Panel
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        className="px-4 py-3 rounded-2xl text-sm font-semibold tracking-wide text-left bg-primary text-white disabled:opacity-70"
                                    >
                                        {isLoggingOut ? 'Keluar...' : 'Logout'}
                                    </button>
                                </>
                            ) : (
                                <div className="grid gap-2">
                                    <Link
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}
                                        className="px-4 py-3 rounded-2xl text-sm font-semibold tracking-wide bg-primary text-white"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setMenuOpen(false)}
                                        className="px-4 py-3 rounded-2xl text-sm font-semibold tracking-wide border border-black/10 text-on-surface"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
