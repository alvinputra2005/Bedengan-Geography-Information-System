import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getDefaultPrivateRoute } from '../../utils/auth';

export default function RegisterPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { signUp } = useAuth();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await signUp(form);
            const destination = location.state?.from?.pathname || getDefaultPrivateRoute(response.user);
            navigate(destination, { replace: true });
        } catch (requestError) {
            const fallbackError = requestError.response?.data?.message || 'Pendaftaran gagal.';
            const validationErrors = requestError.response?.data?.errors;
            const firstValidationError = validationErrors ? Object.values(validationErrors)[0]?.[0] : null;
            setError(firstValidationError || fallbackError);
        } finally {
            setIsSubmitting(false);
        }
    }

    function updateField(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
            <div className="w-full max-w-xl rounded-[2rem] border border-black/5 bg-white p-8 shadow-xl shadow-black/5">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">Pendaftaran Akun</p>
                <h1 className="mb-3 font-headline text-4xl font-extrabold text-on-surface">Sign Up</h1>
                <p className="mb-8 text-sm font-medium text-on-surface-variant">
                    Buat akun pengguna untuk mengakses monitoring, peta, mitigasi, dan halaman personal.
                </p>

                <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
                    <label className="block md:col-span-2">
                        <span className="mb-2 block text-sm font-semibold text-on-surface">Nama Lengkap</span>
                        <input
                            className="w-full rounded-2xl border border-black/10 bg-surface-container-lowest px-4 py-3 outline-none focus:border-primary"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={updateField}
                            placeholder="Nama pengguna"
                            autoComplete="name"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-on-surface">Email</span>
                        <input
                            className="w-full rounded-2xl border border-black/10 bg-surface-container-lowest px-4 py-3 outline-none focus:border-primary"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={updateField}
                            placeholder="user@bedengan.test"
                            autoComplete="email"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-on-surface">No. Telepon</span>
                        <input
                            className="w-full rounded-2xl border border-black/10 bg-surface-container-lowest px-4 py-3 outline-none focus:border-primary"
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={updateField}
                            placeholder="08xxxxxxxxxx"
                            autoComplete="tel"
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
                            placeholder="Minimal 8 karakter"
                            autoComplete="new-password"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-on-surface">Konfirmasi Password</span>
                        <input
                            className="w-full rounded-2xl border border-black/10 bg-surface-container-lowest px-4 py-3 outline-none focus:border-primary"
                            type="password"
                            name="password_confirmation"
                            value={form.password_confirmation}
                            onChange={updateField}
                            placeholder="Ulangi password"
                            autoComplete="new-password"
                            required
                        />
                    </label>

                    {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 md:col-span-2">{error}</p> : null}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
                    >
                        {isSubmitting ? 'Membuat akun...' : 'Buat Akun'}
                    </button>
                </form>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <Link to="/login" className="text-sm font-semibold text-primary hover:underline">
                        Sudah punya akun? Login
                    </Link>
                    <Link to="/" className="text-sm font-semibold text-on-surface-variant hover:text-primary">
                        Kembali ke beranda
                    </Link>
                </div>
            </div>
        </main>
    );
}
