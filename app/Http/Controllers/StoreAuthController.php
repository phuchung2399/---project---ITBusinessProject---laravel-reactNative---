<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequest\AuthStoreUpdateStoreNameRequest;
use App\Http\Requests\StoreRequest\AuthStoreUpdateTimeStoreRequest;
use App\Http\Requests\StoreRequest\AuthStoreUpdateLocationRequest;
use App\Http\Requests\StoreRequest\AuthStoreUpdateAddressRequest;
use App\Http\Requests\StoreRequest\AuthStoreChangsePassRequest;
use App\Http\Requests\StoreRequest\AuthUpdateImageStoreRequest;
use App\Http\Requests\StoreRequest\AuthStoreUpdateEmailRequest;
use App\Http\Requests\StoreRequest\AuthStoreUpdatePointSearch;
use App\Http\Requests\StoreRequest\AuthStoreUpdatePhoneRequest;
use App\Http\Requests\StoreRequest\AuthStoreResetPassRequest;
use App\Http\Requests\StoreRequest\AuthStoreRegisterRequest;
use App\Http\Requests\StoreRequest\AuthStoreEmailRequest;
use App\Http\Requests\StoreRequest\AuthStoreLoginRequest;
use App\Services\StoreSevice;
use Illuminate\Http\Request;

class StoreAuthController extends Controller
{
    private $storeSevice;

    public function __construct(StoreSevice $storeSevice)
    {
        $this->storeSevice = $storeSevice;
    }

    public function login(AuthStoreLoginRequest $request)
    {
        return $this->storeSevice->login($request);
    }

    public function register(AuthStoreRegisterRequest $request)
    {
        return $this->storeSevice->register($request);
    }

    public function changePasswordStore(AuthStoreChangsePassRequest $request)
    {
        return $this->storeSevice->changePasswordStore($request);
    }

    /**
     * detail
     * 
     * send token on serve and return data store
     **/
    public function detail()
    {
        return $this->storeSevice->detail();
    }

    public function logout(Request $request)
    {
        return $this->storeSevice->logout($request);
    }

    function confirmAccountStore($id)
    {
        $data = $this->storeSevice->confirmAccount($id);
        return view('confirm.storeConfirmRegister',  compact('id', 'data'));
    }

    function sendEmailResetPassword(AuthStoreEmailRequest $request)
    {
        return $this->storeSevice->sendEmailResetPasswordStore($request);
    }

    public function resetPasswordStore(AuthStoreResetPassRequest $request, $id)
    {
        return $this->storeSevice->resetPasswordStore($request, $id);
    }

    public function selectStoreById($id)
    {
        return $this->storeSevice->selectStoreById($id);
    }

    public function selectAllStore()
    {
        return $this->storeSevice->selectAllStore();
    }

    function searchStore(Request $request)
    {
        return $this->storeSevice->searchStore($request->key);
    }

    function selectStoreByStar(Request $request)
    {
        return $this->storeSevice->selectStoreByStar($request->star);
    }

    function updatePointSearch(AuthStoreUpdatePointSearch $request, $id)
    {
        return $this->storeSevice->updatePointSearch($request, $id);
    }

    function selectStoreByStarInHome()
    {
        return $this->storeSevice->selectStoreByStarInHome();
    }

    function selectStoreNewByInHome()
    {
        return $this->storeSevice->selectStoreNewByInHome();
    }

    function updateImageStore(AuthUpdateImageStoreRequest $request)
    {
        return $this->storeSevice->updateImageStore($request);
    }

    function sendEmailConfirmUpdateEmailStore(AuthStoreUpdateEmailRequest $request)
    {
        return $this->storeSevice->sendEmailConfirmUpdateEmailStore($request);
    }

    function getPageUpdateEmailStore($id)
    {
        $data = [
            'title' => 'Xác nhận đổi email',
        ];
        return view('confirm.storeConfirmUpdateEmail', compact('data', 'id'));
    }

    function updateEmailStore(Request $request, $id)
    {
        return $this->storeSevice->updateEmailStore($request, $id);
    }

    function updatePhoneStore(AuthStoreUpdatePhoneRequest $request)
    {
        return $this->storeSevice->updatePhoneStore($request);
    }

    function updateStoreName(AuthStoreUpdateStoreNameRequest $request)
    {
        return $this->storeSevice->updateStoreName($request);
    }

    function updateAddressStore(AuthStoreUpdateAddressRequest $request)
    {
        return $this->storeSevice->updateAddressStore($request);
    }

    function updateTimeOpenCloseStore(AuthStoreUpdateTimeStoreRequest $request)
    {
        return $this->storeSevice->updateTimeOpenCloseStore($request);
    }

    function updateLocationStore(AuthStoreUpdateLocationRequest $request)
    {
        return $this->storeSevice->updateLocationStore($request);
    }
}
