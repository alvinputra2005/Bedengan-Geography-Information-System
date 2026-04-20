import { CalendarClock, MapPin, ShieldCheck, UserRound } from 'lucide-react';
import { formatDateTime } from './mitigationReportUi';

function InfoItem({ icon: Icon, label, value }) {
    return (
        <div>
            <span className="mb-1 block text-xs text-outline">{label}</span>
            <div className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                <Icon size={18} className="text-primary" />
                <span>{value}</span>
            </div>
        </div>
    );
}

export default function AdminMitigationDetailInfoCard({ report }) {
    return (
        <section className="relative overflow-hidden rounded-xl bg-white p-6 shadow-[0_18px_40px_-34px_rgba(19,27,46,0.45)]">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-primary/5"></div>
            <h3 className="mb-4 font-headline text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                Informasi Laporan
            </h3>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <InfoItem icon={UserRound} label="Pelapor" value={report.reporter_name} />
                <InfoItem icon={MapPin} label="Lokasi" value={report.incident_location} />
                <InfoItem icon={CalendarClock} label="Dilaporkan" value={formatDateTime(report.reported_at)} />
                <InfoItem icon={CalendarClock} label="Review Terakhir" value={formatDateTime(report.reviewed_at)} />
                <div className="sm:col-span-2">
                    <InfoItem
                        icon={ShieldCheck}
                        label="Ditinjau oleh"
                        value={report.reviewer?.name || 'Belum ada admin yang meninjau'}
                    />
                </div>
            </div>
        </section>
    );
}
