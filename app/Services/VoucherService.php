<?php

namespace App\Services;

use App\Repositories\VoucherRepository;
use App\Helper\Constants\HttpStatus;
use App\Helper\Validation; // container check validate
use App\Helper\Response;  // container Response
use App\Models\Voucher;
use Ramsey\Uuid\Uuid;

class VoucherService
{
    private $voucherRepository;
    private $voucher;

    function __construct(VoucherRepository $voucherRepository, Voucher $voucher)
    {
        $this->voucherRepository = $voucherRepository;
        $this->voucher = $voucher;
    }

    /**
     * selectVoucher
     * selectVoucher select on voucher
     **/
    function selectVoucher()
    {
        return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->voucherRepository->selectVoucher());
    }

    /**
     * selectVouvherById
     * selectVouvherById select on voucher by ID
     * @param id
     **/
    function selectVouvherById($id)
    {
        if ($this->voucherRepository->checkVoucherById($id)) {
            return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->voucherRepository->selectVoucherById($id));
        } else {
            return Response::responseMessage(HttpStatus::NOT_FOUND,  "Không tìm thấy");
        }
    }

    /**
     * insertVoucher
     * insertVoucher save data when add voucher
     * @param request
     **/
    function insertVoucher($request)
    {
        $voucher = $this->voucher;
        $voucher->voucher_id = Uuid::uuid4();
        $voucher->voucher_name = Validation::handleSpace($request->voucher_name);
        $voucher->price = $request->price;
        $voucher->quantity = $request->quantity;
        $this->voucherRepository->insertVoucher($voucher);
        return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Đã tạo thành công");
    }

    /**
     * updateVoucher
     * updateVoucher save data when add update voucher
     * @param request
     * @param id
     **/
    function updateVoucher($request, $id)
    {
        if ($this->voucherRepository->checkVoucherById($id)) {
            $voucher = $this->voucher::find($id);
            if ($voucher->voucher_name == $request->voucher_name) {
                var_dump("1");
                return $this->handleUpdateVoucher($voucher, $request);
            } elseif (count($this->voucherRepository->selectManyVoucherByName($request->voucher_name)) >= 1) {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Mã đã tồn tại");
            } else {
                return $this->handleUpdateVoucher($voucher, $request);
            }
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Cập nhập không thành công");
        }
    }

    /**
     * handleUpdateVoucher
     * handleUpdateVoucher is middlemen function to a lot of duplicate for update
     * @param request
     * @param voucher *voucher from  $this->voucher::find($id);
     **/
    function handleUpdateVoucher($voucher, $request)
    {
        $voucher->voucher_name = Validation::handleSpace($request->voucher_name);
        $voucher->price = $request->price;
        $voucher->quantity = $request->quantity;
        $this->voucherRepository->updateVoucher($voucher);
        return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, "Cập nhập thành công");
    }

    /**
     * deleteVoucher
     * deleteVoucher delete voucher
     * @param id
     **/
    function deleteVoucher($id)
    {
        if ($this->voucherRepository->checkVoucherById($id)) {
            $voucher = $this->voucher;
            $voucher = $this->voucher::find($id);
            $this->voucherRepository->deleteVoucher($voucher);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Deleted successfully");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Delete failed");
        }
    }
}
