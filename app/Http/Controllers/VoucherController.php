<?php

namespace App\Http\Controllers;

use App\Services\VoucherService;
use App\Http\Requests\VoucherRequest\VoucherRequest;
use App\Http\Requests\VoucherRequest\UpdateVoucherRequest;

class VoucherController extends Controller
{

    private $voucherService;

    function __construct(VoucherService $voucherService)
    {
        $this->voucherService = $voucherService;
    }

    public function getVouchers()
    {
        return $this->voucherService->selectVoucher();
    }

    public function getVoucherById($id)
    {
        return $this->voucherService->selectVouvherById($id);
    }

    function postVoucher(VoucherRequest $request)
    {
        return $this->voucherService->insertVoucher($request);
    }

    function putVoucher(UpdateVoucherRequest $request, $id)
    {
        return $this->voucherService->updateVoucher($request, $id);
    }

    function deleteVoucher($id)
    {
        return $this->voucherService->deleteVoucher($id);
    }
}
