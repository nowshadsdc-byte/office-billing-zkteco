<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('employees')) {
            return;
        }

        if (! Schema::hasColumn('employees', 'employee_id')) {
            Schema::table('employees', function (Blueprint $table) {
                $table->string('employee_id')->unique()->after('id');
            });
        }

        if (! Schema::hasColumn('employees', 'first_name')) {
            Schema::table('employees', function (Blueprint $table) {
                $table->string('first_name')->after('employee_id');
            });
        }

        if (! Schema::hasColumn('employees', 'last_name')) {
            Schema::table('employees', function (Blueprint $table) {
                $table->string('last_name')->after('first_name');
            });
        }

        if (! Schema::hasColumn('employees', 'email')) {
            Schema::table('employees', function (Blueprint $table) {
                $table->string('email')->unique()->after('last_name');
            });
        }

        if (! Schema::hasColumn('employees', 'gender')) {
            Schema::table('employees', function (Blueprint $table) {
                $table->string('gender')->nullable()->after('dob');
            });
        }

        if (! Schema::hasColumn('employees', 'present_address')) {
            Schema::table('employees', function (Blueprint $table) {
                $table->text('present_address')->nullable()->after('address');
            });
        }

        if (! Schema::hasColumn('employees', 'permanent_address')) {
            Schema::table('employees', function (Blueprint $table) {
                $table->text('permanent_address')->nullable()->after('present_address');
            });
        }

        if (! Schema::hasColumn('employees', 'employment_type')) {
            Schema::table('employees', function (Blueprint $table) {
                $table->string('employment_type')->nullable()->after('designation');
            });
        }

        if (! Schema::hasColumn('employees', 'joining_date')) {
            Schema::table('employees', function (Blueprint $table) {
                $table->date('joining_date')->nullable()->after('job_join_date');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('employees')) {
            return;
        }

        Schema::table('employees', function (Blueprint $table) {
            foreach ([
                'joining_date',
                'employment_type',
                'permanent_address',
                'present_address',
                'gender',
                'email',
                'last_name',
                'first_name',
                'employee_id',
            ] as $column) {
                if (Schema::hasColumn('employees', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
