import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import {
    Circle,
    MapContainer,
    Marker,
    Polygon,
    Polyline,
    TileLayer,
    Tooltip,
    useMap,
} from 'react-leaflet';
import { LoaderCircle, LocateFixed, Route, TriangleAlert } from 'lucide-react';
import {
    pageContainerClassName,
    pageGutterClassName,
    pageSectionGapClassName,
    pageShellClassName,
} from '../../components/layout/pageSpacing';
import { fetchActiveBedengan, fetchRoute } from '../../services/bedenganNavigationService';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const bedenganIcon = new L.DivIcon({
    className: 'custom-bedengan-marker',
    html: '<div style="width:18px;height:18px;border-radius:9999px;background:#026692;border:3px solid #fff;box-shadow:0 8px 18px rgba(2,102,146,0.28);"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

const mapCenter = [-7.939644, 112.5310382];
const RECALCULATE_DISTANCE_METERS = 15;

function haversineDistanceMeters(start, end) {
    if (!start || !end) {
        return Number.POSITIVE_INFINITY;
    }

    const toRadians = (value) => (value * Math.PI) / 180;
    const earthRadius = 6371000;
    const dLat = toRadians(end.lat - start.lat);
    const dLng = toRadians(end.lng - start.lng);
    const lat1 = toRadians(start.lat);
    const lat2 = toRadians(end.lat);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

    return 2 * earthRadius * Math.asin(Math.sqrt(a));
}

function formatDistance(distanceMeters) {
    if (!distanceMeters && distanceMeters !== 0) {
        return '-';
    }

    if (distanceMeters >= 1000) {
        return `${(distanceMeters / 1000).toFixed(2)} km`;
    }

    return `${Math.round(distanceMeters)} m`;
}

function formatEta(durationSeconds) {
    if (!durationSeconds && durationSeconds !== 0) {
        return '-';
    }

    const minutes = Math.max(1, Math.round(durationSeconds / 60));
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}j ${remainingMinutes}m` : `${hours}j`;
    }

    return `${minutes} menit`;
}

function MapEffects({ currentLocation, selectedBedengan, routeCoordinates, focusRequestId }) {
    const map = useMap();
    const manualFocusUntilRef = useRef(0);

    function shouldPauseAutoFit() {
        return Date.now() < manualFocusUntilRef.current;
    }

    useEffect(() => {
        if (shouldPauseAutoFit()) {
            return;
        }

        if (selectedBedengan?.polygon_json?.length) {
            map.fitBounds(selectedBedengan.polygon_json, { padding: [32, 32] });
        } else if (selectedBedengan?.access_lat && selectedBedengan?.access_lng) {
            map.flyTo([selectedBedengan.access_lat, selectedBedengan.access_lng], 17, {
                duration: 0.8,
            });
        }
    }, [map, selectedBedengan]);

    useEffect(() => {
        if (shouldPauseAutoFit()) {
            return;
        }

        if (routeCoordinates.length > 1) {
            map.fitBounds(routeCoordinates, { padding: [40, 40] });
        }
    }, [map, routeCoordinates]);

    useEffect(() => {
        if (!focusRequestId || !currentLocation) {
            return;
        }

        manualFocusUntilRef.current = Date.now() + 4000;
        map.flyTo([currentLocation.lat, currentLocation.lng], 18, { duration: 0.8 });
    }, [currentLocation, map, focusRequestId]);

    return null;
}

export default function BedenganNavigationPage() {
    const [selectedBedengan, setSelectedBedengan] = useState(null);
    const [routeData, setRouteData] = useState(null);
    const [loadingBedengan, setLoadingBedengan] = useState(true);
    const [loadingRoute, setLoadingRoute] = useState(false);
    const [pageError, setPageError] = useState('');
    const [routeError, setRouteError] = useState('');
    const [geoStatus, setGeoStatus] = useState('Mendeteksi lokasi...');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [accuracyMeters, setAccuracyMeters] = useState(null);
    const [focusRequestId, setFocusRequestId] = useState(0);

    const lastRoutedPositionRef = useRef(null);
    const watchIdRef = useRef(null);

    useEffect(() => {
        let isActive = true;

        async function loadBedengan() {
            try {
                setLoadingBedengan(true);
                const bedengan = await fetchActiveBedengan();
                if (!isActive) {
                    return;
                }

                if (!bedengan) {
                    setPageError('Koordinat Bedengan belum tersedia. Tambahkan satu titik Bedengan aktif terlebih dahulu.');
                    return;
                }

                setSelectedBedengan(bedengan);
            } catch (error) {
                if (!isActive) {
                    return;
                }

                setPageError(error.response?.data?.message || 'Gagal memuat koordinat Bedengan.');
            } finally {
                if (isActive) {
                    setLoadingBedengan(false);
                }
            }
        }

        loadBedengan();

        return () => {
            isActive = false;
        };
    }, []);

    useEffect(() => {
        if (!navigator.geolocation) {
            setGeoStatus('Perangkat ini tidak mendukung geolokasi browser.');
            return undefined;
        }

        watchIdRef.current = navigator.geolocation.watchPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setAccuracyMeters(position.coords.accuracy ?? null);
                setGeoStatus('Lokasi realtime aktif');
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    setGeoStatus('Izin lokasi ditolak. Aktifkan lokasi untuk navigasi realtime.');
                    return;
                }

                if (error.code === error.TIMEOUT) {
                    setGeoStatus('Permintaan lokasi melebihi batas waktu. Coba lagi sebentar.');
                    return;
                }

                setGeoStatus('Lokasi tidak tersedia saat ini. Pastikan GPS atau browser aktif.');
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 5000,
            }
        );

        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!selectedBedengan || !currentLocation) {
            return;
        }

        const previousOrigin = lastRoutedPositionRef.current;
        if (previousOrigin && haversineDistanceMeters(previousOrigin, currentLocation) < RECALCULATE_DISTANCE_METERS) {
            return;
        }

        let isActive = true;

        async function loadRoute() {
            try {
                setLoadingRoute(true);
                setRouteError('');

                const response = await fetchRoute({
                    start_lat: currentLocation.lat,
                    start_lng: currentLocation.lng,
                    end_lat: selectedBedengan.access_lat,
                    end_lng: selectedBedengan.access_lng,
                });

                if (!isActive) {
                    return;
                }

                setRouteData(response);
                lastRoutedPositionRef.current = currentLocation;
            } catch (error) {
                if (!isActive) {
                    return;
                }

                setRouteData(null);
                setRouteError(error.response?.data?.message || 'Rute belum dapat dihitung saat ini.');
            } finally {
                if (isActive) {
                    setLoadingRoute(false);
                }
            }
        }

        loadRoute();

        return () => {
            isActive = false;
        };
    }, [currentLocation, selectedBedengan]);

    const routeCoordinates = useMemo(() => routeData?.coordinates ?? [], [routeData]);
    const selectedPolygon = selectedBedengan?.polygon_json ?? [];

    return (
        <main className={pageShellClassName}>
            <section className={pageGutterClassName}>
                <div className={pageContainerClassName}>
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/90 p-8 ambient-shadow md:p-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(57,184,253,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(2,102,146,0.08),transparent_38%)]"></div>
                        <div className="relative z-10 max-w-4xl">
                            <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Navigasi Bedengan</p>
                            <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
                                Temukan rute jalan kaki menuju <span className="text-primary">Bedengan</span> secara realtime.
                            </h1>
                            <p className="mt-5 max-w-3xl text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">
                                Sistem akan memakai koordinat Bedengan yang tersedia, membaca lokasi Anda saat ini, lalu
                                menghitung rute jalan kaki terbaik secara otomatis melalui OSRM.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${pageGutterClassName} ${pageSectionGapClassName}`}>
                <div className={`${pageContainerClassName} grid grid-cols-1 gap-8 xl:grid-cols-[23rem_1fr]`}>
                    <div className="space-y-6">
                        <div className="ambient-shadow rounded-[2rem] border border-black/5 bg-white p-5">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Status Lokasi</p>
                                <h2 className="mt-2 font-headline text-2xl font-extrabold text-on-surface">Posisi Pengguna</h2>
                            </div>

                            <div className="mt-5 space-y-3">
                                <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/50">Status Geolokasi</p>
                                    <p className="mt-2 text-sm font-semibold text-on-surface">{geoStatus}</p>
                                </div>
                                <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/50">Akurasi</p>
                                    <p className="mt-2 text-sm font-semibold text-on-surface">
                                        {accuracyMeters ? `${Math.round(accuracyMeters)} meter` : 'Belum tersedia'}
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/50">Ringkasan Rute</p>
                                    <div className="mt-2 flex flex-wrap gap-3 text-sm font-semibold text-on-surface">
                                        <span>Jarak: {formatDistance(routeData?.distance_meters)}</span>
                                        <span>ETA: {formatEta(routeData?.duration_seconds)}</span>
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/50">Tujuan Bedengan</p>
                                    <p className="mt-2 text-sm font-semibold text-on-surface">
                                        {selectedBedengan?.name || (loadingBedengan ? 'Memuat titik tujuan...' : 'Belum tersedia')}
                                    </p>
                                    <p className="mt-1 text-xs font-medium text-on-surface-variant">
                                        {selectedBedengan?.access_lat && selectedBedengan?.access_lng
                                            ? `${selectedBedengan.access_lat}, ${selectedBedengan.access_lng}`
                                            : 'Koordinat tujuan belum tersedia'}
                                    </p>
                                </div>
                            </div>

                            {routeError ? (
                                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                                    <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                                    <p>{routeError}</p>
                                </div>
                            ) : null}
                            {!routeError && currentLocation && selectedBedengan ? (
                                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                                    Rute OSRM dihitung otomatis dari lokasi Anda menuju titik Bedengan aktif.
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="ambient-shadow overflow-hidden rounded-[2rem] border border-black/5 bg-white">
                        <div className="flex flex-col gap-4 border-b border-black/5 px-5 py-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Peta Navigasi</p>
                                <h2 className="mt-1 font-headline text-2xl font-extrabold text-on-surface">
                                    {selectedBedengan?.name || (loadingBedengan ? 'Memuat Bedengan...' : 'Titik Bedengan')}
                                </h2>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFocusRequestId((value) => value + 1)}
                                    disabled={!currentLocation}
                                    className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <LocateFixed size={14} />
                                    Lihat lokasi saya
                                </button>
                                <div className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
                                    {loadingRoute ? <LoaderCircle className="animate-spin text-primary" size={16} /> : <Route size={16} className="text-primary" />}
                                    {loadingRoute ? 'Menghitung rute OSRM...' : 'Rute jalan kaki terbaik'}
                                </div>
                            </div>
                        </div>

                        {pageError ? (
                            <div className="m-5 rounded-[1.5rem] border border-rose-200 bg-rose-50 px-4 py-4 text-sm font-medium text-rose-700">
                                {pageError}
                            </div>
                        ) : (
                            <div className="h-[70vh] min-h-[420px]">
                                <MapContainer center={mapCenter} zoom={17} className="h-full w-full" scrollWheelZoom>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <MapEffects
                                        currentLocation={currentLocation}
                                        selectedBedengan={selectedBedengan}
                                        routeCoordinates={routeCoordinates}
                                        focusRequestId={focusRequestId}
                                    />

                                    {selectedBedengan?.access_lat && selectedBedengan?.access_lng ? (
                                        <Marker
                                            position={[selectedBedengan.access_lat, selectedBedengan.access_lng]}
                                            icon={bedenganIcon}
                                        >
                                            <Tooltip>{selectedBedengan.name}</Tooltip>
                                        </Marker>
                                    ) : null}

                                    {currentLocation ? (
                                        <>
                                            <Marker position={[currentLocation.lat, currentLocation.lng]}>
                                                <Tooltip>Ada di lokasi Anda</Tooltip>
                                            </Marker>
                                            {accuracyMeters ? (
                                                <Circle
                                                    center={[currentLocation.lat, currentLocation.lng]}
                                                    radius={accuracyMeters}
                                                    pathOptions={{
                                                        color: '#026692',
                                                        fillColor: '#39b8fd',
                                                        fillOpacity: 0.12,
                                                    }}
                                                />
                                            ) : null}
                                        </>
                                    ) : null}

                                    {selectedPolygon.length > 2 ? (
                                        <Polygon
                                            positions={selectedPolygon}
                                            pathOptions={{
                                                color: '#10b981',
                                                weight: 3,
                                                fillColor: '#10b981',
                                                fillOpacity: 0.16,
                                            }}
                                        />
                                    ) : null}

                                    {routeCoordinates.length > 1 ? (
                                        <Polyline
                                            positions={routeCoordinates}
                                            pathOptions={{
                                                color: '#026692',
                                                weight: 5,
                                                opacity: 0.9,
                                            }}
                                        />
                                    ) : null}
                                </MapContainer>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
