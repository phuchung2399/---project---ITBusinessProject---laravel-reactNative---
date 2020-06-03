<?php

namespace App\Repositories;

use App\Models\Store;

class StoreRepository
{
    private $store;

    function __construct(Store $store)
    {
        $this->store = $store;
    }

    /**
     * selectStoreByPhone
     * selectStoreByPhone select a phone for login store
     * @param store
     **/
    function selectStoreByPhone($store)
    {
        return  $this->store::where('phone', $store->phone)->first();
    }

    /**
     * insertStore
     * insertStore save data store when register
     * @param store
     **/
    function insertStore($store)
    {
        $store->save();
    }

    /**
     * updateStore
     * updateStore save data store when update
     * @param store
     **/
    function updateStore($store)
    {
        $store->save();
    }

    /**
     * checkStoreById
     * checkStoreById check exists of ID
     * @param id
     **/
    function checkStoreById($id)
    {
        return $this->store::where('store_id', $id)->exists();
    }

    /**
     * selectStoreByPhone
     * selectManyStoreByPhone select many data have a phone
     * fuction support hanlde duplicate phone in database when update data store
     * @param phone
     **/
    function selectManyStoreByPhone($phone)
    {
        return $this->store::where('phone', $phone)->get();
    }

    /**
     * selectManyStoreByEmail
     * selectManyStoreByEmail select many data have a email
     * fuction support hanlde duplicate email in database when update data store
     * @param email
     **/
    function selectManyStoreByEmail($email)
    {
        return $this->store::where('email', $email)->get();
    }

    /**
     * checkStoreByEmail
     * checkStoreByEmail check exists of EMAIL
     * @param email
     **/
    function checkStoreByEmail($email)
    {
        return $this->store::where('email', $email)->exists();
    }

    /**
     * selectStoreByEmail
     * selectStoreByEmail select a data have a email
     * fuction support hanlde send email to resetpassword
     * @param email
     **/
    function selectStoreByEmail($email)
    {
        return $this->store::where('email', $email)->first();
    }

    /**
     * selectStoreById
     * selectStoreById select a store by id
     * fuction support hanlde update, sendemail to reset password, login, change password
     * @param id
     **/
    function selectStoreById($id)
    {
        return $this->store::find($id);
    }
}
