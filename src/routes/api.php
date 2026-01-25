<?php

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

Route::get('/categories', [CategoryController::class, 'index']);
