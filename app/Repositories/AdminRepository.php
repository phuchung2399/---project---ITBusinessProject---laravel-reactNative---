<?php

namespace App\Repositories;

use App\Models\Admin;

class AdminRepository
{
    private $admin;

    function __construct(Admin $admin)
    {
        $this->admin = $admin;
    }

    /**
     * insertStore
     * insertStore save data store when register
     * @param admin *data request from client
     **/
    function insertAdmin($admin)
    {
        $admin->save();
    }

    /**
     * updateAdmin
     * updateAdmin save data when update
     * @param admin *data request from client
     **/
    function updateAdmin($admin)
    {
        $admin->save();
    }

    /**
     * selectStoreByPhone
     * selectStoreByPhone select a phone for login store
     * @param  *data request from client
     * @return object
     **/
    function selectAdminByPhone($phone)
    {
        return $this->admin::where('phone', $phone)->first();
    }

    /**
     * selectStoreByPhone
     * selectStoreByPhone select a phone for login store
     * @param id
     * @return object
     **/
    function selectAdminById($id)
    {
        return $this->admin::where('admin_id', $id)->first();
    }

    /**
     * selectStoreByPhone
     * selectStoreByPhone select a phone for login store
     * @param store
     * @return TrueOrFalse
     **/
    function checkAdminById($id)
    {
        return $this->admin::where('admin_id', $id)->exists();
    }

    /**
     * deleteAdmin
     * deleteAdmin delete account admin
     **/
    function deleteAdmin($id)
    {
        ($this->admin::find($id))->delete();
    }
}
