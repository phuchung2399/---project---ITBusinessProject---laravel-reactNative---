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

    /**
     * @OA\Post(
     *      path="/api/v1/admin/login",
     *      summary="Login admin",
     *      tags={"admin"},
     *      operationId="admin_login",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="phone",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 example={"phone": "0967258205", "password": "123456789"}
     *             )
     *         )
     *     ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     * )
     */
    function login(AdminLoginRequest $request)
    {
        return $this->adminService->login($request);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/admin/register",
     *      summary="Register admin",
     *      tags={"admin"},
     *      operationId="admin_register",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="admin_name",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="phone",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="confirm_password",
     *                     type="string"
     *                 ),
     *                 example={
     *                      "admin_name": "Qoách Thị Dẹo",
     *                      "email": "deo@gmail.com",
     *                      "phone": "0912345678",
     *                      "password": "123456789",
     *                      "confirm_password": "123456789",
     *                  }
     *             )
     *         )
     *     ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),    *      security={{"passport":{}}},
     * )
     */
    function register(AdminRegisterRequest $request)
    {
        return $this->adminService->register($request);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/admin/change-password",
     *      summary="Change password admin",
     *      tags={"admin"},
     *      operationId="change_password",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="old_password",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="confirm_password",
     *                     type="integer"
     *                 ),
     *                 example={"old_password": "0967258205", "password": "123456789","confirm_password": "123456789"}
     *             )
     *         )
     *     ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function changePasswordAdmin(AdminChangePassRequest $request)
    {
        return $this->adminService->changePasswordAdmin($request);
    }

    /**
     * detail
     * send token on serve and return data admin
     **/
    /**
     * @OA\Post(
     *      path="/api/v1/admin/me",
     *      summary="Send token on serve and return data admin",
     *      tags={"admin"},
     *      operationId="admin_detail",
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    public function detail()
    {
        return $this->adminService->detail();
    }

    /**
     * @OA\Post(
     *      path="/api/v1/admin/logout",
     *      summary="Logout admin",
     *      tags={"admin"},
     *      operationId="admin_logout",
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    public function logout(Request $request)
    {
        return $this->adminService->logout($request);
    }

    /**
     * @OA\Delete(
     *      path="/api/v1/admin/delete/{id}",
     *      summary="Delete admin ",
     *      tags={"admin"},
     *      operationId="admin_delete",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer",
     *              format= "uuid"
     *          )
     *      ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    public function deleteAdmin($id)
    {
        return $this->adminService->deleteAdmin($id);
    }
}
