import { Save } from 'lucide-react';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from './mitigationReportUi';

export default function AdminMitigationDetailActionPanel({
    draft,
    isSaving,
    onDraftChange,
    onSave,
}) {
    return (
        <aside className="rounded-xl bg-white p-6 shadow-[0_18px_40px_-34px_rgba(19,27,46,0.45)] lg:sticky lg:top-24">
            <h3 className="mb-6 flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                <Save size={18} />
                Tindakan Admin
            </h3>

            <form
                className="flex flex-col gap-5"
                onSubmit={(event) => {
                    event.preventDefault();
                    onSave();
                }}
            >
                <div>
                    <label className="mb-2 block text-xs font-semibold text-on-surface">Status Penanganan</label>
                    <select
                        value={draft.status}
                        onChange={(event) => onDraftChange('status', event.target.value)}
                        className="w-full cursor-pointer rounded-lg border-none bg-surface-container-high px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
                    >
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-xs font-semibold text-on-surface">Tingkat Prioritas</label>
                    <select
                        value={draft.priority}
                        onChange={(event) => onDraftChange('priority', event.target.value)}
                        className="w-full cursor-pointer rounded-lg border-none bg-surface-container-high px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-error"
                    >
                        {PRIORITY_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-xs font-semibold text-on-surface">Catatan Admin</label>
                    <textarea
                        value={draft.adminNotes}
                        onChange={(event) => onDraftChange('adminNotes', event.target.value)}
                        placeholder="Tambahkan catatan internal terkait penanganan..."
                        className="h-32 w-full resize-none rounded-lg border-none bg-surface-container-high p-4 text-sm focus:ring-2 focus:ring-primary"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSaving}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-4 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    <Save size={18} />
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </form>
        </aside>
    );
}
