<?php

namespace App\Http\Controllers;

use App\Services\VoucherService;
use App\Http\Requests\VoucherRequest\VoucherInsertRequest;
use App\Http\Requests\VoucherRequest\UpdateVoucherRequest;
use Illuminate\Http\Request;

class VoucherController extends Controller
{

    private $voucherService;

    function __construct(VoucherService $voucherService)
    {
        $this->voucherService = $voucherService;
    }

    /**
     * @OA\Get(
     *      path="/api/v1/voucher",
     *      summary="get all voucher",
     *      tags={"voucher"},
     *      operationId="voucher_get",
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
    public function getVouchers()
    {
        return $this->voucherService->selectVoucher();
    }

    /**
     * @OA\Get(
     *      path="/api/v1/voucher-to-user",
     *      summary="get all voucher to user application",
     *      tags={"voucher"},
     *      operationId="voucher_get_to_user_app",
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
    public function getVouchersToUser()
    {
        return $this->voucherService->selectVoucherToUser();
    }

    /**
     * @OA\Get(
     *      path="/api/v1/voucher/{id}",
     *      summary="get voucher by id",
     *      tags={"voucher"},
     *      operationId="voucher_get_by_id",
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
    public function getVoucherById($id)
    {
        return $this->voucherService->selectVouvherById($id);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/voucher",
     *      summary="Create voucher",
     *      tags={"voucher"},
     *      operationId="voucher_post",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="voucher_name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="interger"
     *                 ),
     *                 @OA\Property(
     *                     property="quantity",
     *                     type="interger"
     *                 ),
     *                 example={
     *                      "voucher_name": "ILOVEYOU",
     *                      "price":"5000",
     *                      "quantity": "500"
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
    function postVoucher(VoucherInsertRequest $request)
    {
        return $this->voucherService->insertVoucher($request);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/voucher/{id}",
     *      summary="Update voucher",
     *      tags={"voucher"},
     *      operationId="voucher_put",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          )
     *      ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="voucher_name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="interger"
     *                 ),
     *                 @OA\Property(
     *                     property="quantity",
     *                     type="interger"
     *                 ),
     *                 example={
     *                      "voucher_name": "ILOVEYOU",
     *                      "price":"5000",
     *                      "quantity": "500"
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
    function putVoucher(UpdateVoucherRequest $request, $id)
    {
        return $this->voucherService->updateVoucher($request, $id);
    }

    /**
     * @OA\Delete(
     *      path="/api/v1/voucher/{id}",
     *      summary="Delete voucher ",
     *      tags={"voucher"},
     *      operationId="voucher_delete",
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
    function deleteVoucher($id)
    {
        return $this->voucherService->deleteVoucher($id);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/total-by-voucher",
     *      summary="Total apply voucher",
     *      tags={"voucher"},
     *      operationId="total_by_voucher",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="voucher_name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="total",
     *                     type="interger"
     *                 ),
     *                 example={
     *                      "voucher_name": "ILOVEYOU",
     *                      "total":"500000"
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
    function hanldeTotalByVoucher(Request $request)
    {
        return $this->voucherService->hanldeTotalByVoucher($request);
    }
}
