import api, { getCsrfCookie } from '../lib/api';

export async function login(payload) {
    await getCsrfCookie();

    const { data } = await api.post('/api/auth/login', payload);
    return data;
}

export async function logout() {
    const { data } = await api.post('/api/auth/logout');
    return data;
}

export async function me() {
    const { data } = await api.get('/api/auth/me');
    return data;
}
