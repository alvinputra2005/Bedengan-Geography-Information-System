import api from '../lib/api';
import { normalizeCampingGround } from '../utils/campingGrounds';

export async function fetchCampingGrounds() {
    const { data } = await api.get('/api/camping-grounds');
    return (data?.data ?? []).map(normalizeCampingGround);
}

function serializeCampingGroundPayload(payload) {
    return {
        name: payload.name?.trim() ?? '',
        slug: payload.slug?.trim() ?? '',
        image_url: payload.imageUrl?.trim() ?? '',
        flat_distance_m: Number(payload.flatDistanceM ?? 0),
        cliff_height_m: Number(payload.cliffHeightM ?? 0),
        base_water_level_cm: Number(payload.baseWaterLevelCm ?? 0),
        sort_order: Number(payload.sortOrder ?? 0),
        is_active: Boolean(payload.isActive),
    };
}

export async function fetchAdminCampingGrounds() {
    const { data } = await api.get('/api/admin/camping-grounds');
    return (data?.data ?? []).map(normalizeCampingGround);
}

export async function createCampingGround(payload) {
    const { data } = await api.post('/api/admin/camping-grounds', serializeCampingGroundPayload(payload));
    return data;
}

export async function updateCampingGround(id, payload) {
    const { data } = await api.put(`/api/admin/camping-grounds/${id}`, serializeCampingGroundPayload(payload));
    return data;
}

export async function deleteCampingGround(id) {
    const { data } = await api.delete(`/api/admin/camping-grounds/${id}`);
    return data;
}
