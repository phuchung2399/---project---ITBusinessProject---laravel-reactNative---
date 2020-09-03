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

    /**
     * @OA\Post(
     *      path="/api/v1/order",
     *      summary="Create order - booking service",
     *      tags={"order"},
     *      operationId="post_order",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="address",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="order_day",
     *                     type="interger",
     *                 ),
     *                 @OA\Property(
     *                     property="order_time",
     *                     type="interger",
     *                 ),
     *                 @OA\Property(
     *                     property="total",
     *                     type="interger",
     *                 ),
     *                 @OA\Property(
     *                     property="note",
     *                     type="interger",
     *                 ),
     *                 @OA\Property(
     *                     property="store",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="service",
     *                     type="object",
     *                 ), 
     
     *                 example={
     *                      "address": "101b le huu trac",
     *                      "total": 150000,
     *                      "note": "không biết nói gì",
     *                      "voucher_name": "",
     *                      "store": 22222224,
     *                      "order_time":"19:59:00",
     *                      "order_day":"2020-06-27",
     *                      "service": {
     *                          {
     *                              "service_id": "3891672d-1362-49a6-b986-81eaead53b46",
     *                              "service_name" : "nail mạ vàng mã",
     *                              "description" : "đính vàng mà",
     *                              "price" : 10000000,
     *                              "image" : "https://drive.google.com/uc?export=view&id=15PxcuUtA6hXhJm3IMDIN56MN7tDT-2LW",
     *                              "store_id" : "22222224"
     *                           },
     *                          {
     *                              "service_id": "3891672d-1362-49a6-b986-81eaead53b46",
     *                              "service_name" : "nail mạ vàng mã",
     *                              "description" : "đính vàng mà",
     *                              "price" : 10000000,
     *                              "image" : "https://drive.google.com/uc?export=view&id=15PxcuUtA6hXhJm3IMDIN56MN7tDT-2LW",
     *                              "store_id" : "22222224"
     *                           }
     *                       },
     *                  }
     *             )
     *         )
     *     ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function insertOrder(OrderInsertRequest $request)
    {
        return $this->orderService->insertOrder($request);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/order-detail/{id}",
     *      summary="get detail order of store",
     *      tags={"order"},
     *      operationId="get_order_store_by_id",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          )
     *      ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function selectDetailOrderById($id)
    {
        return $this->orderService->selectDetailOrderById($id);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/order-store",
     *      summary="get all order of store",
     *      tags={"order"},
     *      operationId="get_order_store",
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function selectOrderShop()
    {
        return $this->orderService->selectOrderShop();
    }

    /**
     * @OA\Get(
     *      path="/api/v1/order-user",
     *      summary="get all arder of user",
     *      tags={"order"},
     *      operationId="get_order_user",
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function selectOrderUser()
    {
        return $this->orderService->selectOrderOfUser();
    }

    /**
     * @OA\Post(
     *      path="/api/v1/order-confirm/{id}",
     *      summary="confirm order of user",
     *      tags={"order"},
     *      operationId="confirm_order",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          )
     *      ),
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function confirmOrderFromStore($id)
    {
        return $this->orderService->confirmOrderFromStore($id);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/order-cancel/{id}",
     *      summary="cancel order from user",
     *      tags={"order"},
     *      operationId="cancel_order",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          )
     *      ),
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function cancelOrderFromUser($id)
    {
        return $this->orderService->cancelOrderFromUser($id);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/order-refuse/{id}",
     *      summary="refuse order from store",
     *      tags={"order"},
     *      operationId="refuse_order",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          )
     *      ),
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function refuseOrderFromStore($id)
    {
        return $this->orderService->refuseOrderFromStore($id);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/order-finish/{id}",
     *      summary="finish order from store",
     *      tags={"order"},
     *      operationId="finish_order",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          )
     *      ),
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function confirmFinishOrderFromStore($id)
    {
        return $this->orderService->confirmFinishOrderFromStore($id);
    }

    function selectOrder(Request $request)
    {
        return $this->orderService->selectOrder($request);
    }

    function chartCountUser()
    {
        return $this->orderService->chart();
    }
}
