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

    /**
     * @OA\Post(
     *      path="/api/v1/store/login",
     *      summary="Login store",
     *      tags={"store"},
     *      operationId="store_login",
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
     *                 example={"phone": "0967258111", "password": "123456789"}
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
    public function login(AuthStoreLoginRequest $request)
    {
        return $this->storeSevice->login($request);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/store/register",
     *      summary="Store register",
     *      tags={"store"},
     *      operationId="store_register",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="image",
     *                     type="file"
     *                 ),
     *                 @OA\Property(
     *                     property="store_name",
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
     *                     property="address",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="open_time",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="close_time",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="location_id",
     *                     type="string"
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
    public function register(AuthStoreRegisterRequest $request)
    {
        return $this->storeSevice->register($request);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/store/password",
     *      summary="Store password change ",
     *      tags={"store"},
     *      operationId="store_password_change",
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
    public function changePasswordStore(AuthStoreChangsePassRequest $request)
    {
        return $this->storeSevice->changePasswordStore($request);
    }

    /**
     * detail
     * 
     * send token on serve and return data store
     **/
    /**
     * detail
     * Get the authenticated User
     */
    /**
     * @OA\Post(
     *      path="/api/v1/store/me",
     *      summary="Send token on server and return data store",
     *      tags={"store"},
     *      operationId="store_detail",
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
        return $this->storeSevice->detail();
    }

    /**
     * @OA\Post(
     *      path="/api/v1/store/logout",
     *      summary="Store logout",
     *      tags={"store"},
     *      operationId="logout_store",
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
        return $this->storeSevice->logout($request);
    }

    function confirmAccountStore($id)
    {
        $data = $this->storeSevice->confirmAccount($id);
        return view('confirm.storeConfirmRegister',  compact('id', 'data'));
    }

    /**
     * @OA\Post(
     *      path="/api/v1/store/mail-reset-password",
     *      summary="send email reset password store",
     *      tags={"store"},
     *      operationId="store_mail_reset_password",
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
    function sendEmailResetPassword(AuthStoreEmailRequest $request)
    {
        return $this->storeSevice->sendEmailResetPasswordStore($request);
    }

    public function resetPasswordStore(AuthStoreResetPassRequest $request, $id)
    {
        return $this->storeSevice->resetPasswordStore($request, $id);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/store/store-detail/{id}",
     *      summary="Get Store by id",
     *      tags={"store"},
     *      operationId="get_store_by_id",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
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
    public function selectStoreById($id)
    {
        return $this->storeSevice->selectStoreById($id);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/store/store-all",
     *      summary="Get all store",
     *      tags={"store"},
     *      operationId="get_all_store",
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
    public function selectAllStore()
    {
        return $this->storeSevice->selectAllStore();
    }

    /**
     * @OA\Post(
     *      path="/api/v1/store/store-search",
     *      summary="Search store",
     *      tags={"store"},
     *      operationId="store_search",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="key",
     *                     type="string",
     *                 ),
     *                 example={"key": "nail"}
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
    function searchStore(Request $request)
    {
        return $this->storeSevice->searchStore($request->key);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/store/store-search-star",
     *      summary="Search store by star",
     *      tags={"store"},
     *      operationId="store_search_star",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="star",
     *                     type="interger",
     *                 ),
     *                 example={"star": "5"}
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
    function selectStoreByStar(Request $request)
    {
        return $this->storeSevice->selectStoreByStar($request->star);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/store/store-point-search/{id}",
     *      summary="Update point search for store",
     *      tags={"store"},
     *      operationId="update_point_search_store",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *          )
     *      ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="point_search",
     *                     type="interger",
     *                 ),
     *                 example={"point_search": "1"}
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
    function updatePointSearch(AuthStoreUpdatePointSearch $request, $id)
    {
        return $this->storeSevice->updatePointSearch($request, $id);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/store/store-sort-star-home",
     *      summary="API show store for home page - show the stores by star",
     *      tags={"store"},
     *      operationId="store_sort_star_home",
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
    function selectStoreByStarInHome()
    {
        return $this->storeSevice->selectStoreByStarInHome();
    }

    /**
     * @OA\Get(
     *      path="/api/v1/store/store-new-home",
     *      summary="API show store for home page - show the new stores",
     *      tags={"store"},
     *      operationId="store_new_home",
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
    function selectStoreNewByInHome()
    {
        return $this->storeSevice->selectStoreNewByInHome();
    }

    /**
     * @OA\Post(
     *      path="/api/v1/store/update-image_store",
     *      summary="update image store",
     *      tags={"store"},
     *      operationId="update_image_store",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="image",
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
    function updateImageStore(AuthUpdateImageStoreRequest $request)
    {
        return $this->storeSevice->updateImageStore($request);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/store/mail-confirm-update-email",
     *      summary="Send email confirm update new email",
     *      tags={"store"},
     *      operationId="mail_confirm_update_email",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="email",
     *                     type="string",
     *                 ),
     *                 example={"email": "abc@gmail.com"}
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

    /**
     * @OA\Put(
     *      path="/api/v1/store/update-phone-store",
     *      summary="Update phone store",
     *      tags={"store"},
     *      operationId="update_phone_store",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="phone",
     *                     type="interger",
     *                 ),
     *                 example={"phone": "0967000000"}
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
    function updatePhoneStore(AuthStoreUpdatePhoneRequest $request)
    {
        return $this->storeSevice->updatePhoneStore($request);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/store/update-store-name",
     *      summary="Update store name",
     *      tags={"store"},
     *      operationId="update_store_name",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="store_name",
     *                     type="string",
     *                 ),
     *                 example={"store_name": "ahihi"}
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
    function updateStoreName(AuthStoreUpdateStoreNameRequest $request)
    {
        return $this->storeSevice->updateStoreName($request);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/store/update-store-address",
     *      summary="Update store address",
     *      tags={"store"},
     *      operationId="update_store_address",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="address",
     *                     type="string",
     *                 ),
     *                 example={"address": "ahihi"}
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
    function updateAddressStore(AuthStoreUpdateAddressRequest $request)
    {
        return $this->storeSevice->updateAddressStore($request);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/store/update-time-open-close-store",
     *      summary="Update open time - close time of store",
     *      tags={"store"},
     *      operationId="update_time_open_close_store",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="open_time",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="close_time",
     *                     type="string",
     *                 ),
     *                 example={"open_time": "05:00:00","close_time": "21:00:00"}
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
    function updateTimeOpenCloseStore(AuthStoreUpdateTimeStoreRequest $request)
    {
        return $this->storeSevice->updateTimeOpenCloseStore($request);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/store/update-location-store",
     *      summary="Update location of store",
     *      tags={"store"},
     *      operationId="update_location_store",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="location_id",
     *                     type="string",
     *                 ),
     *                 example={"location_id": "3891672d-1362-49a6-b986-81eaead53b47"}
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
    function updateLocationStore(AuthStoreUpdateLocationRequest $request)
    {
        return $this->storeSevice->updateLocationStore($request);
    }
}
