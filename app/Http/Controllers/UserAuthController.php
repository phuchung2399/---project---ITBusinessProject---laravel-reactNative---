<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest\AuthUserUpdateUserNameRequest;
use App\Http\Requests\StoreRequest\AuthUpdateImageStoreRequest;
use App\Http\Requests\UserRequest\AuthUserChangsePassRequest;
use App\Http\Requests\UserRequest\AuthUserUpdateEmailRequest;
use App\Http\Requests\UserRequest\AuthUserUpdatePhoneRequest;
use App\Http\Requests\UserRequest\AuthUserResetPassRequest;
use App\Http\Requests\UserRequest\AuthUserRegisterRequest;
use App\Http\Requests\UserRequest\AuthUserEmailRequest;
use App\Http\Requests\UserRequest\AuthUserLoginRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserAuthController extends Controller
{
	private $userService;

	public function __construct(UserService $userService)
	{
		$this->userService = $userService;
	}

	/**
	 * @OA\Post(
	 *      path="/api/v1/user/login",
	 *      summary="User login",
	 *      tags={"user"},
	 *      operationId="user_login",
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
	public function login(AuthUserLoginRequest $request)
	{
		return $this->userService->login($request);
	}

	/**
	 * @OA\Post(
	 *      path="/api/v1/user/register",
	 *      summary="User register",
	 *      tags={"user"},
	 *      operationId="user_register",
	 *     @OA\RequestBody(
	 *         @OA\MediaType(
	 *             mediaType="multipart/form-data",
	 *             @OA\Schema(
	 *                 @OA\Property(
	 *                     property="avatar",
	 *                     type="file"
	 *                 ),
	 *                 @OA\Property(
	 *                     property="user_name",
	 *                     type="string"
	 *                 ),
	 *                 @OA\Property(
	 *                     property="email",
	 *                     type="string"
	 *                 ),
	 *                 @OA\Property(
	 *                     property="phone",
	 *                     type="integer"
	 *                 ),
	 *                 @OA\Property(
	 *                     property="password",
	 *                     type="string",
	 * 					   format= "password",
	 *                 ),
	 *                 @OA\Property(
	 *                     property="confirm_password",
	 *                     type="string",
	 *                     format= "password",
	 *                 ),
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
	public function register(AuthUserRegisterRequest $request)
	{
		return $this->userService->register($request);
	}

	/**
	 * @OA\Put(
	 *      path="/api/v1/user/password",
	 *      summary="User password change ",
	 *      tags={"user"},
	 *      operationId="user_password_change",
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
	 *                     type="string"
	 *                 ),
	 *                 example={
	 * 						"old_password": "0967258205",
	 * 						"password": "123456789",
	 * 						"confirm_password": "123456789"
	 * 					}
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
	public function changePasswordUser(AuthUserChangsePassRequest $request)
	{
		return $this->userService->changePasswordUser($request);
	}

	/**
	 * detail
	 * Get the authenticated User
	 */
	/**
	 * @OA\Post(
	 *      path="/api/v1/user/me",
	 *      summary="Send token on server and return data user",
	 *      tags={"user"},
	 *      operationId="user_detail",
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
		return $this->userService->detail();
	}

	/**
	 * @OA\Post(
	 *      path="/api/v1/user/logout",
	 *      summary="user logout",
	 *      tags={"user"},
	 *      operationId="user_logout",
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
		return $this->userService->logout($request);
	}

	function confirmAccountUser($id)
	{
		$data  = $this->userService->confirmAccount($id);
		return view('confirm.userConfirmRegister',  compact('id', 'data'));
	}

	/**
	 * @OA\Post(
	 *      path="/api/v1/user/mail-reset-password",
	 *      summary="send email reset password user",
	 *      tags={"user"},
	 *      operationId="user_mail_reset_password",
	 *     @OA\RequestBody(
	 *         @OA\MediaType(
	 *             mediaType="application/json",
	 *             @OA\Schema(
	 *                 @OA\Property(
	 *                     property="email",
	 *                     type="string",
	 *                 ),
	 *                 example={
	 * 						"email": "abc@gmail.com",
	 * 					}
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
	function sendEmailResetPassword(AuthUserEmailRequest $request)
	{
		return $this->userService->sendEmailResetPasswordUser($request);
	}

	function getPageResetPasswordUser($id)
	{
		$data = [
			'title' => 'Đổi mật khẩu',
		];
		return view('password.resetPasswordUser', compact('data', 'id'));
	}

	function resetPasswordUser(AuthUserResetPassRequest $request, $id)
	{
		return $this->userService->resetPasswordUser($request, $id);
	}

	/**
	 * @OA\Post(
	 *      path="/api/v1/user/update-user-image",
	 *      summary="update image user",
	 *      tags={"user"},
	 *      operationId="update_image_user",
	 *     @OA\RequestBody(
	 *         @OA\MediaType(
	 *             mediaType="multipart/form-data",
	 *             @OA\Schema(
	 *                 @OA\Property(
	 *                     property="avatar",
	 *                     type="file"
	 *                 ),
	 *                 @OA\Property(
	 *                     property="_method",
	 *                     type="string",
	 *                 ),
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
	function updateImageUser(AuthUpdateImageStoreRequest $request)
	{
		return $this->userService->updateImageUser($request);
	}

	/**
	 * @OA\Post(
	 *      path="/api/v1/user/mail-confirm-update-email",
	 *      summary="send email confirm change email",
	 *      tags={"user"},
	 *      operationId="mail_confirm_update_email",
	 *     @OA\RequestBody(
	 *         @OA\MediaType(
	 *             mediaType="application/json",
	 *             @OA\Schema(
	 *                 @OA\Property(
	 *                     property="email",
	 *                     type="string",
	 *                 ),
	 *             example={
	 * 					"email": "abc@gmail.com",
	 * 				}
	 *            )
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
	function sendEmailConfirmUpdateEmailUser(AuthUserUpdateEmailRequest $request)
	{
		return $this->userService->sendEmailConfirmUpdateEmailUser($request);
	}

	function getPageUpdateEmailUser($id)
	{
		$data = [
			'title' => 'Xác nhận đổi email',
		];
		return view('confirm.userConfirmUpdateEmail', compact('data', 'id'));
	}

	function updateEmailUser(Request $request, $id)
	{
		return $this->userService->updateEmailUser($request, $id);
	}

	/**
	 * @OA\Put(
	 *      path="/api/v1/user/update-user-phone",
	 *      summary="update phone user",
	 *      tags={"user"},
	 *      operationId="update_phone_user",
	 *     @OA\RequestBody(
	 *         @OA\MediaType(
	 *             mediaType="application/json",
	 *             @OA\Schema(
	 *                 @OA\Property(
	 *                     property="phone",
	 *                     type="string",
	 *                 ),
	 *                 example={
	 * 					   "phone": "0967258205",
	 * 					}
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
	function updatePhoneUser(AuthUserUpdatePhoneRequest $request)
	{
		return $this->userService->updatePhoneUser($request);
	}

	/**
	 * @OA\Put(
	 *      path="/api/v1/user/update-user-name",
	 *      summary="update user name",
	 *      tags={"user"},
	 *      operationId="update_user_name",
	 *     @OA\RequestBody(
	 *         @OA\MediaType(
	 *             mediaType="application/json",
	 *             @OA\Schema(
	 *                 @OA\Property(
	 *                     property="user_name",
	 *                     type="string",
	 *                 ),
	 *                 example={
	 * 					   "user_name": "Mèo con dễ thương",
	 * 					}
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
	function updateUserName(AuthUserUpdateUserNameRequest $request)
	{
		return $this->userService->updateUserName($request);
	}

	function lockAccount($id)
	{
		return $this->userService->lockAccount($id);
	}

	function activeAccount($id)
	{
		return $this->userService->activeAccount($id);
	}

	function selectAllUser()
	{
		return $this->userService->selectAllUser();
	}

	function chartCountUser()
	{
		return $this->userService->chart();
	}
}
