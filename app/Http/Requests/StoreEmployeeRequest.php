<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'employee_id' => ['required', 'string', 'max:50', 'unique:employees,employee_id'],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],

            'email' => ['required', 'email', 'max:255', 'unique:employees,email'],
            'phone' => ['required', 'string', 'max:50'],

            'dob' => ['required', 'date'],
            'gender' => ['required', 'string', 'max:20'],
            'nid' => ['required', 'string', 'max:100'],

            'present_address' => ['required', 'string', 'max:2000'],
            'permanent_address' => ['required', 'string', 'max:2000'],

            'department' => ['required', 'string', 'max:255'],
            'designation' => ['required', 'string', 'max:255'],
            'employment_type' => ['required', 'string', 'max:50'],
            'joining_date' => ['required', 'date'],
            'status' => ['required', 'string', 'max:50'],
        ];
    }
}
