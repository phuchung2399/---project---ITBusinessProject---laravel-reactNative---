<?php

namespace App\Repositories;

use App\Models\OrderService;

class OrderServiceRepository
{
    private $orderServices;

    function __construct(OrderService $orderServices)
    {
        $this->orderServices = $orderServices;
    }

    /**
     * insertOrderServices
     * insertOrderServices *save data when user insert
     * @param orderServices
     */
    function insertOrderServices($orderServices)
    {
        $this->orderServices::insert($orderServices);
    }
}
