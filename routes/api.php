<?php

use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BedenganController;
use App\Http\Controllers\Api\CampingGroundController;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\MitigationReportController;
use App\Http\Controllers\Api\RouteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/health', [HealthController::class, 'show']);
Route::get('/camping-grounds', [CampingGroundController::class, 'publicIndex']);

Route::prefix('auth')->middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'store']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'show']);
    Route::get('/user', [AuthController::class, 'show']);
    Route::get('/bedengans', [BedenganController::class, 'index']);
    Route::get('/bedengans/{bedengan}', [BedenganController::class, 'show']);
    Route::get('/route', [RouteController::class, 'show']);
    Route::post('/mitigation-reports', [MitigationReportController::class, 'store']);

    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'show']);
        Route::get('/camping-grounds', [CampingGroundController::class, 'adminIndex']);
        Route::post('/camping-grounds', [CampingGroundController::class, 'store']);
        Route::put('/camping-grounds/{campingGround}', [CampingGroundController::class, 'update']);
        Route::delete('/camping-grounds/{campingGround}', [CampingGroundController::class, 'destroy']);
        Route::get('/mitigation-reports', [MitigationReportController::class, 'index']);
        Route::put('/mitigation-reports/{mitigationReport}', [MitigationReportController::class, 'update']);
    });
});
