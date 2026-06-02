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
        Schema::table('employees', function (Blueprint $table) {
            $table->string('employee_id')->nullable()->unique()->after('id');
            $table->string('first_name')->nullable()->after('employee_id');
            $table->string('last_name')->nullable()->after('first_name');

            $table->string('email')->nullable()->unique()->after('last_name');
            $table->string('gender', 20)->nullable()->after('dob');

            $table->text('present_address')->nullable()->after('address');
            $table->text('permanent_address')->nullable()->after('present_address');

            $table->string('employment_type', 50)->nullable()->after('designation');
            $table->date('joining_date')->nullable()->after('employment_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropUnique(['employee_id']);
            $table->dropUnique(['email']);

            $table->dropColumn([
                'employee_id',
                'first_name',
                'last_name',
                'email',
                'gender',
                'present_address',
                'permanent_address',
                'employment_type',
                'joining_date',
            ]);
        });
    }
};
