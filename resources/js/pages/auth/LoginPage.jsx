import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getDefaultPrivateRoute } from '../../utils/auth';

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn } = useAuth();
    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: true,
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await signIn(form);
            const destination = location.state?.from?.pathname || getDefaultPrivateRoute(response.user);
            navigate(destination, { replace: true });
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.response?.data?.errors?.email?.[0] || 'Login gagal.');
        } finally {
            setIsSubmitting(false);
        }
    }

    function updateField(event) {
        const { name, value, type, checked } = event.target;

        setForm((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    return (
        <main className="min-h-screen px-6 md:px-12 pt-32 pb-16 flex items-center justify-center">
            <div className="w-full max-w-md rounded-[2rem] border border-black/5 bg-white p-8 shadow-xl shadow-black/5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary mb-4">Autentikasi</p>
                <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-3">Login</h1>
                <p className="text-sm text-on-surface-variant font-medium mb-8">
                    Gunakan session login Laravel agar React dan backend tetap sinkron di satu domain.
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-on-surface">Email</span>
                        <input
                            className="w-full rounded-2xl border border-black/10 bg-surface-container-lowest px-4 py-3 outline-none focus:border-primary"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={updateField}
                            placeholder="admin@bedengan.test"
                            autoComplete="email"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-on-surface">Password</span>
                        <input
                            className="w-full rounded-2xl border border-black/10 bg-surface-container-lowest px-4 py-3 outline-none focus:border-primary"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={updateField}
                            placeholder="Masukkan password"
                            autoComplete="current-password"
                            required
                        />
                    </label>

                    <label className="flex items-center gap-3 text-sm font-medium text-on-surface-variant">
                        <input type="checkbox" name="remember" checked={form.remember} onChange={updateField} />
                        Ingat saya
                    </label>

                    {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? 'Memproses...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <Link to="/register" className="inline-flex text-sm font-semibold text-primary hover:underline">
                        Belum punya akun? Sign Up
                    </Link>
                    <Link to="/" className="inline-flex text-sm font-semibold text-on-surface-variant hover:text-primary">
                        Kembali ke beranda
                    </Link>
                </div>
            </div>
        </main>
    );
}
