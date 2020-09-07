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
use App\Mail\MailConfirmUpdateEmail;
use App\Helper\Constants\FolderID;
use App\Mail\MailConfirmRegister;
use App\Services\CoordinateService;
use App\Services\LocationService;
use App\Mail\MailResetPassword;
use App\Helper\Validation; // container check validate
use App\Helper\Response; // container Response
use App\Helper\Support; // container function to hanld string, image, number
use App\Models\Store;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class StoreSevice
{
    private $coordinateService;
    private $locationService;
    private $storeRepository;
    private $store;

    function __construct(CoordinateService $coordinateService, LocationService $locationService, StoreRepository $storeRepository, Store $store)
    {
        $this->coordinateService = $coordinateService;
        $this->locationService = $locationService;
        $this->storeRepository = $storeRepository;
        $this->store = $store;
    }

    /**
     * login
     * login for store
     * @param $request
     * @return json
     **/
    function login($request)
    {
        try {
            $store = $this->storeRepository->selectStoreByPhone($request->phone);
            if ($store != null) {
                if ($store->active == 0) {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST,  'Tài khoản của bạn đã bị khóa do bạn đã vi pham nội dung khỏa thuận của NAILL APP');
                }
                if ($store->auth == 'store' && Hash::check($request->password,  $store->password)) {
                    $token_store =  $store->createToken('token')->accessToken;
                    return Response::responseLoginSuccess($token_store, $this->hanldeDataResponse($store), 'store');
                } else {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST,  'Số điện thoại hoặc mật khẩu không đúng');
                }
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  'Số điện thoại hoặc mật khẩu không đúng');
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * register
     * register for store
     * @param request
     * @return object
     * @return email
     **/
    function register($request)
    {
        try {
            if ($request->close_time > $request->open_time) {
                if ($this->coordinateService->checkRealCoordinate($request->address)) {
                    $store = $this->hanldeRequestData($request, $this->store);
                    $this->storeRepository->insertStore($store);
                    $this->sendEmailConfirmAccount($store->store_id, $store->email);
                    $this->coordinateService->insert($this->hanldeAddress($request->address, $request->location_id), $store->store_id);
                    return Response::responseRegisterSuccess($store->email);
                } else {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Vị trí không tồn tại trên các hệ thông bản đồ');
                }
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Thời gian mở và đóng không hợp lệ');
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updatePointSearch
     * updatePointSearch for update point search to store, prioritize when search
     * @param request
     * @return object
     **/
    function updatePointSearch($request, $id)
    {
        try {
            $store = $this->storeRepository->selectStoreById($id);
            $store->point_search = $request->point_search;
            $this->storeRepository->insertStore($store);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, 'Thêm điểm thành công');
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateImageStore
     * updateImageStore *update image in store
     * @param request
     * @return json
     **/
    function updateImageStore($request)
    {
        try {
            $store = (Auth::guard('stores')->user());
            Storage::cloud()->delete(Validation::handleImageNameGetId($store->image)); // delete file on drive
            $store->image =  Support::handleImageGetLink(FolderID::STORE_ID, $request->file('image')->store(FolderID::STORE_ID, 'google'));
            $this->storeRepository->updateStore($store);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Cập nhật thành công');
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * sendEmailConfirmUpdateEmailStore
     * sendEmailConfirmUpdateEmailStore *send email to update email store
     * @param request
     * @return json
     **/
    function sendEmailConfirmUpdateEmailStore($request)
    {
        try {
            $store = Auth::guard('stores')->user();
            $email = count($this->storeRepository->selectManyStoreByEmail($request->email)); // count email in database
            if ($store->email == $request->email) {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Cập nhật thành công');
            } elseif ($email >= 1) {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Email đã được đăng ký");
            } elseif ($email == 0) {
                $token_store = $store->createToken('token')->accessToken;
                $data = [
                    'id'    => Crypt::encrypt($store->store_id) . '.' . Crypt::encrypt($request->email),
                    'url'   => 'confirm-update-email-store',
                    'token' => $token_store
                ];
                Mail::to($request->email)->send(new MailConfirmUpdateEmail($data));
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Vui lòng kiểm tra email xác nhận tại " . $request->email);
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateEmailStore
     * updateEmailStore *update email in store
     * @param request
     * @param id
     * @return json
     **/
    function updateEmailStore($request, $id)
    {
        $request->user()->token()->revoke();
        try {
            $store = $this->storeRepository->selectStoreById(Crypt::decrypt($id)); // get store by id
            $store->email = Crypt::decrypt($request->email);
            $this->storeRepository->updateStore($store);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Thay đổi email thành công');
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updatePhoneStore
     * updatePhoneStore *update user store
     * @param request
     * @return json
     **/
    function updatePhoneStore($request)
    {
        try {
            $store = Auth::guard('stores')->user();
            $phone = count($this->storeRepository->selectManyStoreByPhone($request->phone)); // count phone in database
            if ($store->phone == $request->phone) {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Cập nhật thành công');
            } elseif ($phone >= 1) {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Số điện thoại đã được đăng ký");
            } elseif ($phone == 0) {
                $store->phone = $request->phone;
                $this->storeRepository->updateStore($store);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Thay đổi thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateStoreName
     * updateStoreName *update store name
     **/
    function updateStoreName($request)
    {
        try {
            $store = Auth::guard('stores')->user();
            $store->store_name = $request->store_name;
            $this->storeRepository->updateStore($store);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Thay đổi thành công");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateAddressStore
     * updateAddressStore *update address store
     **/
    function updateAddressStore($request)
    {
        try {
            if ($this->coordinateService->checkRealCoordinate($request->address)) {
                $store = Auth::guard('stores')->user();
                $store->address = $this->hanldeAddress($request->address, $store->location_id);
                $this->storeRepository->updateStore($store);
                $this->coordinateService->update($store->address, $store->store_id);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Thay đổi thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Vị trí không tồn tại trên các hệ thông bản đồ');
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateTimeOpenCloseStore
     * updateTimeOpenCloseStore *update time open store and close
     **/
    function updateTimeOpenCloseStore($request)
    {
        try {
            if ($request->open_time >= $request->close_time) {
                return Response::responseMessage(HttpStatus::BAD_REQUEST, "Thời gian mở cửa không được lớn hơn và bằng thời gian mở cửa");
            } else {
                $store = Auth::guard('stores')->user();
                $store->open_time = $request->open_time;
                $store->close_time = $request->close_time;
                $this->storeRepository->updateStore($store);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Thay đổi thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateLocationStore
     * updateLocationStore *update location store
     **/
    function updateLocationStore($request)
    {
        try {
            $store = Auth::guard('stores')->user();
            $store->location_id = $request->location_id;
            $this->storeRepository->updateStore($store);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Thay đổi thành công");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * handleUpdate
     * handleUpdate is middlemen function to a lot of duplicate for update
     * @param request
     * @param store *store from selectStoreById in storeRepository
     * @return json
     **/
    /*
    function handleUpdate($store, $request)
    {
        $this->storeRepository->updateStore($this->hanldeRequestData($request, $store));
        return Response::responseMessage(HttpStatus::SUCCESS_CREATED,  "Cập nhật thành công");
    }
    */

    /**
     * changePasswordStore
     * changePasswordStore change password for store
     * @param request
     * @param id
     * @return json
     **/
    function changePasswordStore($request)
    {
        try {
            $store = $store = (Auth::guard('stores')->user());
            if (Hash::check($request->old_password,  $store->password) === true) {
                $password = $request->password;
                $store->password = bcrypt($password);
                $this->storeRepository->updateStore($store);
                return Response::responseMessage(HttpStatus::SUCCESS_CREATED,  "Đổi mật khẩu thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Mật khẩu không đúng");
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
            $store = Auth::guard('stores')->user();
            return Response::responseSuccess($this->hanldeDataResponse($store));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * checkEmailPhoneExist
     * checkEmailPhoneExist hanlde support function update, update not duplicate phone and email of other account
     * but can update it's phone and email
     * @param param *count of phone and email in database
     * @param field *is field phone or email
     * @param store *store from selectStoreById in storeRepository
     * @param request
     * @return json
     **/
    /*
    function checkEmailPhoneExist($param, $field, $store, $request)
    {
        try {
            if ($param >= 1) {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  $field . " đã tồn tại");
            } else {
                return $this->handleUpdate($store, $request);
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    */

    /**
     * sendEmailConfirmAccount
     * sendEmailConfirmAccount when register, send email to confirm register
     * @param id
     **/
    function sendEmailConfirmAccount($id, $email)
    {
        try {
            $data = [
                'id' => Crypt::encrypt($id),
                'url' => 'confirm-store'
            ];
            Mail::to($email)->send(new MailConfirmRegister($data));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * confirmAccount
     * confirmAccount when receive email confirm, store click link and fucntion run
     * @param id
     * @return array
     **/
    function confirmAccount($id)
    {
        try {
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
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * resetPasswordStore
     * resetPasswordStore store type new password on page reset-password when receive email anh click into link
     * @param request
     * @param id
     * @return json
     **/
    function resetPasswordStore($request, $id)
    {
        try {
            $request->user()->token()->revoke();
            if ($this->storeRepository->checkStoreById(Crypt::decrypt($id))) {
                $store = $this->storeRepository->selectStoreById(Crypt::decrypt($id));
                $password = $request->password;
                $store->password = bcrypt($password);
                $this->storeRepository->updateStore($store);
                return Response::responseMessage(HttpStatus::SUCCESS_CREATED,  "Thay đổi thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Thay đổi thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * sendEmailResetPasswordStore
     * sendEmailResetPasswordStore send email when store forget password and get again password by email
     * @param request
     * @return json
     **/
    function sendEmailResetPasswordStore($request)
    {
        try {
            if ($this->storeRepository->checkStoreByEmail($request->email)) {
                $store = $this->storeRepository->selectStoreByEmail($request->email);
                $token_store =  $store->createToken('token')->accessToken;
                $data = [
                    'id' =>   Crypt::encrypt($store->store_id),
                    'url' => 'reset-password-store',
                    'token' => $token_store
                ];
                Mail::to($store->email)->send(new MailResetPassword($data));
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Vui lòng kiểm tra email xác nhận tại " . $request->email);
            } else {
                // Mail::to($request->email)->send(new MailErrorResetPassword());
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Email chưa đăng ký tài khoản");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * logout
     * logout account store
     * @param request
     * @return json
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
     * hanldeRequestData
     * hanldeRequestData request data from client send to on server
     * @param request
     * @param store *store from selectStoreById in storeRepository
     * @return object
     **/
    function hanldeRequestData($request, $store)
    {
        $store->image =  Support::handleImageGetLink(FolderID::STORE_ID, $request->file('image')->store(FolderID::STORE_ID, 'google'));
        $store->address = $this->hanldeAddress($request->address, $request->location_id);
        $password = $request->password;
        $store->password = bcrypt($password);
        $store->star = 0; // star of store
        $store->point_search = 0; // point_search store
        $store->store_name =  Validation::handleSpace($request->store_name);
        $store->phone = $request->phone;
        $store->email = $request->email;
        $store->open_time = $request->open_time;
        $store->close_time = $request->close_time;
        $store->location_id = $request->location_id;
        $store->active = 1;
        $store->created_at = (Carbon::now('Asia/Ho_Chi_Minh'))->toDateString(); // get date at now
        $store->updated_at = (Carbon::now('Asia/Ho_Chi_Minh'))->toDateString(); // get date at now 
        return $store;
    }

    /**
     * selectStoreById
     * selectStoreById *select store by id
     **/
    function selectStoreById($id)
    {
        try {
            return Response::responseSuccess($this->hanldeDataResponseDetail($this->storeRepository->selectStoreById($id)));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectAllStore
     * selectAllStore *select all store
     * @return array
     **/
    function selectAllStore()
    {
        try {
            $store =  $this->storeRepository->selectAllStore();
            $output  = [];
            foreach ($store as $value) {
                array_push($output,  $this->hanldeDataResponse($value));
            }
            return Response::responseSuccess($output);
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * hanldeDataResponseDetail
     * hanldeDataResponseDetail is middlemen function to a lot of duplicate for Data Response to user into user class
     * @param store store from selectStoreById in storeRepository
     * @return array
     **/
    function hanldeDataResponseDetail($store)
    {
        $data = $this->hanldeDataResponse($store);
        $data['services'] =  $store->service()->get();
        return $data;
    }

    /**
     * hanldeDataResponse
     * hanldeDataResponse is middlemen function to a lot of duplicate for Data Response into order class
     * @param store store from selectStoreById in storeRepository
     * @return array
     **/
    function hanldeDataResponse($store)
    {
        $data['store_id'] = $store->store_id;
        $data['store_name'] = $store->store_name;
        $data['image'] = $store->image;
        $data['address'] = $store->address;
        $data['phone'] = $store->phone;
        $data['email'] = $store->email;
        $data['open_time'] = $store->open_time;
        $data['close_time'] = $store->close_time;
        $data['location'] =  $store->location()->get();
        $data['rank'] =  $store->star;
        $data['point_search'] =  $store->point_search;
        $data['active'] =  $store->active;
        return $data;
    }

    /**
     * searchStore
     * searchStore select on store by key
     * @param request
     * @return json
     **/
    function searchStore($request)
    {
        try {
            $store_adv = $this->storeRepository->searchStoreSortPointSearch($request);
            $store = $this->storeRepository->searchStoreSortStar($request);
            $output  = [];
            foreach ($store_adv as $value) {
                array_push($output,  $this->hanldeDataResponse($value));
            }
            foreach ($store as $value) {
                array_push($output,  $this->hanldeDataResponse($value));
            }
            return Response::responseSuccess(array_unique($output, SORT_REGULAR));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectStoreByStar
     * selectStoreByStar select on service by star
     * @param star
     * @return json
     **/
    function selectStoreByStar($star)
    {
        try {
            $store = $this->storeRepository->selectStoreByStar($star);
            $output  = [];
            foreach ($store as $value) {
                array_push($output,  $this->hanldeDataResponse($value));
            }
            return Response::responseSuccess($output);
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectStoreByStarInHome
     * selectStoreByStarInHome select on store sort by star limit 5
     * @return json
     **/
    function selectStoreByStarInHome()
    {
        try {
            $store = $this->storeRepository->searchStoreSortStarLimit();
            $output  = [];
            foreach ($store as $value) {
                array_push($output,  $this->hanldeDataResponse($value));
            }
            return Response::responseSuccess($output);
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectStoreNewByInHome
     * selectStoreNewByInHome select on new store pay fee for adv
     * @return json
     **/
    function selectStoreNewByInHome()
    {
        try {
            $store = $this->storeRepository->searchStoreNewLimit();
            $output  = [];
            foreach ($store as $value) {
                array_push($output,  $this->hanldeDataResponse($value));
            }
            return Response::responseSuccess($output);
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * hanldeAddress
     * @param address
     * @param location_id
     */
    function hanldeAddress($address, $location_id)
    {
        return json_decode(Support::handleGetCoordinate($address . ' ' .  $this->locationService->getNameLocation($location_id)))->results[0]->formatted_address;
    }

    /**
     * loack account
     * @param request
     **/
    function lockAccount($id)
    {
        if ($this->storeRepository->checkStoreById($id)) {
            $store =  $this->storeRepository->selectStoreById($id);
            $store->active = 0;
            $this->storeRepository->updateStore($store);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Tài khoản đã khóa");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, "Khóa tài khoản không thành công");
        }
    }

    /**
     * active
     * @param request
     **/
    function activeAccount($id)
    {
        if ($this->storeRepository->checkStoreById($id)) {
            $store =  $this->storeRepository->selectStoreById($id);
            $store->active = 1;
            $this->storeRepository->updateStore($store);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Tài khoản đã được mở khóa");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, "Khóa tài khoản mở khóa không thành công");
        }
    }

    /**
     * chart 
     * count user register in day 
     **/
    function chart()
    {
        $collection = DB::table('stores')
            ->select(DB::raw("count(created_at) as quantity, DATE_FORMAT(created_at, '%d-%m-%Y') as created_at"))
            ->whereMonth('created_at', date('m'))
            ->groupBy('created_at')
            ->get();
        return Response::responseSuccess($collection);
    }
}
