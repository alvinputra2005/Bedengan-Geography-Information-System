import { LayoutDashboard, Map as MapIcon, Radio, ShieldAlert, Trees } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
    { label: 'Admin', to: '/admin', icon: LayoutDashboard },
    { label: 'Monitoring', to: '/monitoring', icon: Radio },
    { label: 'Peta', to: '/map', icon: MapIcon },
    { label: 'Mitigasi', to: '/mitigation', icon: ShieldAlert },
    { label: 'Camping', to: '/admin', icon: Trees },
];

export default function AdminMobileNav() {
    return (
        <nav className="flex gap-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/admin'}
                    className={({ isActive }) =>
                        `flex min-w-max items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                            isActive ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface'
                        }`
                    }
                >
                    <item.icon size={16} />
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
}
