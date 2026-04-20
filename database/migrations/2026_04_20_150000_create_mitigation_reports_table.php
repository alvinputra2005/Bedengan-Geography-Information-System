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

        Schema::create('mitigation_reports', function (Blueprint $table) {
            $table->id();
            $table->string('report_code', 40)->unique();
            $table->foreignId('user_id')->nullable();
            $table->string('reporter_name', 120);
            $table->string('reporter_email', 160)->nullable();
            $table->string('incident_location', 150);
            $table->string('incident_category', 60)->nullable();
            $table->text('description');
            $table->string('photo_bucket', 120)->nullable();
            $table->string('photo_path', 255)->nullable();
            $table->text('photo_url')->nullable();
            $table->string('status', 20)->default('pending');
            $table->string('priority', 20)->default('medium');
            $table->text('admin_notes')->nullable();
            $table->timestamp('reported_at')->useCurrent();
            $table->foreignId('reviewed_by')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('user_id', 'fk_mitigation_reports_user')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreign('reviewed_by', 'fk_mitigation_reports_reviewer')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });

        if ($driver === 'pgsql') {
            DB::statement("ALTER TABLE mitigation_reports ADD CONSTRAINT chk_mitigation_reports_status CHECK (status IN ('pending', 'reviewed', 'in_progress', 'resolved', 'rejected'))");
            DB::statement("ALTER TABLE mitigation_reports ADD CONSTRAINT chk_mitigation_reports_priority CHECK (priority IN ('low', 'medium', 'high', 'critical'))");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mitigation_reports');
    }
};
