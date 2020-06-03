<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequest\AuthStoreRequest;
use App\Http\Requests\StoreRequest\AuthStoreUpdateProfileRequest;
use App\Http\Requests\StoreRequest\AuthStoreResetPassRequest;
use App\Http\Requests\StoreRequest\AuthStoreEmailRequest;
use App\Http\Requests\StoreRequest\AuthStoreChangsePassRequest;

use Illuminate\Http\Request;
use App\Services\StoreSevice;

class StoreAuthController extends Controller
{
    private $storeSevice;

    public function __construct(StoreSevice $storeSevice)
    {
        $this->storeSevice = $storeSevice;
    }

    public function login(Request $request)
    {
        return $this->storeSevice->login($request);
    }

    public function register(AuthStoreRequest $request)
    {
        return $this->storeSevice->register($request);
    }

    public function updateProfile(AuthStoreUpdateProfileRequest $request, $id)
    {
        return $this->storeSevice->updateStore($request, $id);
    }

    public function changePasswordStore(AuthStoreChangsePassRequest $request, $id)
    {
        return $this->storeSevice->changePasswordStore($request, $id);
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
}
