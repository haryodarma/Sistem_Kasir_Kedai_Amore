<?php

namespace App\Http\Helpers;

use Illuminate\Http\JsonResponse;



class ResponseFormat
{
    /**
     * Success response (200)
     */
    public static function success($data = null, string $message = 'Success'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], 200);
    }

    /**
     * Created response (201)
     */
    public static function created($data = null, string $message = 'Resource created successfully'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], 201);
    }

    /**
     * Accepted response (202)
     */
    public static function accepted(string $message = 'Request accepted'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message
        ], 202);
    }

    /**
     * No Content response (204)
     */
    public static function noContent(): JsonResponse
    {
        return response()->json([], 204);
    }

    /**
     * Bad Request response (400)
     */
    public static function badRequest(string $message = 'Bad request', $errors = null): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], 400);
    }

    /**
     * Unauthorized response (401)
     */
    public static function unauthorized(string $message = 'Unauthorized'): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message
        ], 401);
    }

    /**
     * Forbidden response (403)
     */
    public static function forbidden(string $message = 'Forbidden'): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message
        ], 403);
    }

    /**
     * Not Found response (404)
     */
    public static function notFound(string $message = 'Resource not found'): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message
        ], 404);
    }

    /**
     * Validation Error response (422)
     */
    public static function validationError($errors, string $message = 'Validation failed'): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], 422);
    }

    /**
     * Internal Server Error response (500)
     */
    public static function error(string $message = 'Internal server error', $errors = null): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], 500);
    }

    /**
     * Custom response with any status code
     */
    public static function custom($data, string $message, int $statusCode = 200): JsonResponse
    {
        $success = $statusCode >= 200 && $statusCode < 300;

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }
}