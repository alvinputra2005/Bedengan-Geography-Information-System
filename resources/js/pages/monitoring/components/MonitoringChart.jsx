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

const data = [
    { time: '12:00', value: 1.1 },
    { time: '14:00', value: 1.05 },
    { time: '16:00', value: 1.2 },
    { time: '18:00', value: 1.3 },
    { time: '20:00', value: 1.0 },
    { time: '22:00', value: 1.15 },
    { time: '00:00', value: 1.12 },
    { time: '02:00', value: 1.35 },
    { time: '04:00', value: 1.2 },
    { time: '06:00', value: 1.45 },
    { time: '08:00', value: 1.35 },
    { time: 'Sekarang', value: 1.55 },
];

export default function MonitoringChart() {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_4px_40px_rgba(19,27,46,0.06)]"
        >
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="font-headline text-xl font-bold text-on-surface">Riwayat Muka Air 24 Jam</h2>

                <div className="flex w-fit gap-1 rounded-full bg-surface-container-low p-1">
                    <button className="rounded-full bg-white px-4 py-1 text-xs font-bold text-primary shadow-sm transition-all">
                        24h
                    </button>
                    <button className="px-4 py-1 text-xs font-bold text-on-surface/40 transition-all hover:text-on-surface">
                        7d
                    </button>
                    <button className="px-4 py-1 text-xs font-bold text-on-surface/40 transition-all hover:text-on-surface">
                        30d
                    </button>
                </div>
            </div>

            <div className="h-[350px] w-full">
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
            </div>
        </motion.section>
    );
}
