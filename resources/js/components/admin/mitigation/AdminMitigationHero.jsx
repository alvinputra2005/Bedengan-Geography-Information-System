import AdminHeader from '../../admin/AdminHeader';

export default function AdminMitigationHero({ summary }) {
    return (
        <section className="mb-2">
            <AdminHeader
                title="Laporan Mitigasi"
                subtitle="Tinjau laporan insiden dari halaman mitigasi, atur prioritas, dan dokumentasikan tindak lanjut lapangan."
            />
        </section>
    );
}
