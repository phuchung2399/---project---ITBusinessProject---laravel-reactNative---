<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Crypt;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Helper\Constants\HttpStatus;
use App\Mail\MailErrorResetPassword;
use Illuminate\Support\Facades\Hash;
use App\Mail\MailConfirmRegister;
use App\Mail\MailResetPassword;
use App\Helper\Validation; // container check validate
use App\Helper\Response; // container Response
use App\Helper\Support; // container function to hanld string, image, number
use App\Models\User;

class UserService
{
    private $userRepository;
    private $user;

    function __construct(UserRepository $userRepository, User $user)
    {
        $this->userRepository = $userRepository;
        $this->user = $user;
    }

    /**
     * login
     * login for user
     * @param $request
     **/
    function login($request)
    {
        if (Auth::attempt(['phone' => $request->phone, 'password' => $request->password, 'auth' => 'user'])) {
            $user = Auth::user();
            $token_user =  $user->createToken('token')->accessToken;
            $data['user_id'] = $user->user_id;
            $data['user_name'] = $user->user_name;
            $data['avatar'] = $user->avatar;
            $data['phone'] = $user->phone;
            $data['email'] = $user->email;
            return Response::responseLoginSuccess($token_user, $data, 'user', HttpStatus::SUCCESS_RESPONSE);
        } else {
            return Response::responseMessage(HttpStatus::UNAUTHORIZED,  'Số điện thoại hoặc mật khẩu không đúng');
        }
    }

    /**
     * register
     * register for user
     * @param $request
     **/
    function register($request)
    {
        $user =  $this->handleRequestData($this->user, $request);
        $password = $request->password;
        $user->password = bcrypt($password);
        $this->userRepository->insertUser($user);
        $this->sendEmailConfirmAccount($user->user_id, $user->email);
        return Response::responseRegisterSuccess($user->email, HttpStatus::SUCCESS_CREATED);
    }

    /**
     * updateUser
     * updateUser handle logic for update and run middlemen function
     * @param request
     * @param id
     **/
    function updateUser($request, $id)
    {
        if ($this->userRepository->checkUserById($id)) {
            $user = $this->userRepository->selectUserById($id);
            $phone = count($this->userRepository->selectManyUserByPhone($request->phone));
            $email = count($this->userRepository->selectManyUserByEmail($request->email));
            // var_dump("1: phone:" .  $phone . "-" . "email:" . $email);
            if ($user->email == $request->email && $user->phone == $request->phone) {
                // var_dump("2: phone:" .  $phone . "-" . "email:" . $email);
                return $this->handleUpdate($user, $request);
            } elseif ($user->email == $request->email && $phone >= 1) {
                // var_dump("4: phone:" .  $phone . "-" . "email:" . $email);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Số điện thoại đã được tồn tại");
            } elseif ($email >= 1 && $user->phone == $request->phone) {
                // var_dump("5: phone:" .  $phone . "-" . "email:" . $email);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Email đã được tồn tại");
            } elseif ($user->email == $request->email && $phone == 0) {
                // var_dump("6: phone:" .  $phone . "-" . "email:" . $email);
                return $this->handleUpdate($user, $request);
            } elseif ($email == 0 && $user->phone == $request->phone) {
                // var_dump("7: phone:" .  $phone . "-" . "email:" . $email);
                return $this->handleUpdate($user, $request);
            } elseif ($email >= 1 &&   $phone >= 1) {
                // var_dump("8: phone:" .  $phone . "-" . "email:" . $email);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Email và số điện thoại đã được tồn tại");
            } elseif ($email >= 1 &&   $phone >= 0) {
                // var_dump("9: phone:" .  $phone . "-" . "email:" . $email);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Email đã được tồn tại");
            } elseif ($email >= 0 &&   $phone >= 1) {
                // var_dump("10: phone:" .  $phone . "-" . "email:" . $email);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Số điện thoại đã được tồn tại");
            } else {
                // var_dump("11: phone:" .  $phone . "-" . "email:" . $email);
                return $this->handleUpdate($user, $request);
            }
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Cập nhật thất bại");
        }
    }

