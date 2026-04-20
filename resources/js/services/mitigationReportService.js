import api from '../lib/api';

function serializeCreatePayload(payload) {
    const formData = new FormData();

    formData.append('reporter_name', payload.reporterName?.trim() ?? '');
    formData.append('incident_location', payload.incidentLocation?.trim() ?? '');
    formData.append('incident_category', payload.incidentCategory?.trim() ?? '');
    formData.append('description', payload.description?.trim() ?? '');

    if (payload.photo instanceof File) {
        formData.append('photo', payload.photo);
    }

    return formData;
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
