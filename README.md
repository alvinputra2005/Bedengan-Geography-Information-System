# Bedengan GIS

Laravel + React single-page application untuk monitoring kawasan Bedengan, mitigasi, camping ground, dan navigasi bedengan.

## Yang ditambahkan

- Fitur MVP navigasi bedengan pada route `/bedengan/navigation`
- Peta geografis berbasis Leaflet + React-Leaflet
- Pelacakan lokasi realtime dengan `navigator.geolocation.watchPosition`
- Highlight bedengan, marker akses, akurasi lokasi, dan polyline rute
- Backend data `bedengans` dengan migration, model, dan sample seeder
- Endpoint API:
  - `GET /api/bedengans`
  - `GET /api/bedengans/{id}`
  - `GET /api/route?start_lat=&start_lng=&end_lat=&end_lng=`

## Stack frontend yang dipakai

- Bukan Inertia
- React router SPA di dalam Laravel
- JavaScript, bukan TypeScript
- Entry utama frontend: `resources/js/app.js`

## Cara menjalankan

1. Install dependency:

```bash
npm install
composer install
```

2. Siapkan environment:

```bash
cp .env.example .env
php artisan key:generate
```

3. Atur koneksi database pada `.env`, lalu jalankan:

```bash
php artisan migrate --seed
```

4. Jalankan aplikasi:

```bash
php artisan serve
npm run dev
```

## Environment variable penting

- `OSRM_BASE_URL`
  - Base URL routing service OSRM
  - Contoh lokal: `http://127.0.0.1:5000`
  - Jika kosong, halaman navigasi tetap bisa membuka peta dan lokasi realtime, tetapi request rute akan gagal dengan pesan yang jelas

## Cara kerja geolocation realtime

- Halaman navigasi memakai `navigator.geolocation.watchPosition`
- Browser akan terus memperbarui posisi pengguna selama halaman aktif
- Rute tidak dihitung ulang pada setiap perubahan kecil
- Request rute baru hanya dikirim jika pengguna berpindah sekitar `15 meter` atau saat bedengan tujuan diganti

## Catatan geolocation untuk development dan production

- Geolocation browser umumnya hanya berjalan pada:
  - `localhost`
  - koneksi `https`
- Untuk development lokal, `localhost` biasanya sudah cukup
- Untuk production, pastikan aplikasi disajikan melalui `https`

## Routing service

Endpoint backend `/api/route` memakai service class Laravel yang meneruskan request ke OSRM.

Response dinormalisasi menjadi:

```json
{
  "distance_meters": 1200,
  "duration_seconds": 900,
  "coordinates": [[-7.88, 112.55], [-7.89, 112.56]]
}
```

Jika `OSRM_BASE_URL` belum dikonfigurasi atau service tidak bisa diakses, API akan mengembalikan pesan error yang ramah agar frontend bisa menampilkan fallback dengan aman.

## File utama yang terkait fitur ini

- `resources/js/pages/bedengan-navigation/BedenganNavigationPage.jsx`
- `resources/js/services/bedenganNavigationService.js`
- `app/Models/Bedengan.php`
- `app/Http/Controllers/Api/BedenganController.php`
- `app/Http/Controllers/Api/RouteController.php`
- `app/Services/RoutingService.php`
- `database/migrations/2026_04_20_100000_create_bedengans_table.php`
- `database/seeders/BedenganSeeder.php`

