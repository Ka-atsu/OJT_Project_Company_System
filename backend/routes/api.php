<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicProjectController;

use App\Http\Controllers\Admin\AdminAppointmentController;
use App\Http\Controllers\Admin\AdminDocumentController;
use App\Http\Controllers\Admin\AdminProjectController;
use App\Http\Controllers\Admin\AdminDashboardController;

use App\Http\Controllers\ContactController;
use App\Http\Controllers\Auth\UserPasswordController;

Route::post('/contact', [ContactController::class, 'send']);
Route::get('/projects/showcase', [PublicProjectController::class, 'showcase']);

Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/user/password', [UserPasswordController::class, 'update']);
    // appointments (client)
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);

    // documents (client)
    Route::get('/documents', [DocumentController::class, 'index']);

    // projects (client)
    Route::get('/projects', [ProjectController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // appointments (admin)
    Route::get('/appointments', [AdminAppointmentController::class, 'index']);
    Route::patch('/appointments/{appointment}', [AdminAppointmentController::class, 'update']);

    // documents (admin)
    Route::get('/documents', [AdminDocumentController::class, 'index']);
    Route::get('/documents/clients', [AdminDocumentController::class, 'clients']);
    Route::get('/clients/{user}/documents', [AdminDocumentController::class, 'clientDocuments']);
    Route::post('/documents', [AdminDocumentController::class, 'store']);
    Route::patch('/documents/{document}', [AdminDocumentController::class, 'update']);
    Route::delete('/documents/{document}', [AdminDocumentController::class, 'destroy']);

    // projects (admin)
    Route::get('/projects', [AdminProjectController::class, 'index']);
    Route::get('/projects/clients', [AdminProjectController::class, 'clients']); // users as clients
    Route::get('/projects/{project}', [AdminProjectController::class, 'show']);
    Route::post('/projects', [AdminProjectController::class, 'store']);
    Route::patch('/projects/{project}', [AdminProjectController::class, 'update']);
    Route::delete('/projects/{project}', [AdminProjectController::class, 'destroy']);
    Route::delete('/projects/photos/{photo}', [AdminProjectController::class, 'destroyPhoto']);

    // dashboard (admin)
    Route::get('/dashboard', [AdminDashboardController::class, 'show']);
});
