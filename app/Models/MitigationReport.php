<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MitigationReport extends Model
{
    protected $fillable = [
        'report_code',
        'user_id',
        'reporter_name',
        'reporter_email',
        'incident_location',
        'incident_category',
        'description',
        'photo_bucket',
        'photo_path',
        'photo_url',
        'status',
        'priority',
        'admin_notes',
        'reported_at',
        'reviewed_by',
        'reviewed_at',
    ];

    protected $casts = [
        'reported_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
