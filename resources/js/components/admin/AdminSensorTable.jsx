import { Edit2, Filter, Search, Trash2 } from 'lucide-react';

export default function AdminSensorTable({ sensors = [] }) {
    return (
        <section className="flex h-full flex-col rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="font-headline text-lg font-bold text-on-surface">Daftar Sensor Spasial</h2>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                        <input
                            type="text"
                            placeholder="Cari ID/Lokasi..."
                            className="w-44 rounded-lg border-none bg-surface-container-high py-2 pl-9 pr-4 text-sm text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                    <button
                        type="button"
                        className="rounded-lg border border-outline-variant/30 p-2 text-on-surface-variant transition-colors hover:bg-surface-container"
                    >
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-outline-variant/15 text-xs uppercase tracking-wider text-on-surface-variant">
                            <th className="pb-3 font-medium">ID Sensor</th>
                            <th className="pb-3 font-medium">Lokasi / Zona</th>
                            <th className="pb-3 font-medium">Tipe</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 text-right font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-on-surface">
                        {sensors.map((sensor) => (
                            <tr
                                key={sensor.id}
                                className={`border-b border-outline-variant/5 transition-colors hover:bg-surface-container-low/50 ${
                                    sensor.status === 'Offline' ? 'opacity-60' : ''
                                }`}
                            >
                                <td className="py-4 font-bold">{sensor.id}</td>
                                <td className="py-4">
                                    <div className="flex flex-col">
                                        <span>{sensor.name}</span>
                                        <span className="mt-0.5 font-mono text-xs text-on-surface-variant">{sensor.coords}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-on-surface-variant">{sensor.type}</td>
                                <td className="py-4">
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                                            sensor.status === 'Aktif'
                                                ? 'bg-secondary-container/20 text-primary'
                                                : sensor.status === 'Peringatan'
                                                  ? 'bg-error-container text-on-error-container'
                                                  : 'bg-outline-variant/30 text-on-surface-variant'
                                        }`}
                                    >
                                        {sensor.status}
                                    </span>
                                </td>
                                <td className="py-4 text-right">
                                    <button type="button" className="p-1 text-outline transition-colors hover:text-primary">
                                        <Edit2 size={18} />
                                    </button>
                                    <button type="button" className="ml-1 p-1 text-outline transition-colors hover:text-error">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
