<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{

    private $order;

    function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * insertOrder
     * insertOrder *save date request from client
     * @param order
     **/
    function insertOrder($order)
    {
        $order->save();
    }

    /**
     * updateOrder
     * updateOrder *save date request update from client
     * @param order
     **/
    function updateOrder($order)
    {
        $order->save();
    }

    function selectOrderById($id)
    {
        return $this->order::find($id);
    }

    function checkOrderById($id)
    {
        return $this->order::where('order_id', $id)->exists();
    }
}
