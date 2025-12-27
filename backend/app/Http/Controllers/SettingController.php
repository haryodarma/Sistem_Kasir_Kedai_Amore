<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseFormat;
use App\Http\Requests\SettingRequest;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return ResponseFormat::success(Setting::all());
        } catch (\Exception $e) {
            if (env('APP_ENV') == 'debug') {
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
    public function store(SettingRequest $request)
    {
        try {

            $validated = $request->validated();
            $setting = Setting::create($validated);
            return ResponseFormat::success($setting);
        } catch (\Exception $e) {
            if (env('APP_ENV') == 'debug') {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        return ResponseFormat::success($setting);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SettingRequest $request, Setting $setting)
    {
        try {
            $validated = $request->validated();
            $setting->update($validated);
            return ResponseFormat::success($setting);
        } catch (\Exception $e) {
            if (env('APP_ENV') == 'debug') {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }
    /* Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        try {
            $setting->delete();
            return ResponseFormat::success(message: 'Setting deleted successfully');
        } catch (\Exception $e) {
            if (env('APP_ENV') == 'debug') {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }
}
