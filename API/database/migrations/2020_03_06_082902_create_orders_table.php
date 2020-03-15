<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('order_id')->unique();
            $table->string('address', 500)->nullable();
            $table->decimal('total', 5, 2);
            $table->string('note', 500);
            $table->integer('store_id')->unsigned();
            $table->foreign('store_id')->references('store_id')->on('stores');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->uuid('service_id');
            $table->foreign('service_id')->references('service_id')->on('services');
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
        Schema::dropIfExists('orders');
    }
}
