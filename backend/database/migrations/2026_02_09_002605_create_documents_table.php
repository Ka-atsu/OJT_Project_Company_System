<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();

            // who owns the document (client user)
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // document data
            $table->string('name');                     // "Contract Agreement.pdf"
            $table->string('type');                     // Contract | Purchase Order | Report | Plan
            $table->string('shared_by')->nullable();     // "Cliberduche Corp."
            $table->date('document_date')->nullable();   // for date range filtering
            $table->string('file_path')->nullable();     // storage path (optional for now)

            $table->timestamps();

            $table->index(['user_id', 'type']);
            $table->index(['user_id', 'document_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
