import { BadgeCheck, BellRing, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const preferenceItems = [
    {
        title: 'Notifikasi Perubahan Sensor',
        description: 'Terima update saat ada perubahan status perangkat monitoring.',
        icon: BellRing,
    },
    {
        title: 'Akses Peta dan Mitigasi',
        description: 'Akun ini sudah bisa membuka halaman peta interaktif dan panduan mitigasi.',
        icon: ShieldCheck,
    },
    {
        title: 'Profil Pengunjung',
        description: 'Gunakan halaman ini untuk menampilkan data pribadi dan histori akses internal.',
        icon: BadgeCheck,
    },
];

export default function AccountPage() {
    const { user, role } = useAuth();

    return (
        <section className="space-y-8">
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Halaman Personal</p>
                <h1 className="mt-3 font-headline text-4xl font-extrabold text-on-surface">Akun Saya</h1>
                <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-on-surface-variant">
                    Area personal untuk ringkasan identitas, akses role, dan pengaturan akun pengguna Bedengan GIS.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <article className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center">
                        <img
                            src={user?.photo_url || '/images/Foto-Icon-Bedengan.jpeg'}
                            alt={user?.name || 'Foto pengguna'}
                            className="h-24 w-24 rounded-[1.5rem] object-cover"
                        />
                        <div>
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                Role: {role}
                            </span>
                            <h2 className="mt-4 font-headline text-2xl font-extrabold text-on-surface">{user?.name}</h2>
                            <div className="mt-4 space-y-2 text-sm font-medium text-on-surface-variant">
                                <p className="flex items-center gap-2">
                                    <Mail size={16} className="text-primary" />
                                    {user?.email}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone size={16} className="text-primary" />
                                    {user?.phone || 'Belum diisi'}
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="rounded-[2rem] border border-black/5 bg-surface-container-low p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Status Akses</p>
                    <h3 className="mt-3 font-headline text-2xl font-bold text-on-surface">RBAC Aktif</h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-on-surface-variant">
                        Guest hanya melihat beranda. Akun user mendapatkan akses private ke monitoring, peta, mitigasi, dan halaman personal.
                    </p>
                </article>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                {preferenceItems.map((item) => (
                    <article key={item.title} className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm">
                        <item.icon className="mb-4 text-primary" size={24} />
                        <h3 className="font-headline text-lg font-bold text-on-surface">{item.title}</h3>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-on-surface-variant">{item.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
