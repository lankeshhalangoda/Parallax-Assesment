<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});

// Authentication routes
Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth'])->group(function () {

    Route::get('/home', [HomeController::class, 'index'])->name('home');

    //The below routes are secured with authentication middleware

    // Route::prefix('api')->group(function () {
    //     Route::get('/requests', [RequestController::class, 'index']);
    //     Route::patch('/requests/{id}', [RequestController::class, 'update']);
    //     Route::delete('/requests/{id}', [RequestController::class, 'destroy']);
    //     Route::post('/requests', [RequestController::class, 'store']);
    // });
});

// The below routes are for API Testing (took out from middleware)

Route::prefix('api')->group(function () {

    Route::get('/requests', [RequestController::class, 'index']);
    Route::post('/requests', [RequestController::class, 'store']);
    Route::post('/requests/{id}', [RequestController::class, 'update']);
    Route::patch('/requests/{id}', [RequestController::class, 'update']);
    Route::delete('/requests/{id}', [RequestController::class, 'destroy']);


});



require __DIR__.'/auth.php';
