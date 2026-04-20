import { useEffect, useMemo, useState } from 'react';
import { Droplets, Mountain, ShieldAlert, Trees } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminCampingFormModal from '../../components/admin/AdminCampingFormModal';
import AdminCampingStatCard from '../../components/admin/AdminCampingStatCard';
import AdminCampingTable from '../../components/admin/AdminCampingTable';
import {
    createCampingGround,
    deleteCampingGround,
    fetchAdminCampingGrounds,
    updateCampingGround,
} from '../../services/campingGroundService';
import { FALLBACK_WATER_LEVEL_CM, computeGroundMetrics } from '../../utils/campingGrounds';

const DEFAULT_FORM = {
    name: '',
    slug: '',
    imageUrl: '',
    flatDistanceM: '0',
    cliffHeightM: '0',
    baseWaterLevelCm: '0',
    sortOrder: '0',
    isActive: true,
};

const ITEMS_PER_PAGE = 6;
const ADMIN_CAMPING_STORAGE_KEY = 'bedengan.admin.camping.payload';
const ADMIN_CAMPING_STORAGE_TTL_MS = 60_000;

function readStoredGrounds() {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const rawValue = window.localStorage.getItem(ADMIN_CAMPING_STORAGE_KEY);

        if (!rawValue) {
            return null;
        }

        const parsedValue = JSON.parse(rawValue);
        const cachedAt = Number(parsedValue?.cachedAt ?? 0);

        if (!cachedAt || Date.now() - cachedAt > ADMIN_CAMPING_STORAGE_TTL_MS) {
            window.localStorage.removeItem(ADMIN_CAMPING_STORAGE_KEY);
            return null;
        }

        return Array.isArray(parsedValue.payload) ? parsedValue.payload : null;
    } catch (error) {
        window.localStorage.removeItem(ADMIN_CAMPING_STORAGE_KEY);
        return null;
    }
}

function writeStoredGrounds(payload) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(
        ADMIN_CAMPING_STORAGE_KEY,
        JSON.stringify({
            cachedAt: Date.now(),
            payload,
        })
    );
}

function mapGroundToForm(ground) {
    return {
        name: ground.name ?? '',
        slug: ground.slug ?? '',
        imageUrl: ground.image ?? '',
        flatDistanceM: String(ground.flatDistanceM ?? 0),
        cliffHeightM: String(ground.cliffHeightM ?? 0),
        baseWaterLevelCm: String(ground.baseWaterLevelCm ?? 0),
        sortOrder: String(ground.sortOrder ?? 0),
        isActive: Boolean(ground.isActive),
    };
}

