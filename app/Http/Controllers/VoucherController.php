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

    public function getVouchers()
    {
        return $this->voucherService->selectVoucher();
    }

    public function getVouchersToUser()
    {
        return $this->voucherService->selectVoucherToUser();
    }

    public function getVoucherById($id)
    {
        return $this->voucherService->selectVouvherById($id);
    }

    function postVoucher(VoucherInsertRequest $request)
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


    function hanldeTotalByVoucher(Request $request)
    {
        return $this->voucherService->hanldeTotalByVoucher($request);
    }
}
