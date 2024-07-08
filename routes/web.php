<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Authentication routes
Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth'])->group(function () {
    Route::prefix('api')->group(function () {
        Route::get('/requests', [RequestController::class, 'index']);
        Route::post('/requests', [RequestController::class, 'store']);
        Route::put('/requests/{id}', [RequestController::class, 'update']);
        Route::delete('/requests/{id}', [RequestController::class, 'destroy']);
    });

    Route::get('/csrf-token', function() {
        return response()->json(['csrf_token' => csrf_token()]);
    });

    Route::get('/home', [HomeController::class, 'index'])->name('home');
});

require __DIR__.'/auth.php';
