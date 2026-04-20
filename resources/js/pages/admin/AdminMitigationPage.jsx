import { useEffect, useState } from 'react';
import AdminMitigationEmptyState from '../../components/admin/mitigation/AdminMitigationEmptyState';
import AdminMitigationHero from '../../components/admin/mitigation/AdminMitigationHero';
import AdminMitigationSummaryGrid from '../../components/admin/mitigation/AdminMitigationSummaryGrid';
import AdminMitigationTable from '../../components/admin/mitigation/AdminMitigationTable';
import { fetchAdminMitigationReports } from '../../services/mitigationReportService';

export default function AdminMitigationPage() {
    const [reports, setReports] = useState([]);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    async function loadReports() {
        try {
            const response = await fetchAdminMitigationReports();
            const nextReports = response?.data ?? [];

            setReports(nextReports);
            setSummary(response?.summary ?? null);
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

    return (
        <div className="flex min-w-0 flex-1 flex-col gap-6">
            <AdminMitigationHero summary={summary} />

            {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}

            <AdminMitigationSummaryGrid summary={summary} />

            {isLoading ? (
                <p className="text-sm font-semibold text-on-surface-variant">Memuat laporan mitigasi...</p>
            ) : null}

            {!isLoading && reports.length === 0 ? <AdminMitigationEmptyState /> : null}

            {!isLoading && reports.length > 0 ? (
                <AdminMitigationTable reports={reports} />
            ) : null}
        </div>
    );
}
