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
use App\Mail\MailConfirmUpdateEmail;
use App\Helper\Constants\FolderID;
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
     * @param request
     * @return token
     * @return json
     **/
    function login($request)
    {
        try {
            if (Auth::attempt(['phone' => $request->phone, 'password' => $request->password, 'auth' => 'user'])) {
                $user = Auth::user();
                $token_user =  $user->createToken('token')->accessToken;
                $data['user_id'] = $user->user_id;
                $data['user_name'] = $user->user_name;
                $data['avatar'] = $user->avatar;
                $data['phone'] = $user->phone;
                $data['email'] = $user->email;
                return Response::responseLoginSuccess($token_user, $data, 'user');
            } else {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  'Số điện thoại hoặc mật khẩu không đúng');
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * register
     * register for user
     * @param $request
     **/
    function register($request)
    {
        try {
            $user =  $this->handleRequestData($this->user, $request);
            $user->avatar = Support::handleImageGetLink(FolderID::AVATAR_ID, $request->file('avatar')->store(FolderID::AVATAR_ID, 'google'));
            $password = $request->password;
            $user->password = bcrypt($password);
            $this->userRepository->insertUser($user);
            $this->sendEmailConfirmAccount($user->user_id, $user->email);
            return Response::responseRegisterSuccess($user->email);
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateImageUser
     * updateImageUser *update image in store
     * @param request
     * @return json
     **/
    function updateImageUser($request)
    {
        try {
            $user =  Auth::user();
            Storage::cloud()->delete(Validation::handleImageNameGetId($user->avatar)); // delete file on drive
            $user->avatar = Support::handleImageGetLink(FolderID::AVATAR_ID, $request->file('avatar')->store(FolderID::AVATAR_ID, 'google'));
            $this->userRepository->updateUser($user);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Cập nhật thành công');
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * sendEmailConfirmUpdateEmailUser
     * sendEmailConfirmUpdateEmailUser *send email to update email user
     * @param request
     * @return json
     **/
    function sendEmailConfirmUpdateEmailUser($request)
    {
        try {
            $user =  Auth::user();
            $email = count($this->userRepository->selectManyUserByEmail($request->email));
            if ($user->email == $request->email) {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Cập nhật thành công');
            } elseif ($email >= 1) {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Email đã được đăng ký");
            } elseif ($email == 0) {
                $token_user =  $user->createToken('token')->accessToken;
                $data = [
                    'id'    => Crypt::encrypt($user->user_id) . '.' . Crypt::encrypt($request->email),
                    'url'   => 'confirm-update-email-user',
                    'token' => $token_user
                ];
                Mail::to($request->email)->send(new MailConfirmUpdateEmail($data));
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Vui lòng kiểm tra email xác nhận tại " . $request->email);
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updatePhoneUser
     * updatePhoneUser *send email to update email user
     * @param request
     * @return json
     **/
    function updatePhoneUser($request)
    {
        try {
            $user =  Auth::user();
            $phone = count($this->userRepository->selectManyUserByPhone($request->phone));
            if ($user->phone == $request->phone) {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Cập nhật thành công');
            } elseif ($phone >= 1) {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Số điện thoại đã được đăng ký");
            } elseif ($phone == 0) {
                $user->phone = $request->phone;
                $this->userRepository->updateUser($user);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Thay đổi thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateEmailUser
     * updateEmailUser *update email in user
     * @param request
     * @param id
     * @return json
     **/
    function updateEmailUser($request, $id)
    {
        $request->user()->token()->revoke();
        try {
            $user = $this->userRepository->selectUserById(Crypt::decrypt($id));
            $user->email = Crypt::decrypt($request->email);
            $this->userRepository->updateUser($user);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Thay đổi email thành công');
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * changePasswordUser
     * changePasswordUser change password for user
     * @param request
     * @return json
     **/
    function changePasswordUser($request)
    {
        try {
            $user = Auth::user();
            if (Hash::check($request->old_password,  $user->password) === true) {
                $password = $request->password;
                $user->password = bcrypt($password);
                $this->userRepository->updateUser($user);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Đổi mật khẩu thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Mật khẩu cũ không đúng");
            }
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
            return Response::responseSuccess(Auth::user());
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * sendEmailConfirmAccount
     * sendEmailConfirmAccount when register, send email to confirm register
     * @param request
     * @return json
     **/
    function sendEmailConfirmAccount($id, $email)
    {
        try {
            $data = [
                'id' =>  Crypt::encrypt($id),
                'url' => 'confirm-user'
            ];
            Mail::to($email)->send(new MailConfirmRegister($data));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * sendEmailResetPasswordUser
     * sendEmailResetPasswordUser send email when user forget password and get again password by email
     * @param request
     **/
    function sendEmailResetPasswordUser($request)
    {
        try {
            if ($this->userRepository->checkUserByEmail($request->email)) {
                $user = $this->userRepository->selectUserByEmail($request->email);
                $token_user =  $user->createToken('token')->accessToken;
                $data = [
                    'id' =>    Crypt::encrypt($user->user_id),
                    'url' => 'reset-password-user',
                    'token' => $token_user
                ];
                Mail::to($user->email)->send(new MailResetPassword($data));
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Vui lòng kiểm tra email xác nhận tại " . $request->email);
            } else {
                //Mail::to($request->email)->send(new MailErrorResetPassword());
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Email chưa đăng ký tài khoản");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * confirmAccount
     * confirmAccount when receive email confirm, store click link and fucntion run
     * @param request
     **/
    function confirmAccount($id)
    {
        try {
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
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
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
        try {
            $request->user()->token()->revoke();
            if ($this->userRepository->checkUserById(Crypt::decrypt($id))) {
                $user = $this->userRepository->selectUserById(Crypt::decrypt($id));
                $password = $request->password;
                $user->password = bcrypt($password);
                $this->userRepository->updateUser($user);
                return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Thay đổi thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST, "Thay đổi không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * logout
     * logout account user
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
     * updateUserName
     * updateUserName update user name
     * @param request
     * @return json
     **/
    function updateUserName($request)
    {
        try {
            $user = Auth::user();
            $user->user_name = Validation::handleSpace($request->user_name);
            $this->userRepository->updateUser($user);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Thay đổi thành công");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * handleRequestData
     * handleRequestData request data from client send to on server
     * @param request
     * @param user *store from selectUserById in userRepository
     **/
    function handleRequestData($user, $request)
    {
        $user->avatar = Support::handleImageGetLink(FolderID::AVATAR_ID, $request->file('avatar')->store(FolderID::AVATAR_ID, 'google'));
        $user->user_name = Validation::handleSpace($request->user_name);
        $user->phone = $request->phone;
        $user->email = $request->email;
        return $user;
    }
}
