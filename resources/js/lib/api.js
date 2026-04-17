import axios from 'axios';

const api = axios.create({
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
});

export async function getCsrfCookie() {
    await api.get('/sanctum/csrf-cookie');
}

export default api;
