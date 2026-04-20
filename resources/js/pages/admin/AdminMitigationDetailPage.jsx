import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminMitigationDetailActionPanel from '../../components/admin/mitigation/AdminMitigationDetailActionPanel';
import AdminMitigationDetailContent from '../../components/admin/mitigation/AdminMitigationDetailContent';
import AdminMitigationDetailHeader from '../../components/admin/mitigation/AdminMitigationDetailHeader';
import AdminMitigationDetailInfoCard from '../../components/admin/mitigation/AdminMitigationDetailInfoCard';
import { fetchAdminMitigationReport, updateMitigationReport } from '../../services/mitigationReportService';

function buildDraft(report) {
    return {
        status: report.status,
        priority: report.priority,
        adminNotes: report.admin_notes ?? '',
    };
}

export default function AdminMitigationDetailPage() {
    const { reportId } = useParams();
    const [report, setReport] = useState(null);
    const [draft, setDraft] = useState({ status: 'pending', priority: 'medium', adminNotes: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    async function loadReport() {
        try {
            const response = await fetchAdminMitigationReport(reportId);
            const nextReport = response?.data ?? null;

            setReport(nextReport);
            setDraft(nextReport ? buildDraft(nextReport) : { status: 'pending', priority: 'medium', adminNotes: '' });
            setError('');
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Gagal memuat detail laporan mitigasi.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadReport();
    }, [reportId]);

    function handleDraftChange(field, value) {
        setDraft((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function handleSave() {
        if (!report) {
            return;
        }

        setIsSaving(true);
        setSubmitError('');
        setSubmitSuccess('');

        try {
            await updateMitigationReport(report.id, draft);
            await loadReport();
            setSubmitSuccess('Perubahan laporan mitigasi berhasil disimpan.');
        } catch (requestError) {
            setSubmitError(requestError.response?.data?.message || 'Pembaruan laporan mitigasi gagal.');
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return <p className="text-sm font-semibold text-on-surface-variant">Memuat detail laporan mitigasi...</p>;
    }

    if (error) {
        return <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>;
    }

    if (!report) {
        return <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">Laporan tidak ditemukan.</p>;
    }

    return (
        <div className="flex min-w-0 flex-1 flex-col gap-6">
            <AdminMitigationDetailHeader report={report} />

            {submitError ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{submitError}</p> : null}
            {submitSuccess ? (
                <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{submitSuccess}</p>
            ) : null}

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
                <div className="flex flex-col gap-8 lg:col-span-2">
                    <AdminMitigationDetailInfoCard report={report} />
                    <AdminMitigationDetailContent report={report} />
                </div>

                <div className="lg:col-span-1">
                    <AdminMitigationDetailActionPanel
                        draft={draft}
                        isSaving={isSaving}
                        onDraftChange={handleDraftChange}
                        onSave={handleSave}
                    />
                </div>
            </div>
        </div>
    );
}
