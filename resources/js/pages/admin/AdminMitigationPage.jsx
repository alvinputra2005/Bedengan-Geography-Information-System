import { useEffect, useState } from 'react';
import AdminMitigationEmptyState from '../../components/admin/mitigation/AdminMitigationEmptyState';
import AdminMitigationHero from '../../components/admin/mitigation/AdminMitigationHero';
import AdminMitigationSummaryGrid from '../../components/admin/mitigation/AdminMitigationSummaryGrid';
import AdminMitigationTable from '../../components/admin/mitigation/AdminMitigationTable';
import { fetchAdminMitigationReports, updateMitigationReport } from '../../services/mitigationReportService';
import { buildDrafts } from '../../components/admin/mitigation/mitigationReportUi';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminMitigationPage() {
    const [reports, setReports] = useState([]);
    const [summary, setSummary] = useState(null);
    const [drafts, setDrafts] = useState({});
    const [expandedReportId, setExpandedReportId] = useState(null);
    const [error, setError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [savingId, setSavingId] = useState(null);

    async function loadReports() {
        try {
            const response = await fetchAdminMitigationReports();
            const nextReports = response?.data ?? [];

            setReports(nextReports);
            setSummary(response?.summary ?? null);
            setDrafts(buildDrafts(nextReports));
            setExpandedReportId((current) => (
                nextReports.some((report) => report.id === current) ? current : (nextReports[0]?.id ?? null)
            ));
            setError('');
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Gagal memuat laporan mitigasi.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadReports();
    }, []);

    function handleDraftChange(reportId, field, value) {
        setDrafts((current) => ({
            ...current,
            [reportId]: {
                ...(current[reportId] ?? {}),
                [field]: value,
            },
        }));
    }

    async function handleSave(reportId) {
        const draft = drafts[reportId];
        if (!draft) {
            return;
        }

        setSavingId(reportId);
        setSubmitError('');
        setSubmitSuccess('');

        try {
            await updateMitigationReport(reportId, draft);
            await loadReports();
            setSubmitSuccess('Perubahan laporan mitigasi berhasil disimpan.');
        } catch (requestError) {
            setSubmitError(requestError.response?.data?.message || 'Pembaruan laporan mitigasi gagal.');
        } finally {
            setSavingId(null);
        }
    }

    function handleToggleExpanded(reportId) {
        setExpandedReportId((current) => (current === reportId ? null : reportId));
    }

    return (
        <div className="flex min-w-0 flex-1 flex-col gap-6">
            <AdminMitigationHero summary={summary} />

            {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}
            {submitError ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{submitError}</p> : null}
            {submitSuccess ? (
                <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{submitSuccess}</p>
            ) : null}

            <AdminMitigationSummaryGrid summary={summary} />

            {isLoading ? (
                <p className="text-sm font-semibold text-on-surface-variant">Memuat laporan mitigasi...</p>
            ) : null}

            {!isLoading && reports.length === 0 ? <AdminMitigationEmptyState /> : null}

            {!isLoading && reports.length > 0 ? (
                <AdminMitigationTable
                    reports={reports}
                    summary={summary}
                    drafts={drafts}
                    expandedReportId={expandedReportId}
                    savingId={savingId}
                    onToggleExpanded={handleToggleExpanded}
                    onDraftChange={handleDraftChange}
                    onSave={handleSave}
                />
            ) : null}
        </div>
    );
}
