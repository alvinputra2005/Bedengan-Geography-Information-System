import { useEffect } from 'react';
import { PencilLine, Plus, X } from 'lucide-react';
import AdminCampingInputField from './AdminCampingInputField';

export default function AdminCampingFormModal({
    isOpen,
    editingId,
    form,
    formErrors,
    isSubmitting,
    onClose,
    onReset,
    onSubmit,
    onInputChange,
}) {
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        function handleEscape(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 px-4 py-6">
            <div
                className="absolute inset-0"
                onClick={onClose}
                aria-hidden="true"
            />

            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-camping-modal-title"
                className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[30px] border border-outline-variant/15 bg-white shadow-[0_40px_120px_-40px_rgba(19,27,46,0.45)]"
            >
                <div className="flex items-start justify-between gap-4 border-b border-outline-variant/15 px-6 py-5">
                    <div>
                        <h2 id="admin-camping-modal-title" className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
                            {editingId ? 'Edit Data Camping' : 'Tambah Data Camping'}
                        </h2>
                        <p className="mt-1 text-sm text-on-surface-variant">
                            Field `slug` opsional. Jika dikosongkan, sistem akan membentuk slug otomatis dari nama ground.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-outline-variant/20 bg-surface-container-low text-on-surface transition-colors hover:bg-surface-container"
                        aria-label="Tutup modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-6 py-6">
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <AdminCampingInputField
                                label="Nama Ground"
                                name="name"
                                value={form.name}
                                onChange={onInputChange}
                                placeholder="Ground A"
                                error={formErrors.name?.[0]}
                            />
                            <AdminCampingInputField
                                label="Slug"
                                name="slug"
                                value={form.slug}
                                onChange={onInputChange}
                                placeholder="ground-a"
                                error={formErrors.slug?.[0]}
                            />
                            <AdminCampingInputField
                                label="URL Gambar"
                                name="imageUrl"
                                value={form.imageUrl}
                                onChange={onInputChange}
                                placeholder="https://..."
                                error={formErrors.image_url?.[0]}
                            />
                            <AdminCampingInputField
                                label="Urutan Tampil"
                                name="sortOrder"
                                type="number"
                                value={form.sortOrder}
                                onChange={onInputChange}
                                error={formErrors.sort_order?.[0]}
                            />
                            <AdminCampingInputField
                                label="Jarak Datar (m)"
                                name="flatDistanceM"
                                type="number"
                                step="0.01"
                                value={form.flatDistanceM}
                                onChange={onInputChange}
                                error={formErrors.flat_distance_m?.[0]}
                            />
                            <AdminCampingInputField
                                label="Ketinggian Tebing (m)"
                                name="cliffHeightM"
                                type="number"
                                step="0.01"
                                value={form.cliffHeightM}
                                onChange={onInputChange}
                                error={formErrors.cliff_height_m?.[0]}
                            />
                            <AdminCampingInputField
                                label="Muka Air Dasar (cm)"
                                name="baseWaterLevelCm"
                                type="number"
                                value={form.baseWaterLevelCm}
                                onChange={onInputChange}
                                error={formErrors.base_water_level_cm?.[0]}
                            />
                            <label className="flex items-center gap-3 rounded-2xl border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface">
                                <input
                                    name="isActive"
                                    type="checkbox"
                                    checked={form.isActive}
                                    onChange={onInputChange}
                                    className="h-4 w-4 rounded border-outline-variant/40 text-primary focus:ring-primary"
                                />
                                Data aktif dan tampil di halaman publik
                            </label>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {editingId ? <PencilLine size={16} /> : <Plus size={16} />}
                                {isSubmitting ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Data'}
                            </button>
                            <button
                                type="button"
                                onClick={onReset}
                                className="rounded-2xl border border-outline-variant/20 bg-white px-5 py-3 text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-low"
                            >
                                Reset Form
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
