<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Crypt;
use App\Repositories\StoreRepository;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Helper\Constants\HttpStatus;
use App\Mail\MailErrorResetPassword;
use App\Mail\MailConfirmRegister;
use App\Mail\MailResetPassword;
use App\Helper\Validation; // container check validate
use App\Helper\Response; // container Response
use App\Helper\Support; // container function to hanld string, image, number
use App\Models\Store;

class StoreSevice
{
    private $storeRepository;
    private $store;

    function __construct(StoreRepository $storeRepository, Store $store)
    {
        $this->storeRepository = $storeRepository;
        $this->store = $store;
    }

    /**
     * login
     * login for store
     * @param $request
     **/
    function login($request)
    {
        $store = $this->storeRepository->selectStoreByPhone($request); // get data by phone requet phone from client
        if ($store != null) {
            if (Hash::check($request->password,  $store->password) === true && $store->auth == 'store') {
                $token_store =  $store->createToken('token')->accessToken;
                return Response::responseLoginSuccess($token_store, $this->hanldeDataResponse($store), 'store', HttpStatus::SUCCESS_RESPONSE);
            } else {
                return Response::responseMessage(HttpStatus::UNAUTHORIZED,  'Số điện thoại hoặc mật khẩu không đúng');
            }
        } else {
            return Response::responseMessage(HttpStatus::UNAUTHORIZED,  'Số điện thoại hoặc mật khẩu không đúng');
        }
    }

    /**
     * register
     * register for store
     * @param $request
     **/
    function register($request)
    {
        $store =  $this->hanldeRequestData($request, $this->store);
        $password = $request->password;
        $store->password = bcrypt($password);
        $this->storeRepository->insertStore($store);
        $this->sendEmailConfirmAccount($store->store_id, $store->email);
        return Response::responseRegisterSuccess($store->email, HttpStatus::SUCCESS_CREATED);
    }

    /**
     * updateStore
     * updateStore handle logic for update and run middlemen function
     * @param request
     * @param id
     **/
    function updateStore($request, $id)
    {
        if ($this->storeRepository->checkStoreById($id)) {
            $store = $this->storeRepository->selectStoreById($id); // get store by id
            $phone = count($this->storeRepository->selectManyStoreByPhone($request->phone)); // count phone in database
            $email = count($this->storeRepository->selectManyStoreByEmail($request->email)); // count email in database
            // var_dump("1: phone:" .  $phone . "-" . "email:" . $email);
            if ($store->email == $request->email && $store->phone == $request->phone) {
                // var_dump("2: phone:" .  $phone . "-" . "email:" . $email);
                return $this->handleUpdate($store, $request);
            } elseif ($store->email == $request->email && $phone >= 1) {
                // var_dump("4: phone:" .  $phone . "-" . "email:" . $email);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Số điện thoại đã được tồn tại");
            } elseif ($email >= 1 && $store->phone == $request->phone) {
                // var_dump("5: phone:" .  $phone . "-" . "email:" . $email);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Email đã được tồn tại");
            } elseif ($store->email == $request->email && $phone == 0) {
                // var_dump("6: phone:" .  $phone . "-" . "email:" . $email);
                return $this->handleUpdate($store, $request);
            } elseif ($email == 0 && $store->phone == $request->phone) {
                // var_dump("7: phone:" .  $phone . "-" . "email:" . $email);
                return $this->handleUpdate($store, $request);
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
                return $this->handleUpdate($store, $request);
            }
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Cập nhật thất bại");
        }
    }

    /**
     * handleUpdate
     * handleUpdate is middlemen function to a lot of duplicate for update
     * @param request
     * @param store *store from selectStoreById in storeRepository
     **/
    function handleUpdate($store, $request)
    {
        Storage::delete("public" . Validation::handleUrlImage($store->image)); // delete file
        $this->storeRepository->updateStore($this->hanldeRequestData($request, $store));
        return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Cập nhật thành công");
    }

    /**
     * changePasswordStore
     * changePasswordStore change password for store
     * @param request
     * @param id
     **/
    function changePasswordStore($request, $id)
    {
        if ($this->storeRepository->checkStoreById($id)) {
            $store = $this->storeRepository->selectStoreById($id);
            if (Hash::check($request->old_password,  $store->password) === true) {
                $password = $request->password;
                $store->password = bcrypt($password);
                $this->storeRepository->updateStore($store);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Đổi mật khẩu thành công");
            } else {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Mật khẩu không đúng");
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
        $store = Auth::guard('stores')->user();
        return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->hanldeDataResponse($store));
    }

    /**
     * checkEmailPhoneExist
     * checkEmailPhoneExist hanlde support function update, update not duplicate phone and email of other account
     * but can update it's phone and email
     * @param param *count of phone and email in database
     * @param field *is field phone or email
     * @param store *store from selectStoreById in storeRepository
     * @param request
     **/
    function checkEmailPhoneExist($param, $field, $store, $request)
    {
        if ($param >= 1) {
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  $field . " đã tồn tại");
        } else {
            return $this->handleUpdate($store, $request);
        }
    }

