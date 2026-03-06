<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicProjectController;
use App\Http\Controllers\Auth\UserController;

use App\Http\Controllers\Admin\AdminAppointmentController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminDocumentController;
use App\Http\Controllers\Admin\AdminProjectController;

Route::post('/contact', [ContactController::class, 'send']);
Route::get('/projects/showcase', [PublicProjectController::class, 'showcase']);

Route::middleware('auth:sanctum')->group(function () {
    // user
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::put('/user/email', [UserController::class, 'updateEmail']);
    Route::put('/user/password', [UserController::class, 'updatePassword']);
    Route::put('/user/2fa', [UserController::class, 'toggleTwoFactor']);
    Route::patch('/user/notifications', [UserController::class, 'toggleNotifications']);
    Route::post('/user/email/send-verification', [UserController::class, 'sendVerification']);
    Route::post('/user/email/verify', [UserController::class, 'verifyEmail']);
    Route::post('/user/2fa/send', [UserController::class, 'sendTwoFactorCode']);
    Route::post('/user/2fa/verify', [UserController::class, 'verifyTwoFactorCode']);
    Route::delete('/user', [UserController::class, 'destroy']);

    // client appointments
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);

    // client documents
    Route::get('/documents', [DocumentController::class, 'index']);

    // client projects
    Route::get('/projects', [ProjectController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // admin dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'show']);

    // admin appointments
    Route::get('/appointments', [AdminAppointmentController::class, 'index']);
    Route::patch('/appointments/{appointment}', [AdminAppointmentController::class, 'update']);

    // admin documents
    Route::get('/documents', [AdminDocumentController::class, 'index']);
    Route::get('/documents/clients', [AdminDocumentController::class, 'clients']);
    Route::get('/clients/{user}/documents', [AdminDocumentController::class, 'clientDocuments']);
    Route::post('/documents', [AdminDocumentController::class, 'store']);
    Route::patch('/documents/{document}', [AdminDocumentController::class, 'update']);
    Route::delete('/documents/{document}', [AdminDocumentController::class, 'destroy']);

    // admin projects
    Route::get('/projects', [AdminProjectController::class, 'index']);
    Route::get('/projects/clients', [AdminProjectController::class, 'clients']);
    Route::get('/projects/{project}', [AdminProjectController::class, 'show']);
    Route::post('/projects', [AdminProjectController::class, 'store']);
    Route::patch('/projects/{project}', [AdminProjectController::class, 'update']);
    Route::delete('/projects/{project}', [AdminProjectController::class, 'destroy']);
    Route::delete('/projects/photos/{photo}', [AdminProjectController::class, 'destroyPhoto']);
});
