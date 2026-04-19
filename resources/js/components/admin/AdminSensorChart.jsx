import { motion } from 'motion/react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function formatChartData(history) {
    return history.map((item) => ({
        time: new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(item.timestamp)),
        value: Number(item.jarakCm ?? 0),
        status: item.status ?? 'Belum ada data',
    }));
}

function getChartDomain(data) {
    if (data.length === 0) {
        return [0, 10];
    }

    const values = data.map((item) => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = Math.max((max - min) * 0.25, 2);

    return [Math.max(0, Math.floor(min - padding)), Math.ceil(max + padding)];
}

export default function AdminSensorChart({ history = [], sensorName = 'Sensor Sungai Bedengan' }) {
    const data = formatChartData(history);
    const domain = getChartDomain(data);

    return (
        <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5"
        >
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">Grafik Sensor</p>
                    <h2 className="mt-2 font-headline text-xl font-bold text-on-surface">{sensorName}</h2>
                    <p className="mt-1 text-sm text-on-surface-variant">Riwayat pembacaan sensor untuk memantau tren kenaikan.</p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-surface-container-low px-3 py-1 text-xs font-bold text-on-surface-variant">
                    {data.length} titik data
                </span>
            </div>

            <div className="h-[280px] w-full">
                {data.length === 0 ? (
                    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-outline-variant/20 bg-surface px-6 text-center text-sm font-medium text-on-surface-variant">
                        Belum ada histori pembacaan sensor yang bisa ditampilkan.
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                            <defs>
                                <linearGradient id="adminSensorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0b7fab" stopOpacity={0.24} />
                                    <stop offset="95%" stopColor="#0b7fab" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbe3ea" />
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'rgba(19,27,46,0.48)', fontSize: 11, fontWeight: 600 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={domain}
                                tick={{ fill: 'rgba(19,27,46,0.48)', fontSize: 11, fontWeight: 600 }}
                                tickFormatter={(value) => `${value} cm`}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '14px',
                                    border: 'none',
                                    boxShadow: '0 12px 30px rgba(19,27,46,0.12)',
                                    fontFamily: 'Manrope, sans-serif',
                                }}
                                labelStyle={{ fontWeight: 700, marginBottom: '4px' }}
                                formatter={(value, _name, item) => [`${value} cm`, item?.payload?.status ?? '-']}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#0b7fab"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#adminSensorGradient)"
                                dot={{ r: 3, fill: '#0b7fab', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 5, fill: '#0b7fab', strokeWidth: 2, stroke: '#fff' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </motion.section>
    );
}