    /**
     * sendEmailConfirmAccount
     * sendEmailConfirmAccount when register, send email to confirm register
     * @param request
     **/
    function sendEmailConfirmAccount($id, $email)
    {
        $data = [
            'id' => Crypt::encrypt($id),
            'url' => 'confirm-store'
        ];
        Mail::to($email)->send(new MailConfirmRegister($data));
    }

    /**
     * confirmAccount
     * confirmAccount when receive email confirm, store click link and fucntion run
     * @param request
     **/
    function confirmAccount($id)
    {
        if ($this->storeRepository->checkStoreById(Crypt::decrypt($id))) {
            $store = $this->storeRepository->selectStoreById(Crypt::decrypt($id));
            $store->auth = 'store';
            $this->storeRepository->updateStore($store);
            $data = [
                'title' => 'Xác nhận tài khoản',
                'message_one' => 'Chúc mừng bạn đã xác nhận tại khoản thành công',
                'message_two' => 'Bây giờ hãy bật ứng dụng Nail và tìm kiếm khách hàng nào'
            ];
            return $data;
        } else {
            $data = [
                'title' => 'Xác nhận tài khoản',
                'message_one' => 'Xác nhận tài khoản không thành công',
                'message_two' => 'Xin vui lòng kiểm tra lại thông tin xác nhận tài khoản'
            ];
            return $data;
        }
    }

    /**
     * resetPasswordStore
     * resetPasswordStore store type new password on page reset-password when receive email anh click into link
     * @param request
     * @param id
     **/
    function resetPasswordStore($request, $id)
    {
        $request->user()->token()->revoke();
        if ($this->storeRepository->checkStoreById(Crypt::decrypt($id))) {
            $store = $this->storeRepository->selectStoreById(Crypt::decrypt($id));
            $password = $request->password;
            $store->password = bcrypt($password);
            $this->storeRepository->updateStore($store);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Thay đổi thành công");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Thay đổi thành công");
        }
    }

    /**
     * sendEmailResetPasswordStore
     * sendEmailResetPasswordStore send email when store forget password and get again password by email
     * @param request
     **/
    function sendEmailResetPasswordStore($request)
    {
        if ($this->storeRepository->checkStoreByEmail($request->email)) {
            $store = $this->storeRepository->selectStoreByEmail($request->email);
            $token_store =  $store->createToken('token')->accessToken;
            $data = [
                'id' =>   Crypt::encrypt($store->store_id),
                'url' => 'reset-password-store',
                'token' => $token_store
            ];
            Mail::to($store->email)->send(new MailResetPassword($data));
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Vui lòng kiểm tra xác nhận tại email");
        } else {
            Mail::to($request->email)->send(new MailErrorResetPassword());
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Vui lòng kiểm tra xác nhận tại email");
        }
    }

    /**
     * logout
     * logout account store
     * @param request
     **/
    public function logout($request)
    {
        $request->user()->token()->revoke();
        return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Đăng xuất thành công");
    }

    /**
     * hanldeRequestData
     * hanldeRequestData request data from client send to on server
     * @param request
     * @param store *store from selectStoreById in storeRepository
     **/
    function hanldeRequestData($request, $store)
    {
        $store->image = Support::handleUploadImage($request, 'stores', 'image');
        $store->store_name =  Validation::handleSpace($request->store_name);
        $store->phone = $request->phone;
        $store->email = $request->email;
        $store->address = $request->address;
        $store->open_time = $request->open_time;
        $store->close_time = $request->close_time;
        $store->location_id = $request->location_id;
        return $store;
    }

    /**
     * hanldeDataResponse
     * hanldeDataResponse is middlemen function to a lot of duplicate for Data Response
     * @param store store from selectStoreById in storeRepository
     **/
    function hanldeDataResponse($store)
    {
        $data['store_id'] = $store->store_id;
        $data['store_name'] = $store->store_name;
        $data['image'] = $store->image;
        $data['phone'] = $store->phone;
        $data['email'] = $store->email;
        $data['open_time'] = $store->open_time;
        $data['close_time'] = $store->close_time;
        $data['location'] =  $store->location()->get();
        $data['rank'] = round($store->comment()->avg('star'));
        return $data;
    }
}
