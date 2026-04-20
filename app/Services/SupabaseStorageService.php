<?php

namespace App\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class SupabaseStorageService
{
    public function uploadMitigationReportImage(UploadedFile $file): array
    {
        $bucket = config('services.supabase.mitigation_report_bucket', 'mitigation-report');
        $path = $this->buildObjectPath($file);

        $response = Http::withHeaders([
            'apikey' => $this->serviceRoleKey(),
            'Authorization' => 'Bearer '.$this->serviceRoleKey(),
            'x-upsert' => 'false',
            'Content-Type' => $file->getMimeType() ?: 'application/octet-stream',
        ])->withBody(
            file_get_contents($file->getRealPath()),
            $file->getMimeType() ?: 'application/octet-stream'
        )->post($this->storageObjectUrl($bucket, $path));

        if (! $response->successful()) {
            throw new RuntimeException($this->extractErrorMessage($response, 'Upload gambar ke Supabase gagal.'));
        }

        return [
            'bucket' => $bucket,
            'path' => $path,
            'public_url' => $this->resolveAssetUrl($bucket, $path),
        ];
    }

    public function resolveAssetUrl(?string $bucket, ?string $path): ?string
    {
        if (! $bucket || ! $path || ! $this->isConfigured()) {
            return null;
        }

        if ($this->bucketIsPublic()) {
            return $this->publicObjectUrl($bucket, $path);
        }

        $response = Http::withHeaders([
            'apikey' => $this->serviceRoleKey(),
            'Authorization' => 'Bearer '.$this->serviceRoleKey(),
            'Content-Type' => 'application/json',
        ])->post($this->signedUrlEndpoint($bucket, $path), [
            'expiresIn' => (int) config('services.supabase.signed_url_ttl', 3600),
        ]);

        if (! $response->successful()) {
            return null;
        }

        $signedUrl = $response->json('signedURL') ?? $response->json('signedUrl');

        if (! is_string($signedUrl) || $signedUrl === '') {
            return null;
        }

        if (Str::startsWith($signedUrl, ['http://', 'https://'])) {
            return $signedUrl;
        }

        return rtrim($this->baseUrl(), '/').'/storage/v1'.(Str::startsWith($signedUrl, '/') ? '' : '/').$signedUrl;
    }

    public function isConfigured(): bool
    {
        return filled(config('services.supabase.url')) && filled(config('services.supabase.service_role_key'));
    }

    protected function baseUrl(): string
    {
        $baseUrl = rtrim((string) config('services.supabase.url', ''), '/');

        if ($baseUrl === '') {
            throw new RuntimeException('Konfigurasi SUPABASE_URL belum diisi.');
        }

        return $baseUrl;
    }

    protected function serviceRoleKey(): string
    {
        $serviceRoleKey = (string) config('services.supabase.service_role_key', '');

        if ($serviceRoleKey === '') {
            throw new RuntimeException('Konfigurasi SUPABASE_SERVICE_ROLE_KEY belum diisi.');
        }

        return $serviceRoleKey;
    }

    protected function bucketIsPublic(): bool
    {
        return (bool) config('services.supabase.mitigation_report_bucket_public', true);
    }

    protected function buildObjectPath(UploadedFile $file): string
    {
        $extension = strtolower($file->getClientOriginalExtension() ?: $file->extension() ?: 'jpg');
        $extension = preg_replace('/[^a-z0-9]/', '', $extension) ?: 'jpg';

        return sprintf(
            'reports/%s/%s.%s',
            now()->format('Y-m-d'),
            Str::uuid(),
            $extension
        );
    }

    protected function storageObjectUrl(string $bucket, string $path): string
    {
        return sprintf(
            '%s/storage/v1/object/%s/%s',
            $this->baseUrl(),
            rawurlencode($bucket),
            $this->encodePath($path)
        );
    }

    protected function publicObjectUrl(string $bucket, string $path): string
    {
        return sprintf(
            '%s/storage/v1/object/public/%s/%s',
            $this->baseUrl(),
            rawurlencode($bucket),
            $this->encodePath($path)
        );
    }

    protected function signedUrlEndpoint(string $bucket, string $path): string
    {
        return sprintf(
            '%s/storage/v1/object/sign/%s/%s',
            $this->baseUrl(),
            rawurlencode($bucket),
            $this->encodePath($path)
        );
    }

    protected function encodePath(string $path): string
    {
        return collect(explode('/', trim($path, '/')))
            ->filter()
            ->map(fn (string $segment) => rawurlencode($segment))
            ->implode('/');
    }

    protected function extractErrorMessage(Response $response, string $fallback): string
    {
        $payload = $response->json();

        if (is_array($payload)) {
            foreach (['message', 'error', 'msg'] as $key) {
                $value = $payload[$key] ?? null;

                if (is_string($value) && $value !== '') {
                    return $value;
                }
            }
        }

        $body = trim((string) $response->body());

        return $body !== '' ? $body : $fallback;
    }
}
