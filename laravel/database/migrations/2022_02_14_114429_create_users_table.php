<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            /*
            Para solucionar el problema Error Base table or view already exists: 1050 Table 'users' already exists
                También se puede usar tinker

                Here are the steps I took to solve the same issue:
                In the console I wrote php artisan tinker
                Then, again in the console, Schema::drop('users')
                At the end php artisan migrate and it all worked.
                */
            Schema::dropIfExists('users');
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->foreignId('id_companys')->constrained('companys')->cascadeOnDelete();
            $table->foreignId('id_permissions')->constrained('permissions')->cascadeOnDelete();;
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
