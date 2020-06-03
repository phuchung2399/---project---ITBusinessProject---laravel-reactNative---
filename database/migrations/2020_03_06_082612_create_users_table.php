<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


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
            //   $table->uuid('id')->unique();
            $table->Increments('user_id')->unsigned()->unique();
            $table->string('avatar');
            $table->string('user_name', 20);
            $table->string('phone', 10)->unique();
            $table->string('email', 50)->unique();
            $table->string('password')->unique();
            $table->string('auth', 10)->nullable();
            $table->timestamps();
        });
        DB::update('ALTER TABLE users AUTO_INCREMENT = 111111;');
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
