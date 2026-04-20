export default function AdminCampingStatCard({ icon: Icon, label, value, tone = 'primary' }) {
    const toneClasses = {
        primary: 'bg-primary/10 text-primary',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-rose-100 text-rose-700',
    };

    return (
        <article className="rounded-[24px] border border-outline-variant/20 bg-white/85 p-5 shadow-xs">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses[tone] ?? toneClasses.primary}`}>
                <Icon size={20} />
            </div>
            <p className="mt-4 text-sm font-medium text-on-surface-variant">{label}</p>
            <p className="mt-1 font-headline text-3xl font-extrabold tracking-tight text-on-surface">{value}</p>
        </article>
    );
}
