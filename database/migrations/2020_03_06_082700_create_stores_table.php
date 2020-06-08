<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->Increments('store_id')->unsigned()->unique();
            $table->string('store_name', 50);
            $table->string('phone', 10);
            $table->string('email', 50)->unique();
            $table->string('password');
            $table->string('address', 50);
            $table->time('open_time')->format('H:i');
            $table->time('close_time')->format('H:i');
            $table->string('image', 150);
            $table->string('status', 10)->nullable(); // check status store: activity, busy, offline
            $table->uuid('location_id');
            $table->foreign('location_id')->references('location_id')->on('locations');
            $table->string('auth', 10)->nullable();
            $table->timestamps();
        });
        DB::update('ALTER TABLE stores AUTO_INCREMENT = 22222222;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stores');
    }
}
