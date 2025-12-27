<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (env('APP_ENV') == 'debug') {
            return true;
        }
        return Auth::user()->role == 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        $rules = [
            "setting_name" => "required|string|unique:settings,setting_key",
            "setting_value" => "required|string",
            "setting_desc" => "nullable|string",
        ];

        if ($this->isMethod('put')) {
            $rules['setting_name'] = 'sometimes|' . $rules['setting_name'];
            $rules['setting_value'] = 'sometimes|' . $rules['setting_value'];
            $rules['setting_desc'] = 'sometimes|' . $rules['setting_desc'];
        }
        return $rules;
    }
}
