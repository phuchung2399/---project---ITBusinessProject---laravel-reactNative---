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
     * selectStore
     * selectStore select all  store
     * @return object
     **/
    function selectStore()
    {
        return $this->store::all();
    }

    /**
     * selectStoreByPhone
     * selectStoreByPhone select a phone for login store
     * @param store
     * @return object
     **/
    function selectStoreByPhone($phone)
    {
        return  $this->store::where('phone', $phone)->first();
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
     * @return TrueOrFalse
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
     * @return object
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
     * @return object
     **/
    function selectManyStoreByEmail($email)
    {
        return $this->store::where('email', $email)->get();
    }

    /**
     * selectStoreByStar
     * selectStoreByStar select store by star
     * @param star
     * @return object
     **/
    function selectStoreByStar($star)
    {
        return $this->store::where([['star', '=', $star], ['auth', '=', 'store']])->orderByDesc('point_search')->get();
    }

    /**
     * checkStoreByEmail
     * checkStoreByEmail check exists of EMAIL
     * @param email
     *  @return TrueOrFalse
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
     * @param object
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
     * @return object
     **/
    function selectStoreById($id)
    {
        return $this->store::find($id);
    }

    /**
     * selectAllStore
     * selectAllStore *select all store
     * @return object
     **/
    function selectAllStore()
    {
        return $this->store::where('auth', '=', 'store')->orderByDesc('star')->get();
    }

    /**
     * searchStore
     * searchStore select a store by key on client
     * @param string
     * @return object
     **/
    function searchStoreSortPointSearch($string)
    {
        return $this->store::where([['store_name', 'LIKE', "%{$string}%"], ['auth', '=', 'store']])->orderByDesc('point_search')->limit(5)->get();
    }

    /**
     * searchStoreSortStar
     * searchStoreSortStar select a store by key on client
     * @param string
     * @return object
     **/
    function searchStoreSortStar($string)
    {
        return $this->store::where([['store_name', 'LIKE', "%{$string}%"], ['auth', '=', 'store']])->orderByDesc('star')->get();
    }

    /**
     * searchStoreSortStarLimit
     * searchStoreSortStarLimit select a store sort by star limit 5
     * @param string
     * @return object
     **/
    function searchStoreSortStarLimit()
    {
        return $this->store::where('auth', '=', 'store')->orderByDesc('star')->limit(5)->get();
    }

    /**
     * searchStoreSortStarLimit
     * searchStoreSortStarLimit select a store sort by star limit 5
     * @param string
     * @return object
     **/
    function searchStoreNewLimit()
    {
        return $this->store::where('auth', '=', 'store')->orderByDesc('created_at')->orderByDesc('point_search')->limit(5)->get();
    }
}
