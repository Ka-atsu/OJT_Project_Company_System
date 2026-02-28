<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();

            // Who performed the action
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // Type of model affected
            $table->string('type')->nullable();
            // example: appointment, project, document

            // Action performed
            $table->string('action');
            // example: created, updated, approved, deleted

            // Human readable message
            $table->text('description');

            // Related model reference
            $table->unsignedBigInteger('related_id')->nullable();
            $table->string('related_type')->nullable();
            // example: Appointment, Project, Document

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
