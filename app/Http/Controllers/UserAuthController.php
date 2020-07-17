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

	public function login(AuthUserLoginRequest $request)
	{
		return $this->userService->login($request);
	}

	public function register(AuthUserRegisterRequest $request)
	{
		return $this->userService->register($request);
	}

	public function changePasswordUser(AuthUserChangsePassRequest $request)
	{
		return $this->userService->changePasswordUser($request);
	}

	/**
	 * Get the authenticated User
	 */
	public function detail()
	{
		return $this->userService->detail();
	}

	public function logout(Request $request)
	{
		return $this->userService->logout($request);
	}

	function confirmAccountUser($id)
	{
		$data  = $this->userService->confirmAccount($id);
		return view('confirm.userConfirmRegister',  compact('id', 'data'));
	}

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

	function updateImageUser(AuthUpdateImageStoreRequest $request)
	{
		return $this->userService->updateImageUser($request);
	}

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

	function updatePhoneUser(AuthUserUpdatePhoneRequest $request)
	{
		return $this->userService->updatePhoneUser($request);
	}

	function updateUserName(AuthUserUpdateUserNameRequest $request)
	{
		return $this->userService->updateUserName($request);
	}
}
