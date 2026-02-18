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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();

            // owner (logged-in user)
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // form fields
            $table->string('phone')->nullable();
            $table->dateTime('scheduled_at'); // combine date+time

            $table->string('project');
            $table->string('purpose')->default('Consultation');
            $table->text('details')->nullable();

            $table->enum('mode', ['online', 'f2f'])->default('online');
            $table->enum('approval_status', ['pending', 'accepted', 'declined'])->default('pending');

            $table->string('meeting_link')->nullable();
            $table->string('location')->nullable();

            $table->text('admin_note')->nullable();
            $table->text('meeting_notes')->nullable();

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
