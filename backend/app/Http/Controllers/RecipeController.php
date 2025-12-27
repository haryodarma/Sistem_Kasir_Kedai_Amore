<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseFormat;
use App\Http\Requests\RecipeRequest;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return ResponseFormat::success(Recipe::with(["product", "raw"])->paginate(30));
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }

    public function recipeByProduct($product_id)
    {
        try {
            return ResponseFormat::success(Recipe::where("product_id", $product_id)->with(["product", "raw"])->paginate(25));
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RecipeRequest $request)
    {
        try {
            $validated = $request->validated();
            $recipe = Recipe::create($validated);
            return ResponseFormat::success($recipe);
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        try {
            return ResponseFormat::success($recipe->load('raw', 'product'));
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recipe $recipe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RecipeRequest $request, Recipe $recipe)
    {
        try {
            $validated = $request->validated();
            $recipe->update($validated);
            return ResponseFormat::success($recipe);
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        try {
            $recipe->delete();
            return ResponseFormat::success(message: "Recipe deleted successfully");
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }
}
