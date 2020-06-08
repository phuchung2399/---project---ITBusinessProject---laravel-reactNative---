<?php

namespace App\Repositories;

use App\Models\Voucher;

class VoucherRepository
{
    private $voucher;

    function __construct(Voucher $voucher)
    {
        $this->voucher = $voucher;
    }

    /**
     * selectVoucher
     * selectVoucher select a voucher
     **/
    function selectVoucher()
    {
        return $this->voucher::all();
    }

    /**
     * selectVoucherById
     * selectVoucherById select a voucher by id
     * fuction support hanlde update, sendemail to reset password, login, change password
     * @param id
     **/
    function selectVoucherById($id)
    {
        return $this->voucher::find($id);
    }

    /**
     * insertVoucher
     * insertVoucher save data voucher when add voucher
     * @param voucher
     **/
    function insertVoucher($voucher)
    {
        $voucher->save();
    }

    /**
     * updateVoucher
     * updateVoucher save data voucher when update
     * @param voucher
     **/
    function updateVoucher($voucher)
    {
        $voucher->save();
    }

    /**
     * deleteVoucher
     * deleteVoucher delete data voucher
     * @param voucher
     **/
    function deleteVoucher($voucher)
    {
        $voucher->delete();
    }

    /**
     * checkVoucherById
     * checkVoucherById check exists of ID
     * @param id
     **/
    function checkVoucherById($id)
    {
        return $this->voucher::where('voucher_id', $id)->exists();
    }

    /**
     * selectManyVoucherByName
     * selectManyVoucherByName select many data have a name
     * fuction support hanlde duplicate name in database when update data voucher
     * @param name
     **/
    function selectManyVoucherByName($name)
    {
        return $this->voucher::where('voucher_name', $name)->get();
    }
}
