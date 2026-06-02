<?php

use App\Http\Controllers\LeadController;
use App\Http\Controllers\Admin\AdminApiController;
use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\SettingController;
use Illuminate\Support\Facades\Route;

Route::post('/leads', [LeadController::class, 'store']);

// Admin auth (public)
Route::post('/admin/login',  [AdminApiController::class, 'login']);
Route::post('/admin/logout', [AdminApiController::class, 'logout']);

// Public settings (for landing page)
Route::get('/settings/{key}', [SettingController::class, 'show']);

// Admin protected routes
Route::middleware(\App\Http\Middleware\AdminTokenMiddleware::class)
    ->prefix('admin')
    ->group(function () {
        Route::get('/stats',              [AdminApiController::class, 'stats']);
        Route::get('/leads/export',       [AdminApiController::class, 'export']);
        Route::get('/leads',              [AdminApiController::class, 'leads']);
        Route::delete('/leads/{id}',      [AdminApiController::class, 'destroy']);
        Route::post('/leads/bulk-destroy',[AdminApiController::class, 'bulkDestroy']);
        Route::put('/settings/{key}',          [SettingController::class, 'update']);
        Route::get('/accounts',                [AccountController::class, 'index']);
        Route::post('/accounts',               [AccountController::class, 'store']);
        Route::delete('/accounts/{id}',        [AccountController::class, 'destroy']);
        Route::put('/accounts/{id}/password',  [AccountController::class, 'updatePassword']);
    });
