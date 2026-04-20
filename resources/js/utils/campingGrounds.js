export const CAMPING_FILTER_OPTIONS = ['Semua', 'Direkomendasikan', 'Waspada', 'Tidak Direkomendasikan'];
export const FALLBACK_WATER_LEVEL_CM = 18;

export function formatDistance(value) {
    return `${value.toFixed(2)} m`;
}

export function normalizeCampingGround(ground) {
    return {
        id: ground?.id,
        name: ground?.name ?? '-',
        slug: ground?.slug ?? '',
        image: ground?.image_url ?? '',
        flatDistanceM: Number(ground?.flat_distance_m ?? 0),
        cliffHeightM: Number(ground?.cliff_height_m ?? 0),
        baseWaterLevelCm: Number(ground?.base_water_level_cm ?? 0),
        sortOrder: Number(ground?.sort_order ?? 0),
        isActive: Boolean(ground?.is_active ?? true),
    };
}

export function computeGroundMetrics(ground, liveWaterLevelCm) {
    const currentWaterLevelCm = liveWaterLevelCm > 0 ? liveWaterLevelCm : ground.baseWaterLevelCm;
    const waterRiseM = Math.max((currentWaterLevelCm - ground.baseWaterLevelCm) / 100, 0);
    const effectiveHeightM = Math.max(ground.cliffHeightM - waterRiseM * 0.45, 0);
    const surfaceDistanceM = Math.sqrt(ground.flatDistanceM ** 2 + effectiveHeightM ** 2);
    const riskScore = Math.min(
        92,
        Math.max(8, Math.round(78 - ground.flatDistanceM * 7 - effectiveHeightM * 11 + waterRiseM * 14))
    );

    let riskLevel = `Sangat Tinggi (${riskScore}%)`;
    if (riskScore <= 25) {
        riskLevel = `Rendah (${riskScore}%)`;
    } else if (riskScore <= 50) {
        riskLevel = `Sedang (${riskScore}%)`;
    } else if (riskScore <= 75) {
        riskLevel = `Tinggi (${riskScore}%)`;
    }

    let status = 'Tidak Direkomendasikan';
    if (riskScore <= 25) {
        status = 'Direkomendasikan';
    } else if (riskScore <= 65) {
        status = 'Waspada';
    }

    return {
        ...ground,
        status,
        riskScore,
        riskLevel,
        currentWaterLevelCm,
        effectiveHeightM,
        surfaceDistanceM,
        displaySurfaceDistance: formatDistance(surfaceDistanceM),
        displayEffectiveHeight: formatDistance(effectiveHeightM),
        displayFlatDistance: formatDistance(ground.flatDistanceM),
        displayCliffHeight: formatDistance(ground.cliffHeightM),
    };
}

export function getStatusClass(status) {
    if (status === 'Direkomendasikan') {
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }

    if (status === 'Waspada') {
        return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
    }

    return 'bg-rose-50 text-rose-800 border border-rose-200';
}

export function getRiskStyles(riskScore) {
    if (riskScore <= 25) {
        return {
            bar: 'bg-emerald-500',
            text: 'text-emerald-700',
        };
    }

    if (riskScore <= 50) {
        return {
            bar: 'bg-yellow-500',
            text: 'text-yellow-700',
        };
    }

    if (riskScore <= 75) {
        return {
            bar: 'bg-orange-500',
            text: 'text-orange-700',
        };
    }

    return {
        bar: 'bg-rose-600',
        text: 'text-rose-700',
    };
}
