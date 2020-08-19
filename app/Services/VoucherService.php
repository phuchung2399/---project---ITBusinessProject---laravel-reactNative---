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
     * @return json
     **/
    function selectVoucher()
    {
        try {
            return Response::responseSuccess($this->voucherRepository->selectVoucher());
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectVoucherToUser
     * selectVoucherToUser select on voucher to user
     * @return json
     **/
    function selectVoucherToUser()
    {
        try {
            return Response::responseSuccess($this->voucherRepository->selectVoucherToUser());
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectVouvherById
     * selectVouvherById select on voucher by ID
     * @param id
     * @return json
     **/
    function selectVouvherById($id)
    {
        try {
            if ($this->voucherRepository->checkVoucherById($id)) {
                return Response::responseSuccess($this->voucherRepository->selectVoucherById($id));
            } else {
                return Response::responseMessage(HttpStatus::NOT_FOUND,  "Không tìm thấy");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * hanldeSelectService
     * hanldeSelectService *select service
     * @param services
     * @return array
     **/
    function hanldeTotalByVoucher($request)
    {
        try {
            $voucher = $this->voucherRepository->selectVoucherByName($request->voucher_name);
            var_dump($voucher);
            if (count($voucher) == 0) {
                return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Mã không tồn tại');
            }
            if ($voucher[0]->quantity == 0) {
                return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Số lượng mã đã dùng hết');
            } else {
                $voucher[0]->quantity = $voucher[0]->quantity - 1;
                $this->voucherRepository->updateVoucher($voucher[0]);
                return Response::responseSuccess($request->total - $voucher[0]->price);
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectPriceByName
     * selectPriceByName *select price of voucher
     * @param voucher_name
     * @return number
     **/
    function selectPriceByName($voucher_name)
    {
        $voucher = $this->voucherRepository->selectVoucherByName($voucher_name);
        if (count($voucher)) {
            return $voucher[0]->price;
        } else {
            return 0;
        }
    }

    /**
     * insertVoucher
     * insertVoucher save data when add voucher
     * @param request
     * @return json
     **/
    function insertVoucher($request)
    {
        try {
            $voucher = $this->voucher;
            $voucher->voucher_id = Uuid::uuid4();
            $voucher = $this->hanldeRequst($voucher, $request);
            $this->voucherRepository->insertVoucher($voucher);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Đã tạo thành công");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateVoucher
     * updateVoucher save data when add update voucher
     * @param request
     * @param id
     * @return json
     **/
    function updateVoucher($request, $id)
    {
        try {
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
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Cập nhật không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * handleUpdateVoucher
     * handleUpdateVoucher is middlemen function to a lot of duplicate for update
     * @param request
     * @param voucher *voucher from  $this->voucher::find($id);
     * @return json
     **/
    function handleUpdateVoucher($voucher, $request)
    {
        try {
            $this->voucherRepository->updateVoucher($this->hanldeRequst($voucher, $request));
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, "Cập nhật thành công");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * deleteVoucher
     * deleteVoucher delete voucher
     * @param id
     * @return json
     **/
    function deleteVoucher($id)
    {
        try {
            if ($this->voucherRepository->checkVoucherById($id)) {
                $this->voucherRepository->deleteVoucher($id);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Xóa thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Xóa không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * handleUpdate
     * handleUpdate is middlemen function to a lot of duplicate for update
     * @param request
     * @param store *store from selectVoucherById in voucherRepository
     **/
    function hanldeRequst($voucher, $request)
    {
        $voucher->voucher_name = Validation::handleSpace($request->voucher_name);
        $voucher->price = $request->price;
        $voucher->quantity = $request->quantity;
        return $voucher;
    }
}
