import api from '../lib/api';
import { getSupabaseClient } from '../lib/supabase';

const MITIGATION_REPORT_BUCKET = 'mitigation-report';

function buildFilePath(file) {
    const rawExtension = file.name.includes('.') ? file.name.split('.').pop() : '';
    const extension = String(rawExtension || file.type.split('/').pop() || 'jpg')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    const uniqueId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.round(Math.random() * 100000)}`;

    return `reports/${new Date().toISOString().slice(0, 10)}/${uniqueId}.${extension || 'jpg'}`;
}

export async function uploadMitigationReportImage(file) {
    const supabase = getSupabaseClient();
    const filePath = buildFilePath(file);
    const { data, error } = await supabase.storage.from(MITIGATION_REPORT_BUCKET).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || undefined,
    });

    if (error) {
        throw new Error(error.message || 'Upload gambar ke Supabase gagal.');
    }

    const { data: publicUrlData } = supabase.storage.from(MITIGATION_REPORT_BUCKET).getPublicUrl(data?.path ?? filePath);

    return {
        bucket: MITIGATION_REPORT_BUCKET,
        path: data?.path ?? filePath,
        publicUrl: publicUrlData?.publicUrl ?? '',
    };
}

function serializeCreatePayload(payload) {
    return {
        reporter_name: payload.reporterName?.trim() ?? '',
        incident_location: payload.incidentLocation?.trim() ?? '',
        incident_category: payload.incidentCategory?.trim() ?? '',
        description: payload.description?.trim() ?? '',
        photo_bucket: payload.photoBucket?.trim() ?? '',
        photo_path: payload.photoPath?.trim() ?? '',
        photo_url: payload.photoUrl?.trim() ?? '',
    };
}

function serializeAdminPayload(payload) {
    return {
        status: payload.status,
        priority: payload.priority,
        admin_notes: payload.adminNotes?.trim() ?? '',
    };
}

export async function createMitigationReport(payload) {
    const { data } = await api.post('/api/mitigation-reports', serializeCreatePayload(payload));
    return data;
}

export async function fetchAdminMitigationReports() {
    const { data } = await api.get('/api/admin/mitigation-reports');
    return data;
}

export async function updateMitigationReport(id, payload) {
    const { data } = await api.put(`/api/admin/mitigation-reports/${id}`, serializeAdminPayload(payload));
    return data;
}
