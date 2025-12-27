<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseFormat;
use App\Http\Requests\RawRequest;
use App\Models\Raw;

class RawController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return ResponseFormat::success(Raw::paginate(15));
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
    public function store(RawRequest $request)
    {
        try {
            $validated = $request->validated();
            $raw = Raw::create($validated);
            return ResponseFormat::success($raw);
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
    public function show(Raw $raw)
    {
        try {
            return ResponseFormat::success($raw);
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
    public function edit(Raw $raw)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RawRequest $request, Raw $raw)
    {
        try {

            $validated = $request->validated();
            $raw->update($validated);
            return ResponseFormat::success($raw);
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
    public function destroy(Raw $raw)
    {
        try {
            $raw->delete();
            return ResponseFormat::success("Deleted successfully");
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }
}
