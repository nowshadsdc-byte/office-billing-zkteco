<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = ['uid', 'user_id', 'state', 'punched_at', 'type'];

    protected $casts = [
        'punched_at' => 'datetime',
    ];

    public function getTypeNameAttribute(): string
    {
        return match ((int) $this->type) {
            0   => 'Check In',
            1   => 'Check Out',
            4   => 'OT In',
            5   => 'OT Out',
            default => 'Unknown',
        };
    }

    public function getAuthMethodAttribute(): string
    {
        return match ((int) $this->state) {
            1  => 'Fingerprint',
            4  => 'RF Card',
            15 => 'Face',
            default => 'Other',
        };
    }
}