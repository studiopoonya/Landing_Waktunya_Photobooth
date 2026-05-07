<?php

use App\Http\Controllers\LeadController;
use App\Http\Controllers\Admin\AdminApiController;
use Illuminate\Support\Facades\Route;

Route::post('/leads', [LeadController::class, 'store']);

// Admin auth (public)
Route::post('/admin/login',  [AdminApiController::class, 'login']);
Route::post('/admin/logout', [AdminApiController::class, 'logout']);

// Admin protected routes
Route::middleware(\App\Http\Middleware\AdminTokenMiddleware::class)
    ->prefix('admin')
    ->group(function () {
        Route::get('/stats',              [AdminApiController::class, 'stats']);
        Route::get('/leads/export',       [AdminApiController::class, 'export']);
        Route::get('/leads',              [AdminApiController::class, 'leads']);
        Route::delete('/leads/{id}',      [AdminApiController::class, 'destroy']);
        Route::post('/leads/bulk-destroy',[AdminApiController::class, 'bulkDestroy']);
    });
