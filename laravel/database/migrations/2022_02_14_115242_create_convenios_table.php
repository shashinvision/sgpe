<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConveniosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('convenios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('approved_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('companys_id')->constrained('companys')->cascadeOnDelete();
            $table->foreignId('states_id')->constrained('states')->cascadeOnDelete();
            $table->string("document_path");
            $table->date('date_start');
            $table->date('date_end');
            $table->integer("state");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('convenios');
    }
}
