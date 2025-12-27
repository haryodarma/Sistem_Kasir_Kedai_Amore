<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseFormat;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ResponseFormat::success(Category::paginate(15));
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
    public function store(CategoryRequest $request)
    {
        try {
            $validated = $request->validated();
            $category = Category::create([
                "category_name" => $validated["category_name"]
            ]);

            return ResponseFormat::success($category);
        } catch (Exception $e) {
            return ResponseFormat::error();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return ResponseFormat::success($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        try {
            $validated = $request->validated();
            $category->update($validated);
            return ResponseFormat::success($category);
        } catch (Exception $e) {
            return ResponseFormat::error();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            $category->delete();
            return ResponseFormat::success(message: "Deleted Successfully");
        } catch (Exception $e) {


            return ResponseFormat::error();
        }
    }
}
