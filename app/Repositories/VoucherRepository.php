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
     * @return object 
     **/
    function selectVoucher()
    {
        return $this->voucher::all();
    }

    /**
     * selectVoucherToUser
     * selectVoucherToUser select a voucher have quantity more large than 0
     * @return object 
     **/
    function selectVoucherToUser()
    {
        return $this->voucher::where('quantity', '>', '0')->get();
    }

    /**
     * selectVoucherById
     * selectVoucherById select a voucher by id
     * fuction support hanlde update, sendemail to reset password, login, change password
     * @param id
     * @return object 
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
    function deleteVoucher($id)
    {
        ($this->voucher::find($id))->delete();
    }

    /**
     * checkVoucherById
     * checkVoucherById check exists of ID
     * @param id
     * @return TrueofFalse
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
     * @return object 
     **/
    function selectManyVoucherByName($name)
    {
        return $this->voucher::where('voucher_name', $name)->get();
    }

     /**
     * searchStore
     * searchStore select a store by key on client
     * @param string
     * @return object
     **/
    function selectVoucherByName($string)
    {
        return $this->voucher::where('voucher_name', '=', $string)->get();
    }
}
