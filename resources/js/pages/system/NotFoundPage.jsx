import { Link } from 'react-router-dom';
import { centeredPageShellClassName } from '../../components/layout/pageSpacing';

export default function NotFoundPage() {
    return (
        <main className={centeredPageShellClassName}>
            <div className="max-w-lg rounded-[2rem] border border-black/5 bg-white p-8 text-center shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary mb-4">404</p>
                <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-4">Halaman tidak ditemukan</h1>
                <p className="text-on-surface-variant font-medium leading-relaxed mb-8">
                    Route React sudah aktif, tetapi URL yang kamu buka belum punya halaman yang terdaftar.
                </p>
                <Link to="/" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-white">
                    Kembali ke beranda
                </Link>
            </div>
        </main>
    );
}
