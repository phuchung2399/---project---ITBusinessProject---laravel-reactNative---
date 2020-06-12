<?php

namespace App\Services;

use App\Repositories\AdminRepository;
use App\Helper\Constants\HttpStatus;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Helper\Validation; // container check validate
use App\Helper\Response; // container Response
use App\Models\Admin;

class AdminService
{
    private $adminRepository;
    private $admin;

    function __construct(AdminRepository $adminRepository, Admin $admin)
    {
        $this->adminRepository = $adminRepository;
        $this->admin = $admin;
    }

    /**
     * login
     * login for admin
     * @param $request
     **/
    function login($request)
    {
        $admin = $this->adminRepository->selectAdminByPhone($request); // get data by phone requet phone from client
        if ($admin != null) {
            if (Hash::check($request->password,  $admin->password) === true && $admin->auth == 'admin') {
                $token_admin =  $admin->createToken('token')->accessToken;
                return Response::responseLoginSuccess($token_admin, $this->hanldeDataResponse($admin), 'admin', HttpStatus::SUCCESS_RESPONSE);
            } else {
                return Response::responseMessage(HttpStatus::UNAUTHORIZED,  'Số điện thoại hoặc mật khẩu không đúng');
            }
        } else {
            return Response::responseMessage(HttpStatus::UNAUTHORIZED,  'Số điện thoại hoặc mật khẩu không đúng');
        }
    }

    /**
     * register
     * register for admin
     * @param $request
     **/
    function register($request)
    {
        $admin =  $this->hanldeRequestData($request, $this->admin);
        $password = $request->password;
        $admin->password = bcrypt($password);
        $this->adminRepository->insertAdmin($admin);
        return Response::responseMessage(HttpStatus::SUCCESS_CREATED,  "Tạo thành công thành công");
    }

    /**
     * changePasswordAdmin
     * changePasswordAdmin change password for admin
     * @param request
     * @param id
     **/
    function changePasswordAdmin($request, $id)
    {
        if ($this->adminRepository->checkAdminById($id)) {
            $admin = $this->adminRepository->selectAdminById($id);
            if (Hash::check($request->old_password,  $admin->password) === true) {
                $password = $request->password;
                $admin->password = bcrypt($password);
                $this->adminRepository->updateAdmin($admin);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Đổi mật khẩu thành công");
            } else {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Mật khẩu không đúng");
            }
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Đổi mật khẩu không thành công");
        }
    }

    /**
     * hanldeDataResponse
     * hanldeDataResponse is middlemen function to a lot of duplicate for Data Response
     * @param admin *admin from selectAdminById in AdminRepository
     **/
    function hanldeDataResponse($admin)
    {
        $data['admin_id'] = $admin->admin_id;
        $data['admin_name'] = $admin->admin_name;
        $data['phone'] = $admin->phone;
        $data['email'] = $admin->email;
        return $data;
    }

    /**
     * hanldeRequestData
     * hanldeRequestData request data from client send to on server
     * @param request
     * @param admin *admin from selectAdminById in AdminRepository
     **/
    function hanldeRequestData($request, $admin)
    {
        $admin->admin_name =  Validation::handleSpace($request->admin_name);
        $admin->phone = $request->phone;
        $admin->email = $request->email;
        return $admin;
    }

    /**
     * logout
     * logout account admin
     * @param request
     **/
    public function logout($request)
    {
        $request->user()->token()->revoke();
        return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Đăng xuất thành công");
    }

    /**
     * detail
     * detail post token and get token
     **/
    function detail()
    {
        $admin = Auth::guard('admins')->user();
        return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->hanldeDataResponse($admin));
    }

    function deleteAdmin($id)
    {
        if ($this->adminRepository->checkAdminById($id)) {
            $this->adminRepository->deleteAdmin($id);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Xóa thành công");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Xóa không thành công");
        }
    }
}
