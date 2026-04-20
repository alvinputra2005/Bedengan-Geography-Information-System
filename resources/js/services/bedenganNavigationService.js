import api from '../lib/api';

export async function fetchActiveBedengan() {
    const { data } = await api.get('/api/bedengans');
    return data?.data?.[0] ?? null;
}

export async function fetchBedengans() {
    const { data } = await api.get('/api/bedengans');
    return data;
}

export async function fetchBedengan(id) {
    const { data } = await api.get(`/api/bedengans/${id}`);
    return data;
}

export async function fetchRoute(params) {
    const { data } = await api.get('/api/route', { params });
    return data;
}
