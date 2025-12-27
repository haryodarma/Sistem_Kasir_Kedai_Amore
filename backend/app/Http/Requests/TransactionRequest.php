<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class TransactionRequest extends FormRequest
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
            "transaction_total" => "required|numeric",
            "transaction_discount" => "required|numeric",
            "transaction_status" => "required|in:pending,paid,cancelled",
            "items" => "required|array",
        ];
        if ($this->isMethod('put')) {
            $rules['transaction_total'] = 'sometimes|' . $rules['transaction_total'];
            $rules['transaction_discount'] = 'sometimes|' . $rules['transaction_discount'];
            $rules['transaction_status'] = 'sometimes|' . $rules['transaction_status'];
            $rules['items'] = 'sometimes|' . $rules['items'];

        }
        return $rules;
    }
}