export default function AdminCampingPage() {
    const [grounds, setGrounds] = useState(() => readStoredGrounds() ?? []);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(() => readStoredGrounds() === null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterLabel, setFilterLabel] = useState('Semua');
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [liveWaterLevelCm, setLiveWaterLevelCm] = useState(FALLBACK_WATER_LEVEL_CM);
    const [form, setForm] = useState(DEFAULT_FORM);

    async function loadGrounds() {
        try {
            const nextGrounds = await fetchAdminCampingGrounds();
            setGrounds(nextGrounds);
            writeStoredGrounds(nextGrounds);
            setError('');
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Gagal memuat data camping.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadGrounds();
    }, []);

    useEffect(() => {
        let timeoutId = null;
        let idleId = null;
        let unsubscribeLatest = () => {};
        let isCancelled = false;

        async function subscribeRealtime() {
            try {
                const monitoringService = await import('../../services/monitoringService');

                if (isCancelled) {
                    return;
                }

                unsubscribeLatest = monitoringService.subscribeToLatestSensor(
                    (data) => {
                        const nextLevel = Number(data?.jarakCm ?? 0);
                        if (Number.isFinite(nextLevel) && nextLevel > 0) {
                            setLiveWaterLevelCm(nextLevel);
                        }
                    },
                    () => {}
                );
            } catch (error) {
                // Biarkan stat card tetap memakai fallback water level.
            }
        }

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(subscribeRealtime, { timeout: 1500 });
        } else {
            timeoutId = window.setTimeout(subscribeRealtime, 250);
        }

        return () => {
            isCancelled = true;

            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }

            if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
                window.cancelIdleCallback(idleId);
            }

            unsubscribeLatest();
        };
    }, []);

    const calculatedGrounds = useMemo(
        () => grounds.map((ground) => computeGroundMetrics(ground, liveWaterLevelCm)),
        [grounds, liveWaterLevelCm]
    );

    const filteredGrounds = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return calculatedGrounds.filter((ground) => {
            const matchesSearch =
                normalizedQuery === '' ||
                ground.name.toLowerCase().includes(normalizedQuery) ||
                ground.slug.toLowerCase().includes(normalizedQuery);

            if (!matchesSearch) {
                return false;
            }

            if (filterLabel === 'Semua') {
                return true;
            }

            if (filterLabel === 'Aktif') {
                return ground.isActive;
            }

            if (filterLabel === 'Nonaktif') {
                return !ground.isActive;
            }

            return ground.status === filterLabel;
        });
    }, [calculatedGrounds, filterLabel, searchQuery]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterLabel, calculatedGrounds.length]);

    const summary = useMemo(() => {
        const activeCount = calculatedGrounds.filter((ground) => ground.isActive).length;
        const warningCount = calculatedGrounds.filter(
            (ground) => ground.isActive && ground.status === 'Waspada'
        ).length;

        return {
            total: calculatedGrounds.length,
            activeCount,
            inactiveCount: calculatedGrounds.length - activeCount,
            warningCount,
        };
    }, [calculatedGrounds]);

    const totalItems = filteredGrounds.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    const paginatedGrounds = filteredGrounds.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const startItem = totalItems === 0 ? 0 : startIndex + 1;
    const endItem = totalItems === 0 ? 0 : Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

    function resetForm() {
        setForm(DEFAULT_FORM);
        setFormErrors({});
        setSubmitError('');
        setEditingId(null);
    }

    function closeFormModal() {
        setIsFormModalOpen(false);
        resetForm();
    }

    function handleCreate() {
        resetForm();
        setSubmitSuccess('');
        setIsFormModalOpen(true);
    }

    function handleToggleFilter() {
        setIsFilterMenuOpen((current) => !current);
    }

    function handleSelectFilter(nextFilter) {
        setFilterLabel(nextFilter);
        setIsFilterMenuOpen(false);
    }

    function handleInputChange(event) {
        const { name, value, type, checked } = event.target;
        setForm((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    function handleEdit(ground) {
        setEditingId(ground.id);
        setForm(mapGroundToForm(ground));
        setFormErrors({});
        setSubmitError('');
        setSubmitSuccess('');
        setIsFormModalOpen(true);
    }

    function handleExport() {
        const rows = filteredGrounds.map((ground, index) => [
            index + 1,
            ground.name,
            ground.slug,
            ground.isActive ? 'Aktif' : 'Nonaktif',
            ground.displayFlatDistance,
            ground.displayCliffHeight,
            `${ground.baseWaterLevelCm} cm`,
            ground.status,
            ground.sortOrder,
        ]);

        const csvContent = [
            ['No', 'Ground', 'Slug', 'Status Data', 'Jarak Datar', 'Tebing', 'Muka Air', 'Rekomendasi', 'Urutan'],
            ...rows,
        ]
            .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data-camping.csv';
        link.click();
        URL.revokeObjectURL(url);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess('');
        setFormErrors({});

        try {
            if (editingId) {
                await updateCampingGround(editingId, form);
                setSubmitSuccess('Data camping berhasil diperbarui.');
            } else {
                await createCampingGround(form);
                setSubmitSuccess('Data camping berhasil ditambahkan.');
            }

            await loadGrounds();
            closeFormModal();
        } catch (requestError) {
            const nextErrors = requestError.response?.status === 422 ? requestError.response?.data?.errors ?? {} : {};
            setFormErrors(nextErrors);
            setSubmitError(requestError.response?.data?.message || 'Proses penyimpanan data camping gagal.');
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(ground) {
        const confirmed = window.confirm(`Hapus ${ground.name}? Tindakan ini tidak bisa dibatalkan.`);
        if (!confirmed) {
            return;
        }

        setDeletingId(ground.id);
        setSubmitError('');
        setSubmitSuccess('');

        try {
            await deleteCampingGround(ground.id);
            if (editingId === ground.id) {
                closeFormModal();
            }
            await loadGrounds();
            setSubmitSuccess('Data camping berhasil dihapus.');
        } catch (requestError) {
            setSubmitError(requestError.response?.data?.message || 'Penghapusan data camping gagal.');
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="flex min-w-0 flex-1 flex-col">
            <AdminHeader
                title="Daftar Area Camping"
                subtitle="Kelola data area camping Bedengan, termasuk parameter risiko, urutan tampil, dan status aktif."
            />

            {error ? <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p> : null}
            {submitError ? <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{submitError}</p> : null}
            {submitSuccess ? <p className="mb-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{submitSuccess}</p> : null}

            <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
                <AdminCampingStatCard icon={Trees} label="Total Ground" value={summary.total} />
                <AdminCampingStatCard icon={ShieldAlert} label="Ground Aktif" value={summary.activeCount} tone="success" />
                <AdminCampingStatCard icon={Mountain} label="Waspada Aktif" value={summary.warningCount} tone="warning" />
                <AdminCampingStatCard icon={Droplets} label="Air Saat Ini" value={`${liveWaterLevelCm} cm`} tone="danger" />
                <AdminCampingStatCard icon={Trees} label="Ground Nonaktif" value={summary.inactiveCount} tone="primary" />
            </div>

            <AdminCampingTable
                grounds={paginatedGrounds}
                isLoading={isLoading}
                deletingId={deletingId}
                searchQuery={searchQuery}
                filterLabel={filterLabel}
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                startItem={startItem}
                endItem={endItem}
                totalItems={totalItems}
                onSearchChange={setSearchQuery}
                onToggleFilter={handleToggleFilter}
                onSelectFilter={handleSelectFilter}
                onExport={handleExport}
                isFilterMenuOpen={isFilterMenuOpen}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPageChange={setCurrentPage}
            />

            <AdminCampingFormModal
                isOpen={isFormModalOpen}
                editingId={editingId}
                form={form}
                formErrors={formErrors}
                isSubmitting={isSubmitting}
                onClose={closeFormModal}
                onReset={resetForm}
                onSubmit={handleSubmit}
                onInputChange={handleInputChange}
            />
        </div>
    );
}
