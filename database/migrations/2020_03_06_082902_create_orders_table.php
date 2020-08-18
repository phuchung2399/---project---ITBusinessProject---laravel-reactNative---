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
            $table->time('order_time')->format('H:i');
            $table->date('order_day')->format('dd-mm-YYYY');
            $table->decimal('total', 10, 2);
            $table->string('note', 500);
            $table->string('voucher_name')->nullable();
            $table->integer('store_id')->unsigned();
            $table->foreign('store_id')->references('store_id')->on('stores');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->integer('massage_id')->unsigned();
            $table->foreign('massage_id')->references('massage_id')->on('massages');
            $table->string('address', 500)->nullable();
            $table->boolean('at_home')->nullable();
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
