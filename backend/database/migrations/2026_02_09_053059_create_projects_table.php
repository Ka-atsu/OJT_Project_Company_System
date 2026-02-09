<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            // client is a user
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            $table->string('name');
            $table->enum('status', ['draft', 'active', 'on_hold', 'completed'])->default('draft');

            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();

            $table->unsignedInteger('budget')->default(0);        // integer pesos (simple)
            $table->unsignedTinyInteger('progress')->default(0);  // 0-100

            $table->text('description')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
