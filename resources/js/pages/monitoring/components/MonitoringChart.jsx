import { motion } from 'motion/react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function formatChartData(history) {
    return history.map((item, index) => ({
        time: new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(item.timestamp)),
        value: item.jarakCm,
        status: item.status,
        label: index === history.length - 1 ? 'Terbaru' : `Data ${index + 1}`,
    }));
}

export default function MonitoringChart({ history }) {
    const data = formatChartData(history);

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_4px_40px_rgba(19,27,46,0.06)]"
        >
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="font-headline text-xl font-bold text-on-surface">Riwayat Pembacaan Sensor</h2>
                    <p className="mt-2 text-sm font-medium text-on-surface-variant">
                        Grafik ini menampilkan histori `sensor/history` yang sudah diurutkan berdasarkan timestamp.
                    </p>
                </div>

                <span className="rounded-full bg-surface-container-low px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-on-surface/60">
                    {data.length} data
                </span>
            </div>

            <div className="h-[350px] w-full">
                {data.length === 0 ? (
                    <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-black/10 bg-surface-container-lowest px-6 text-center text-sm font-medium text-on-surface-variant">
                        Belum ada riwayat sensor di Firebase pada path `sensor/history`.
                    </div>
                ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0037b0" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#0037b0" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e7ff" />
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(19,27,46,0.4)', fontSize: 10, fontWeight: 600 }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(19,27,46,0.4)', fontSize: 10, fontWeight: 600 }}
                            domain={[0, 4]}
                            ticks={[0, 1, 2, 3, 4]}
                            tickFormatter={(value) => `${value}m`}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                fontFamily: 'Manrope, sans-serif',
                            }}
                            labelStyle={{ fontWeight: 700, marginBottom: '4px' }}
                            formatter={(value, _name, item) => [`${value} cm`, item?.payload?.status ?? '-']}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#0037b0"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            dot={{ r: 4, fill: '#0037b0', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, fill: '#0037b0', strokeWidth: 2, stroke: '#fff' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
                )}
            </div>
        </motion.section>
    );
}
