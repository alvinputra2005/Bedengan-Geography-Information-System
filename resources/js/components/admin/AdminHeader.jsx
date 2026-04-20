import { Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

function getInitials(name) {
    return (name ?? 'Admin')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}

export default function AdminHeader({
    title = 'Kelola Sensor GIS',
    subtitle = 'Monitoring perangkat IoT area Bedengan.',
}) {
    const { user } = useAuth();
    const avatarUrl = user?.photo_url?.trim();

    return (
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>   
                <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">{title}</h1>
                <p className="mt-1 text-sm text-on-surface-variant">{subtitle}</p>
            </div>

            <div className="flex items-center gap-4 self-start md:self-auto">
                {/* <button
                    type="button"
                    className="relative rounded-full bg-surface-container p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
                >
                    <Bell size={20} />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-surface bg-error"></span>
                </button> */}

                <div className="flex items-center gap-3 border-l border-outline-variant/20 pl-4">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={user?.name || 'Admin Bedengan'}
                            className="h-9 w-9 rounded-full border border-outline-variant/20 object-cover"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant/20 bg-surface-container text-xs font-bold text-on-surface-variant">
                            {getInitials(user?.name)}
                        </div>
                    )}
                    <div className="hidden sm:block">
                        <p className="text-sm font-bold leading-none text-on-surface">{user?.name || 'Admin Bedengan'}</p>
                        <p className="mt-0.5 text-xs text-on-surface-variant">Administrator Sistem</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
