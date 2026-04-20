import api from '../lib/api';
import { normalizeCampingGround } from '../utils/campingGrounds';

export async function fetchCampingGrounds() {
    const { data } = await api.get('/api/camping-grounds');
    return (data?.data ?? []).map(normalizeCampingGround);
}
