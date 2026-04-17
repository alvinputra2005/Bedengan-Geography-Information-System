import api from '../lib/api';

export async function getHealthStatus() {
    const { data } = await api.get('/api/health');
    return data;
}

export async function getDashboardData() {
    const { data } = await api.get('/api/dashboard');
    return data;
}
