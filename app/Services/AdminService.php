<?php

namespace App\Services;

use Illuminate\Database\Eloquent\ModelNotFoundException;
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
     * @return json
     **/
    function login($request)
    {
        try {
            $admin = $this->adminRepository->selectAdminByPhone($request->phone);
            if ($admin != null) {
                if ($admin->auth == 'admin' && Hash::check($request->password,  $admin->password) === true) {
                    $token_admin =  $admin->createToken('token')->accessToken;
                    return Response::responseLoginSuccess($token_admin, $this->hanldeDataResponse($admin), 'admin');
                } else {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST,  'Số điện thoại hoặc mật khẩu không đúng');
                }
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  'Số điện thoại hoặc mật khẩu không đúng');
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  $exception->getMessage());
        }
    }

    /**
     * register
     * register for admin
     * @param $request
     * @return json
     **/
    function register($request)
    {
        try {
            $admin =  $this->hanldeRequestData($request, $this->admin);
            $password = $request->password;
            $admin->password = bcrypt($password);
            $this->adminRepository->insertAdmin($admin);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED,  "Tạo thành công thành công");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  $exception->getMessage());
        }
    }

    /**
     * changePasswordAdmin
     * changePasswordAdmin change password for admin
     * @param request
     * @param id
     * @return json
     **/
    function changePasswordAdmin($request)
    {
        try {
            $admin = Auth::guard('admins')->user();
            if (Hash::check($request->old_password, $admin->password) === true) {
                $password = $request->password;
                $admin->password = bcrypt($password);
                $this->adminRepository->updateAdmin($admin);
                return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Đổi mật khẩu thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST, "Mật khẩu không đúng");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * hanldeDataResponse
     * hanldeDataResponse is middlemen function to a lot of duplicate for Data Response
     * @param admin *admin from selectAdminById in AdminRepository
     * @return array
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
     * @return object
     **/
    function hanldeRequestData($request, $admin)
    {
        $admin->admin_name =  Validation::handleSpace($request->admin_name);
        $admin->phone = $request->phone;
        $admin->email = $request->email;
        $admin->auth = 'admin';
        return $admin;
    }

    /**
     * logout
     * logout account admin
     * @param request
     **/
    public function logout($request)
    {
        try {
            $request->user()->token()->revoke();
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Đăng xuất thành công");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * detail
     * detail post token and get token
     * @return json
     **/
    function detail()
    {
        try {
            $admin = Auth::guard('admins')->user();
            return Response::responseSuccess($this->hanldeDataResponse($admin));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * deleteAdmin
     * deleteAdmin delete admin
     * @return json
     **/
    function deleteAdmin($id)
    {
        try {
            if ($this->adminRepository->checkAdminById($id)) {
                $this->adminRepository->deleteAdmin($id);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Xóa thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Xóa không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }
}
