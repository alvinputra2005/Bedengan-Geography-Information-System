import {
    ChevronLeft,
    ChevronRight,
    Download,
    Filter,
    PencilLine,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';

const FILTER_OPTIONS = ['Semua', 'Aktif', 'Nonaktif', 'Direkomendasikan', 'Waspada', 'Tidak Direkomendasikan'];

export default function AdminCampingTable({
    grounds,
    isLoading,
    deletingId,
    searchQuery,
    filterLabel,
    currentPage,
    totalPages,
    startItem,
    endItem,
    totalItems,
    onSearchChange,
    onToggleFilter,
    onSelectFilter,
    onExport,
    isFilterMenuOpen,
    onCreate,
    onEdit,
    onDelete,
    onPageChange,
}) {
    return (
        <section className="space-y-6">
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl p-4  sm:flex-row">
                <div className="relative w-full sm:w-72">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-on-surface-variant/60" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Cari area camping..."
                        className="w-full bg-white shadow-sm rounded-lg border-0 py-2 pl-10 pr-4 text-sm text-on-surface focus:ring-2 focus:ring-primary/50"
                    />
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <button
                            type="button"
                            onClick={onToggleFilter}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors shadow-sm hover:bg-surface-variant sm:w-auto"
                        >
                            <Filter size={18} />
                            {filterLabel}
                        </button>

                        {isFilterMenuOpen ? (
                            <div className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-52 rounded-xl border border-outline-variant/10 bg-white p-2 shadow-[0_12px_36px_-14px_rgba(0,0,0,0.18)]">
                                {FILTER_OPTIONS.map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => onSelectFilter(option)}
                                        className={`flex w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                                            filterLabel === option
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <button
                        type="button"
                        onClick={onExport}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors shadow-sm hover:bg-surface-variant sm:flex-none"
                    >
                        <Download size={18} />
                        Export
                    </button>

                    <button
                        type="button"
                        onClick={onCreate}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-container sm:flex-none"
                    >
                        <Plus size={18} />
                        Tambah Data
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap text-left text-sm">
                        <thead className="bg-secondary/30">
                            <tr>
                                <th className="w-16 px-6 py-4 font-headline font-semibold text-on-surface-variant" scope="col">
                                    No
                                </th>
                                <th className="px-6 py-4 font-headline font-semibold text-on-surface-variant" scope="col">
                                    Ground
                                </th>
                                <th className="px-6 py-4 text-right font-headline font-semibold text-on-surface-variant" scope="col">
                                    Jarak Datar
                                </th>
                                <th className="px-6 py-4 text-right font-headline font-semibold text-on-surface-variant" scope="col">
                                    Tebing
                                </th>
                                <th className="px-6 py-4 text-right font-headline font-semibold text-on-surface-variant" scope="col">
                                    Muka Air
                                </th>
                                <th className="w-24 px-6 py-4 text-center font-headline font-semibold text-on-surface-variant" scope="col">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                            {grounds.map((ground, index) => {
                                const itemNumber = startItem + index;
                                const waterLevelTone = ground.baseWaterLevelCm >= 25
                                    ? 'bg-error-container/40 text-on-error-container'
                                    : ground.baseWaterLevelCm >= 16
                                      ? 'bg-secondary-container/20 text-on-secondary-container'
                                      : 'bg-surface-variant text-on-surface-variant';

                                return (
                                    <tr key={ground.id} className="group transition-colors hover:bg-surface-container-low/30">
                                        <td className="px-6 py-4 font-medium text-on-surface-variant">
                                            {String(itemNumber).padStart(2, '0')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-surface-variant">
                                                    <img
                                                        src={ground.image}
                                                        alt={ground.name}
                                                        referrerPolicy="no-referrer"
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-on-surface">{ground.name}</div>
                                                    <div className="mt-0.5 text-xs text-on-surface-variant">
                                                        {ground.isActive ? 'Aktif' : 'Nonaktif'} / {ground.status}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-on-surface-variant">
                                            {ground.displayFlatDistance}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-on-surface-variant">
                                            {ground.displayCliffHeight}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${waterLevelTone}`}>
                                                {ground.baseWaterLevelCm} cm
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2 opacity-100 transition-opacity">
                                                <button
                                                    type="button"
                                                    onClick={() => onEdit(ground)}
                                                    title="Edit"
                                                    className="rounded-md p-1.5 text-on-surface-variant transition-colors hover:bg-primary-container/10 hover:text-primary"
                                                >
                                                    <PencilLine size={18} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => onDelete(ground)}
                                                    disabled={deletingId === ground.id}
                                                    title="Hapus"
                                                    className="rounded-md p-1.5 text-on-surface-variant transition-colors hover:bg-error-container/30 hover:text-error disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {!isLoading && grounds.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-sm font-medium text-on-surface-variant">
                                        Belum ada data camping yang sesuai dengan pencarian atau filter.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-lowest px-6 py-4">
                    <span className="text-sm text-on-surface-variant">
                        {totalItems > 0 ? `Menampilkan ${startItem}-${endItem} dari ${totalItems} data` : 'Tidak ada data'}
                    </span>

                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="p-1 text-on-surface-variant transition-colors hover:text-primary disabled:cursor-not-allowed disabled:text-on-surface-variant/50"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => onPageChange(page)}
                                className={`flex h-7 w-7 items-center justify-center rounded text-sm font-medium transition-colors ${
                                    currentPage === page
                                        ? 'bg-primary-container/10 text-primary'
                                        : 'text-on-surface-variant hover:bg-surface-container-low'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="p-1 text-on-surface-variant transition-colors hover:text-primary disabled:cursor-not-allowed disabled:text-on-surface-variant/50"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
