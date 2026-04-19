function getStatusClasses(status) {
    const normalizedStatus = (status || '').toUpperCase();

    if (normalizedStatus === 'BAHAYA' || normalizedStatus === 'GANGGUAN') {
        return 'bg-error-container text-on-error-container';
    }

    if (normalizedStatus === 'WASPADA' || normalizedStatus === 'PERAWATAN') {
        return 'bg-amber-100 text-amber-700';
    }

    if (normalizedStatus === 'OFFLINE') {
        return 'bg-outline-variant/30 text-on-surface-variant';
    }

    return 'bg-secondary-container/20 text-primary';
}

export default function AdminSensorTable({ sensors = [] }) {
    return (
        <section className="flex h-full flex-col rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5">
            <div className="mb-5">
                <h2 className="font-headline text-lg font-bold text-on-surface">Data Hasil Monitoring Sensor</h2>
                <p className="mt-1 text-sm text-on-surface-variant">
                    Ringkasan pembacaan terakhir dari sensor yang aktif dipantau.
                </p>
            </div>

            <div className="flex-1 overflow-x-auto">
                {sensors.length === 0 ? (
                    <div className="flex h-full min-h-52 items-center justify-center rounded-2xl border border-dashed border-outline-variant/20 bg-surface px-6 text-center text-sm font-medium text-on-surface-variant">
                        Belum ada data sensor yang bisa ditampilkan.
                    </div>
                ) : (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-outline-variant/15 text-xs uppercase tracking-wider text-on-surface-variant">
                                <th className="pb-3 font-medium">ID Sensor</th>
                                <th className="pb-3 font-medium">Lokasi / Zona</th>
                                <th className="pb-3 font-medium">Pembacaan</th>
                                <th className="pb-3 font-medium">Status</th>
                                <th className="pb-3 font-medium">Update</th>
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
                                    <td className="py-4 font-semibold text-on-surface">{sensor.latest_value}</td>
                                    <td className="py-4">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${getStatusClasses(sensor.status)}`}>
                                            {sensor.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-on-surface-variant">{sensor.last_update}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    );
}
