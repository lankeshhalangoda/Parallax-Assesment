<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('location')->nullable();
            $table->string('service')->nullable();
            $table->string('department')->nullable();
            $table->enum('status', ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'REJECTED', 'CANCELLED'])->default('NEW');
            $table->enum('priority', ['HIGH', 'MEDIUM', 'LOW'])->default('MEDIUM');
            $table->enum('floor', ['1', '2', '3', '4', '5'])->nullable();
            $table->enum('room_unit', ['Room A', 'Room B', 'Unit 1', 'Unit 2'])->nullable();
            $table->enum('block', ['A', 'B', 'C', 'D'])->nullable();
            $table->string('guest_name')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('requested_by')->nullable();
            $table->string('assigned_to')->nullable();
            $table->string('upload_file')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
