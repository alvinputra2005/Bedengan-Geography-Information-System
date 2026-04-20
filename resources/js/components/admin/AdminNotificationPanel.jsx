import { AlertTriangle, CheckCircle2, Siren, Wind } from 'lucide-react';

const severityConfig = {
    info: {
        icon: Wind,
        badge: 'bg-secondary-container/20 text-primary',
    },
    warning: {
        icon: AlertTriangle,
        badge: 'bg-amber-100 text-amber-700',
    },
    critical: {
        icon: Siren,
        badge: 'bg-error-container text-on-error-container',
    },
};

export default function AdminNotificationPanel({ notifications = [], isLoading = false }) {
    return (
        <section className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="font-headline text-lg font-bold text-on-surface">Alert Operasional</h2>
                    <p className="mt-1 text-sm text-on-surface-variant">Ringkasan alert sensor terbaru dari sistem.</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container/20 px-3 py-1 text-xs font-bold text-primary">
                    <CheckCircle2 size={14} />
                    Tersinkron
                </span>
            </div>

            {isLoading ? (
                <div className="rounded-2xl border border-dashed border-outline-variant/20 bg-surface px-4 py-6 text-center text-sm font-medium text-on-surface-variant">
                    Memuat alert operasional...
                </div>
            ) : notifications.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-outline-variant/20 bg-surface px-4 py-6 text-center text-sm font-medium text-on-surface-variant">
                    Belum ada alert terbaru.
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((item) => {
                        const config = severityConfig[item.severity] ?? severityConfig.info;
                        const Icon = config.icon;

                        return (
                            <article key={item.id} className="rounded-2xl bg-surface-container-low p-4">
                                <div className="mb-3 flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary">
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-on-surface">{item.title}</h3>
                                            <p className="text-xs font-medium text-on-surface-variant">{item.time}</p>
                                        </div>
                                    </div>
                                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${config.badge}`}>
                                        {item.severity}
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed text-on-surface-variant">{item.description}</p>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
