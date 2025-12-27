<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class RawRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // if (env('APP_ENV') == 'debug') {
        //     return true;
        // }
        // return Auth::user()->role == 'admin';
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        $rules = [
            "raw_name" => "required|string",
            "raw_stock" => "required|integer",
            "raw_unit" => "required|string",
        ];

        if ($this->isMethod("PUT")) {
            $rules["raw_name"] = "sometimes|string";
            $rules["raw_stock"] = "sometimes|integer";
            $rules["raw_unit"] = "sometimes|string";
        }

        return $rules;
    }
}
