import api from '../lib/api';

export async function getHealthStatus() {
    const { data } = await api.get('/api/health');
    return data;
}
