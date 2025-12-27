<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class RecipeRequest extends FormRequest
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
            "recipe_qty" => "required|numeric",
            "product_id" => "required|exists:products,product_id",
            "raw_id" => "required|exists:raws,raw_id"
        ];

        if ($this->isMethod('put')) {
            $rules['recipe_qty'] = 'sometimes|' . $rules['recipe_qty'];
            $rules['product_id'] = 'sometimes|' . $rules['product_id'];
            $rules['raw_id'] = 'sometimes|' . $rules['raw_id'];
        }

        return $rules;
    }
}
