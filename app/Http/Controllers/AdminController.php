<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminRequest\AdminChangePassRequest;
use App\Http\Requests\AdminRequest\AdminRegisterRequest;
use App\Http\Requests\AdminRequest\AdminLoginRequest;
use App\Services\AdminService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    private $adminService;

    function __construct(AdminService $adminService)
    {
        $this->adminService =  $adminService;
    }

    function login(AdminLoginRequest $request)
    {
        return $this->adminService->login($request);
    }

    function register(AdminRegisterRequest $request)
    {
        return $this->adminService->register($request);
    }

    function changePasswordAdmin(AdminChangePassRequest $request, $id)
    {
        return $this->adminService->changePasswordAdmin($request, $id);
    }

    /**
     * detail
     * 
     * send token on serve and return data store
     **/
    public function detail()
    {
        return $this->adminService->detail();
    }

    public function logout(Request $request)
    {
        return $this->adminService->logout($request);
    }

    public function deleteAdmin($id)
    {
        return $this->adminService->deleteAdmin($id);
    }
}
