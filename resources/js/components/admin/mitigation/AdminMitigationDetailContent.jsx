import { Image as ImageIcon } from 'lucide-react';

export default function AdminMitigationDetailContent({ report }) {
    return (
        <div className="flex flex-col gap-6">
            <section className="overflow-hidden rounded-xl bg-white p-2 shadow-[0_18px_40px_-34px_rgba(19,27,46,0.45)]">
                {report.photo_url ? (
                    <img
                        src={report.photo_url}
                        alt={`Lampiran ${report.report_code}`}
                        className="h-64 w-full rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-outline-variant/20 bg-surface-container-low px-6 text-center">
                        <div>
                            <ImageIcon className="mx-auto text-on-surface/35" size={28} />
                            <p className="mt-3 text-sm font-semibold text-on-surface">Tidak ada lampiran foto</p>
                            <p className="mt-1 text-xs text-on-surface-variant">
                                Laporan ini dikirim tanpa dokumentasi visual.
                            </p>
                        </div>
                    </div>
                )}
            </section>

            <section className="rounded-xl bg-surface-container-low p-6">
                <h3 className="mb-3 font-headline text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                    Deskripsi Insiden
                </h3>
                <p className="text-sm leading-relaxed text-on-surface">{report.description}</p>
            </section>
        </div>
    );
}
