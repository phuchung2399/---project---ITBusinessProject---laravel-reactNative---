<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\Request;
use App\Http\Requests\OrderRequest\OrderInsertRequest;

class OrderController extends Controller
{
    private $orderService;

    function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    function insertOrder(OrderInsertRequest $request)
    {
        return $this->orderService->insertOrder($request);
    }

    function selectDetailOrderById($id)
    {
        return $this->orderService->selectDetailOrderById($id);
    }

    function selectOrderShop()
    {
        return $this->orderService->selectOrderShop();
    }

    function selectOrderUser()
    {
        return $this->orderService->selectOrderOfUser();
    }

    function confirmOrderFromStore($id)
    {
        return $this->orderService->confirmOrderFromStore($id);
    }

    function cancelOrderFromUser($id)
    {
        return $this->orderService->cancelOrderFromUser($id);
    }

    function refuseOrderFromStore($id)
    {
        return $this->orderService->refuseOrderFromStore($id);
    }

    function confirmFinishOrderFromStore($id)
    {
        return $this->orderService->confirmFinishOrderFromStore($id);
    }

    function selectOrder(Request $request)
    {
        return $this->orderService->selectOrder($request);
    }
}
