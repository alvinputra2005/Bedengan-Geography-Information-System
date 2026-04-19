<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $driver = DB::getDriverName();

        Schema::create('sensors', function (Blueprint $table) {
            $table->id();
            $table->string('device_id', 100)->unique();
            $table->string('name', 100);
            $table->string('slug', 120)->nullable()->unique();
            $table->text('description')->nullable();
            $table->text('installation_location')->nullable();
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->decimal('elevation', 8, 2)->nullable();
            $table->string('river_name', 100)->nullable();
            $table->text('firebase_path')->nullable();
            $table->string('status', 20)->default('active');
            $table->decimal('warning_min_cm', 8, 2)->nullable();
            $table->decimal('warning_max_cm', 8, 2)->nullable();
            $table->decimal('danger_min_cm', 8, 2)->nullable();
            $table->decimal('danger_max_cm', 8, 2)->nullable();
            $table->timestamp('installed_at')->nullable();
            $table->timestamp('last_seen_at')->nullable();
            $table->foreignId('created_by')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('created_by', 'fk_sensors_created_by')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });

        Schema::create('sensor_readings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sensor_id');
            $table->string('firebase_record_id', 150)->nullable();
            $table->decimal('distance_cm', 8, 2);
            $table->decimal('water_level_cm', 8, 2)->nullable();
            $table->string('status_level', 20);
            $table->jsonb('raw_payload')->nullable();
            $table->timestamp('recorded_at');
            $table->timestamp('received_at')->useCurrent();
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('sensor_id', 'fk_sensor_readings_sensor')
                ->references('id')
                ->on('sensors')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('alerts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sensor_id');
            $table->foreignId('sensor_reading_id')->nullable();
            $table->string('alert_code', 100)->nullable()->unique();
            $table->string('alert_level', 20);
            $table->string('title', 150);
            $table->text('message');
            $table->boolean('is_acknowledged')->default(false);
            $table->foreignId('acknowledged_by')->nullable();
            $table->timestamp('acknowledged_at')->nullable();
            $table->timestamp('started_at');
            $table->timestamp('ended_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('sensor_id', 'fk_alerts_sensor')
                ->references('id')
                ->on('sensors')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('sensor_reading_id', 'fk_alerts_sensor_reading')
                ->references('id')
                ->on('sensor_readings')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreign('acknowledged_by', 'fk_alerts_acknowledged_by')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });

        Schema::create('notification_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alert_id');
            $table->foreignId('user_id')->nullable();
            $table->string('channel', 20);
            $table->string('recipient', 150)->nullable();
            $table->text('message');
            $table->string('status', 20);
            $table->timestamp('sent_at')->nullable();
            $table->text('response_log')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('alert_id', 'fk_notification_logs_alert')
                ->references('id')
                ->on('alerts')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('user_id', 'fk_notification_logs_user')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });

        Schema::create('user_notification_tokens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->text('token');
            $table->string('device_type', 20)->nullable();
            $table->string('device_name', 100)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('user_id', 'fk_user_notification_tokens_user')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('tourist_places', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('slug', 180)->nullable()->unique();
            $table->text('description')->nullable();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->string('opening_hours', 100)->nullable();
            $table->decimal('ticket_price', 12, 2)->nullable();
            $table->string('contact', 100)->nullable();
            $table->text('photo_url')->nullable();
            $table->string('status', 20)->default('active');
            $table->foreignId('created_by')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('created_by', 'fk_tourist_places_created_by')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });

        Schema::create('flood_zones', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('risk_level', 20);
            $table->text('description')->nullable();
            $table->jsonb('geojson');
            $table->string('color', 20)->nullable();
            $table->string('status', 20)->default('active');
            $table->foreignId('created_by')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('created_by', 'fk_flood_zones_created_by')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });

        Schema::create('evacuation_routes', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->text('description')->nullable();
            $table->string('start_point', 150)->nullable();
            $table->string('end_point', 150)->nullable();
            $table->jsonb('geojson');
            $table->string('status', 20)->default('active');
            $table->foreignId('created_by')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('created_by', 'fk_evacuation_routes_created_by')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });

        Schema::create('mitigation_contents', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->string('slug', 220)->nullable()->unique();
            $table->text('content');
            $table->string('category', 50)->nullable();
            $table->string('status', 20)->default('published');
            $table->foreignId('created_by')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('created_by', 'fk_mitigation_contents_created_by')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });

        Schema::create('admin_activity_logs', function (Blueprint $table) use ($driver) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->string('activity_type', 30);
            $table->string('module', 50);
            $table->bigInteger('reference_id')->nullable();
            $table->text('description')->nullable();
            $table->text('user_agent')->nullable();
            if ($driver === 'pgsql') {
                $table->ipAddress('ip_address')->nullable();
            } else {
                $table->string('ip_address', 45)->nullable();
            }
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('user_id', 'fk_admin_activity_logs_user')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });

        if ($driver === 'pgsql') {
            DB::statement("ALTER TABLE sensors ADD CONSTRAINT chk_sensors_status CHECK (status IN ('active', 'inactive', 'maintenance'))");
            DB::statement("ALTER TABLE sensor_readings ADD CONSTRAINT chk_sensor_readings_status CHECK (status_level IN ('safe', 'warning', 'danger', 'error'))");
            DB::statement("ALTER TABLE alerts ADD CONSTRAINT chk_alerts_level CHECK (alert_level IN ('warning', 'danger'))");
            DB::statement("ALTER TABLE notification_logs ADD CONSTRAINT chk_notification_logs_channel CHECK (channel IN ('dashboard', 'email', 'push', 'web'))");
            DB::statement("ALTER TABLE notification_logs ADD CONSTRAINT chk_notification_logs_status CHECK (status IN ('queued', 'sent', 'failed'))");
            DB::statement("ALTER TABLE tourist_places ADD CONSTRAINT chk_tourist_places_status CHECK (status IN ('active', 'inactive'))");
            DB::statement("ALTER TABLE flood_zones ADD CONSTRAINT chk_flood_zones_risk CHECK (risk_level IN ('low', 'medium', 'high'))");
            DB::statement("ALTER TABLE flood_zones ADD CONSTRAINT chk_flood_zones_status CHECK (status IN ('active', 'inactive'))");
            DB::statement("ALTER TABLE evacuation_routes ADD CONSTRAINT chk_evacuation_routes_status CHECK (status IN ('active', 'inactive'))");
            DB::statement("ALTER TABLE mitigation_contents ADD CONSTRAINT chk_mitigation_contents_status CHECK (status IN ('draft', 'published', 'archived'))");
            DB::statement("ALTER TABLE admin_activity_logs ADD CONSTRAINT chk_admin_activity_logs_activity CHECK (activity_type IN ('create', 'update', 'delete', 'login', 'logout', 'acknowledge_alert'))");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_activity_logs');
        Schema::dropIfExists('mitigation_contents');
        Schema::dropIfExists('evacuation_routes');
        Schema::dropIfExists('flood_zones');
        Schema::dropIfExists('tourist_places');
        Schema::dropIfExists('user_notification_tokens');
        Schema::dropIfExists('notification_logs');
        Schema::dropIfExists('alerts');
        Schema::dropIfExists('sensor_readings');
        Schema::dropIfExists('sensors');
    }
};
