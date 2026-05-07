<?php

use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect()->route('admin.login'));

// Admin auth
Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.post');
Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

// Admin panel (protected)
Route::middleware(\App\Http\Middleware\AdminAuth::class)->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::delete('/leads/{lead}', [AdminController::class, 'destroy'])->name('leads.destroy');
    Route::post('/leads/bulk-delete', [AdminController::class, 'bulkDelete'])->name('leads.bulk-delete');
    Route::get('/leads/export', [AdminController::class, 'export'])->name('leads.export');
});
