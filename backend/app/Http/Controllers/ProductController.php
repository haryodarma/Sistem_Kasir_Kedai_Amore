<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseFormat;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return ResponseFormat::success(Product::with(["recipes", "recipes.raw", "category"])->orderByDesc("is_active")->paginate(15));
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
    public function store(ProductRequest $request)
    {
        try {
            $validated = $request->validated();
            $last_product = Product::latest();
            if ($last_product->exists()) {
                $last_product = $last_product->first();
            } else {
                $last_product = null;
            }
            $img_id = $last_product ? $last_product->product_id + 1 : 1;


            if ($request->hasFile('product_image')) {
                $image = $request->file('product_image');
                $imagePath = $image->storeAs('products', $img_id . "." . "png", 'public');
                $validated['product_image'] = "/storage/$imagePath";
            }

            $validated['is_active'] = false;

            $product = Product::create($validated);

            return ResponseFormat::success($product);

        } catch (\Exception $e) {
            Log::alert($e);
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        try {
            return ResponseFormat::success($product->load('category'));
        } catch (\Exception $e) {
            return ResponseFormat::error();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        try {
            $validated = $request->validated();
            LOg::info($validated);

            if ($request->hasFile('product_image')) {
                $image = $request->file('product_image');
                $imagePath = $image->storeAs('products', $product->product_id . "." . "png", 'public');
                $validated['product_image'] = "/storage/$imagePath";
            }

            $product->update($validated);
            return ResponseFormat::success($product);
        } catch (\Exception $e) {

            return ResponseFormat::error();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            Storage::disk('public')->delete($product->product_image);
            $product->update(["deleted_at" => Carbon::now()]);
            return ResponseFormat::success(message: "Deleted Successfully.");
        } catch (\Exception $e) {
            Log::alert($e);
            return ResponseFormat::error();
        }
    }
}
