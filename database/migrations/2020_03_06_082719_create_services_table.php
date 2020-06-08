<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->uuid('service_id')->unique();
            $table->string('service_name', 50);
            $table->string('description', 500);
            $table->decimal('reduced_price', 10, 2)->nullable();
            $table->decimal('price', 10, 2);
            $table->string('image', 150);
            $table->integer('store_id')->unsigned();
            $table->foreign('store_id')->references('store_id')->on('stores');
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
        Schema::dropIfExists('services');
    }
}
