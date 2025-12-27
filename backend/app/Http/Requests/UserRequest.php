<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            "username" => "required|string|max:255|unique:users,username",
            "email" => "required|email|max:255|unique:users,email",
            "password" => "required|string|min:6|confirmed",
            "role" => "required|in:admin,cashier,customer",
            "phone" => "required|string|max:20",
        ];
        if ($this->isMethod('put')) {
            $rules['username'] = 'sometimes|' . $rules['username'] . ',' . $this->user->id;
            $rules['email'] = 'sometimes|' . $rules['email'] . ',' . $this->user->id;
            $rules['password'] = 'sometimes|' . $rules['password'];
            $rules['role'] = 'sometimes|' . $rules['role'];
            $rules['phone'] = 'sometimes|' . $rules['phone'];
        }
        return $rules;
    }
}
