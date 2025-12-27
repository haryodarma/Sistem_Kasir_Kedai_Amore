<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseFormat;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(UserRequest $request)
    {
        try {
            $validated = $request->validated();
            $user = \App\Models\User::create($validated);
            return ResponseFormat::success($user);
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }
    public function login(Request $request)
    {
        try {
            $credentials = $request->only('username', 'password');

            if (
                !$token = JWTAuth::claims([
                    'role' => User::where('username', $credentials['username'])->value('role'),
                    'login_at' => now()->timestamp,
                ])->attempt($credentials)
            ) {
                return ResponseFormat::error('Invalid credentials', 401);
            }

            return ResponseFormat::success(['token' => $token]);
        } catch (\Exception $e) {
            return ResponseFormat::error('Login failed', 500);
        }
    }


    public function refreshToken()
    {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            return ResponseFormat::success(['token' => $newToken]);
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return ResponseFormat::success();
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }

    public function checkCredentials()
    {
        return ResponseFormat::success();
    }
}
