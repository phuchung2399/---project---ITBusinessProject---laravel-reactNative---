<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\AuthUserRequest;
use App\Http\Requests\AuthUserResetPassRequest;
use App\Http\Requests\AuthUserUpdateProfileRequest;


class UserAuthController extends Controller
{
	public $successStatus = 200;

	public function login()
	{

		if (Auth::attempt(['phone' => request('phone'), 'password' => request('password')])) {
			$user = Auth::user();
			$token['token'] =  $user->createToken('token')->accessToken;
			$data['user_id'] = $user->user_id;
			$data['user_name'] = $user->user_name;
			$data['avatar'] = $user->avatar;
			$data['phone'] = $user->phone;
			$data['email'] = $user->email;
			return response()->json(['token' => $token, 'user' => $data], 200);
		} else {
			return response()->json(['error' => 'Login failed'], 401);
		}
	}

	public function register(AuthUserRequest $request)
	{
		$user = new User();
		$file = $request->file('avatar')->getClientOriginalName();
		$user->avatar =  $file;
		$request->file('avatar')->move('assets\images\avatars', $file);
		$user->user_name =  trim(preg_replace('/\s+/', ' ',  $request->user_name));
		$user->phone = $request->phone;
		$user->email = $request->email;
		$user->auth = "user";
		$password = trim(preg_replace('/\s+/', '',  $request->password));
		$user->password = bcrypt($password);
		$user->save();
		$token['token'] =  $user->createToken('token')->accessToken;
		return response()->json(['token' => $token], $this->successStatus);
	}

	public function updateProfile(AuthUserUpdateProfileRequest $request, $id)
	{
		if (User::where('user_id', $id)->exists()) {
			$user = User::find($id);
			$file = $request->file('avatar')->getClientOriginalName();
			$user->avatar =  $file;
			$request->file('avatar')->move('assets\images\avatars', $file);
			$user->user_name =  trim(preg_replace('/\s+/', ' ',  $request->user_name));
			$user->phone = $request->phone;
			$user->email = $request->email;
			$user->save();
			return response()->json([
				"message" => "Updated infomation successfully"
			], 200);
		} else {
			return response()->json([
				"message" => "User not found"
			], 404);
		}
	}

	public function changePasswordUser(AuthUserResetPassRequest $request, $id)
	{
		if (User::where('user_id', $id)->exists()) {
			$user = User::find($id);
			$password = trim(preg_replace('/\s+/', '',  $request->password));
			$user->password = bcrypt($password);
			$user->save();
			return response()->json([
				"message" => "Updated password successfully"
			], 200);
		} else {
			return response()->json([
				"message" => "User not found"
			], 404);
		}
	}

	/**
	 * Get the authenticated User
	 *
	 * @return [json] user object
	 */
	public function user()
	{
		$user = Auth::user();
		return response()->json(['user' => $user], $this->successStatus);
	}
}
