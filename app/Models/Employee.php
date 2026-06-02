<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        // Core HRM identity
        'employee_id', 'first_name', 'last_name',
        // Contact
        'email',
        // Profile
        'name', 'nid', 'dob', 'gender', 'address', 'present_address', 'permanent_address', 'phone',
        // Job
        'job_title', 'job_join_date', 'job_description', 'employment_type', 'joining_date',
        // Documents
        'nid_file', 'certificate_file', 'contract_file',
        // Org
        'department', 'designation', 'role',
        // Status & lifecycle
        'status', 'transfer_promotion_notes', 'separation_type', 'separation_date', 'clearance_completed',
    ];

    protected $casts = [
        'dob' => 'date',
        'job_join_date' => 'date',
        'joining_date' => 'date',
        'separation_date' => 'date',
        'clearance_completed' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $employee): void {
            if (! empty($employee->first_name) && ! empty($employee->last_name)) {
                $employee->name = trim($employee->first_name.' '.$employee->last_name);
            }
        });
    }

    public function getFullNameAttribute(): string
    {
        $fullName = trim(($this->first_name ?? '').' '.($this->last_name ?? ''));

        return $fullName !== '' ? $fullName : (string) ($this->name ?? '');
    }
}
