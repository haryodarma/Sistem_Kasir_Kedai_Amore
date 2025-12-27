<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            "product_name" => "required|string",
            "product_image" => "sometimes|file",
            "product_price" => "required|string",
            "product_size" => "required|string",
            "category_id" => "required|string",
            "is_hot" => "sometimes|string",
            "is_active" => "sometimes|string",

        ];

        if ($this->isMethod("PUT")) {
            $rules["category_id"] = "sometimes|string";
            $rules["product_name"] = "sometimes|string";
            $rules["product_price"] = "sometimes|string";
            $rules["product_size"] = "sometimes|string";
            $rules['product_image'] = "sometimes|file";
        }
        return $rules;
    }
}
