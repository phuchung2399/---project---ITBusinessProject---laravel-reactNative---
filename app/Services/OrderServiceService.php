<?php

namespace App\Services;

use App\Repositories\OrderServiceRepository;
use App\Helper\Constants\HttpStatus;
use Illuminate\Support\Carbon;
use App\Helper\Response; // container Response
use Ramsey\Uuid\Uuid;


class OrderServiceService
{
    private $orderServiceRepository;

    function __construct(OrderServiceRepository $orderServiceRepository)
    {
        $this->orderServiceRepository = $orderServiceRepository;
    }

    function insertOrderServiceUser($service, $order_id)
    {
        try {
            $orderService = array();
            foreach ($service as $value) {
                $orderService[] = [
                    'order_services_id' => Uuid::uuid4(),
                    'service_id' => $value["service_id"],
                    'order_id' =>  $order_id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ];
            }
            $this->orderServiceRepository->insertOrderServices($orderService);
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }
}
