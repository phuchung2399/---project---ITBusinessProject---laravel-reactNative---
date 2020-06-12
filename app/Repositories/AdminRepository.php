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
     * @param admin
     **/
    function insertAdmin($admin)
    {
        $admin->save();
    }

    /**
     * updateAdmin
     * updateAdmin save data when update
     * @param admin
     **/
    function updateAdmin($admin)
    {
        $admin->save();
    }

    /**
     * selectStoreByPhone
     * selectStoreByPhone select a phone for login store
     * @param store
     **/
    function selectAdminByPhone($admin)
    {
        return  $this->admin::where('phone', $admin->phone)->first();
    }

    /**
     * selectStoreByPhone
     * selectStoreByPhone select a phone for login store
     * @param store
     **/
    function selectAdminById($id)
    {
        return $this->admin::where('admin_id', $id)->first();
    }

    /**
     * selectStoreByPhone
     * selectStoreByPhone select a phone for login store
     * @param store
     **/
    function checkAdminById($id)
    {
        return $this->admin::where('admin_id', $id)->exists();
    }

    function deleteAdmin($id)
    {
        ($this->admin::find($id))->delete();
    }
}
