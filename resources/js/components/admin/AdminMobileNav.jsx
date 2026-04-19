import { LayoutDashboard, Map as MapIcon, Radio, Settings, ShieldAlert, Trees } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const items = [
    { label: 'Ringkasan', to: '/admin', icon: LayoutDashboard },
    { label: 'Monitoring', to: '/admin/monitoring', icon: Radio },
    { label: 'Peta', to: '/admin/map', icon: MapIcon },
    { label: 'Mitigasi', to: '/admin/mitigation', icon: ShieldAlert },
    { label: 'Camping', to: '/admin/camping', icon: Trees },
    { label: 'Pengaturan', to: '/admin/settings', icon: Settings },
];

export default function AdminMobileNav() {
    const location = useLocation();

    return (
        <nav className="flex gap-2 overflow-x-auto px-1 pb-2">
            {items.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    className={`flex min-w-max items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                        location.pathname === item.to
                            ? 'border-primary/5 bg-gradient-to-r from-primary to-primary-container text-white shadow-[0_14px_28px_-18px_rgba(0,55,176,0.95)]'
                            : 'border-transparent bg-white/70 text-on-surface-variant hover:border-white hover:bg-white hover:text-primary'
                    }`}
                >
                    <item.icon size={16} />
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
}
