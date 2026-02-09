<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DocumentController;

use App\Http\Controllers\Admin\AdminAppointmentController;
use App\Http\Controllers\Admin\AdminDocumentController;

Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());

Route::middleware('auth:sanctum')->group(function () {
    // appointments
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);

    // documents (client)
    Route::get('/documents', [DocumentController::class, 'index']);
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
});