    /**
     * handleUpdate
     * handleUpdate is middlemen function to a lot of duplicate for update
     * @param request
     * @param store *store from selectStoreById in userRepository
     **/
    function handleUpdate($user, $request)
    {
        Storage::delete("public" . Validation::handleUrlImage($user->image)); // delete file
        $this->userRepository->updateUser($this->handleRequestData($user, $request));
        return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Cập nhật thành công");
    }

    /**
     * changePasswordUser
     * changePasswordUser change password for user
     * @param request
     * @param id
     **/
    function changePasswordUser($request, $id)
    {
        if ($this->userRepository->checkUserById($id)) {
            $user = $this->userRepository->selectUserById($id);
            if (Hash::check($request->old_password,  $user->password) === true) {
                $password = $request->password;
                $user->password = bcrypt($password);
                $this->userRepository->updateUser($user);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Đổi mật khẩu thành công");
            } else {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Mật khẩu cũ không đúng");
            }
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Đổi mật khẩu không thành công");
        }
    }

    /**
     * detail
     * detail post token and get token
     **/
    function detail()
    {
        return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, Auth::user());
    }

    /**
     * sendEmailConfirmAccount
     * sendEmailConfirmAccount when register, send email to confirm register
     * @param request
     **/
    function sendEmailConfirmAccount($id, $email)
    {
        $data = [
            'id' =>  Crypt::encrypt($id),
            'url' => 'confirm-user'
        ];
        Mail::to($email)->send(new MailConfirmRegister($data));
    }

    /**
     * sendEmailResetPasswordUser
     * sendEmailResetPasswordUser send email when user forget password and get again password by email
     * @param request
     **/
    function sendEmailResetPasswordUser($request)
    {
        if ($this->userRepository->checkUserByEmail($request->email)) {
            $user = $this->userRepository->selectUserByEmail($request->email);
            $data = [
                'id' =>    Crypt::encrypt($user->user_id),
                'url' => 'reset-password-user'
            ];
            Mail::to($user->email)->send(new MailResetPassword($data));
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Vui lòng kiểm tra xác nhận tại email");
        } else {
            Mail::to($request->email)->send(new MailErrorResetPassword());
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Vui lòng kiểm tra xác nhận tại email");
        }
    }

    /**
     * confirmAccount
     * confirmAccount when receive email confirm, store click link and fucntion run
     * @param request
     **/
    function confirmAccount($id)
    {
        if ($this->userRepository->checkUserById(Crypt::decrypt($id))) {
            $user = $this->userRepository->selectUserById(Crypt::decrypt($id));
            $user->auth = 'user';
            $this->userRepository->updateUser($user);
            $data = [
                'title' => 'Xác nhận tài khoản',
                'message_one' => 'Chúc mừng bạn đã xác nhận tại khoản thành công',
                'message_two' => 'Bây giờ hãy bật ứng dụng Nail và kiếm tiền khách hàng nào',
                'voucher' => 'ILOVENAIL'
            ];
            return $data;
        } else {
            $data = [
                'title' => 'Xác nhận tài khoản',
                'message_one' => 'Xác nhận tài khoản không thành công',
                'message_two' => 'Xin vui lòng kiểm tra lại thông tin xác nhận tài khoản',
                'voucher' => 'CẢNH BÁO'
            ];
            return $data;
        }
    }

    /**
     * resetPasswordUser
     * resetPasswordUser user type new password on page reset-password when receive email anh click into link
     * @param request
     * @param id
     **/
    function resetPasswordUser($request, $id)
    {
        if ($this->userRepository->checkUserById(Crypt::decrypt($id))) {
            $user = $this->userRepository->selectUserById(Crypt::decrypt($id));
            $password = $request->password;
            $user->password = bcrypt($password);
            $this->userRepository->updateUser($user);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Thay đổi thành công");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Thay đổi không thành công");
        }
    }

    /**
     * logout
     * logout account user
     * @param request
     **/
    public function logout($request)
    {
        $request->user()->token()->revoke();
        return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Đăng xuất thành công");
    }

    /**
     * handleRequestData
     * handleRequestData request data from client send to on server
     * @param request
     * @param user *store from selectUserById in userRepository
     **/
    function handleRequestData($user, $request)
    {
        $user->avatar = Support::handleUploadImage($request, 'avatars', 'avatar');
        $user->user_name = Validation::handleSpace($request->user_name);
        $user->phone = $request->phone;
        $user->email = $request->email;
        return $user;
    }
}
