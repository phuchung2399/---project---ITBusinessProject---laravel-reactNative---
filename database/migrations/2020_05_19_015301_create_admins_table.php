<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            //   $table->uuid('id')->unique();
            $table->Increments('admin_id')->unsigned()->unique();
            $table->string('admin_name', 20);
            $table->string('email', 50);
            $table->string('phone', 10);
            $table->string('password');
            $table->string('auth', 10)->nullable();
            $table->timestamps();
        });
        DB::update('ALTER TABLE users AUTO_INCREMENT = 909090;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
