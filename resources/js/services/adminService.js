import api from '../lib/api';

export async function getAdminDashboardData() {
    const { data } = await api.get('/api/admin/dashboard');
    return data;
}
