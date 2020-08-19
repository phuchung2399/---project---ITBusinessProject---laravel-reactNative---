<?php

// use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('clear', 'ClearController@clear');

Route::prefix('v1/')->group(function () {
    Route::middleware(['auth:api,stores,admins'])->get('location', 'LocationController@getLocations');
    Route::middleware(['auth:api,stores,admins'])->get('location/{id}', 'LocationController@getLocationById');
    Route::group(['middleware' => 'auth:admins'], function () {
        Route::post('location', 'LocationController@postLocation'); // auth admin
        Route::put('location/{id}', 'LocationController@putLocation'); // auth admin
        Route::delete('location/{id}', 'LocationController@deleteLocation'); // auth admin
    });
});

Route::prefix('v1/')->group(function () {
    Route::middleware(['auth:api,admins'])->get('slide', 'SlideController@getSlide');
    Route::middleware(['auth:api,admins'])->get('slide/{id}', 'SlideController@getSlideById');
    Route::group(['middleware' => 'auth:admins'], function () {
        Route::post('slide', 'SlideController@postSlide'); // auth admin
        Route::put('slide/{id}', 'SlideController@putSlide'); // auth admin
        Route::delete('slide/{id}', 'SlideController@deleteSlide'); // auth admin
    });
});

Route::prefix('v1/')->group(function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('voucher-to-user', 'VoucherController@getVouchersToUser');
        Route::get('voucher/{id}', 'VoucherController@getVoucherById');
        Route::post('total-by-voucher', 'VoucherController@hanldeTotalByVoucher');
    });
    Route::group(['middleware' => 'auth:admins'], function () {
        Route::get('voucher', 'VoucherController@getVouchers');
        Route::post('voucher', 'VoucherController@postVoucher'); // auth admin
        Route::put('voucher/{id}', 'VoucherController@putVoucher'); // auth admin
        Route::delete('voucher/{id}', 'VoucherController@deleteVoucher'); // auth admin
    });
});

Route::prefix('v1/user')->group(function () {
    Route::post('login', 'UserAuthController@login');
    Route::post('register', 'UserAuthController@register');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::put('update-profile', 'UserAuthController@updateProfile');
        Route::put('password', 'UserAuthController@changePasswordUser'); // router change password
        Route::post('me', 'UserAuthController@detail');
        Route::post('logout', 'UserAuthController@logout');
        Route::put('reset-password/{id}', 'UserAuthController@resetPasswordUser');
        Route::put('update-user-image', 'UserAuthController@updateImageUser');
        Route::post('mail-confirm-update-email', 'UserAuthController@sendEmailConfirmUpdateEmailUser');
        Route::put('update-email/{id}', 'UserAuthController@updateEmailUser');
        Route::put('update-user-phone', 'UserAuthController@updatePhoneUser');
        Route::put('update-user-name', 'UserAuthController@updateUserName');
    });
    Route::post('mail-reset-password', 'UserAuthController@sendEmailResetPassword');
});

Route::prefix('v1/store')->group(function () {
    Route::post('login', 'StoreAuthController@login');
    Route::post('register', 'StoreAuthController@register');
    Route::group(['middleware' => 'auth:stores'], function () {
        // Route::put('update-profile/{id}', 'StoreAuthController@updateProfile');
        Route::put('password', 'StoreAuthController@changePasswordStore');
        Route::post('me', 'StoreAuthController@detail');
        Route::post('logout', 'UserAuthController@logout');
        Route::put('reset-password/{id}', 'StoreAuthController@resetPasswordStore');
        Route::put('update-image_store', 'StoreAuthController@updateImageStore');
        Route::post('mail-confirm-update-email', 'StoreAuthController@sendEmailConfirmUpdateEmailStore');
        Route::put('update-email/{id}', 'StoreAuthController@updateEmailStore');
        Route::put('update-phone-store', 'StoreAuthController@updatePhoneStore');
        Route::put('update-store-name', 'StoreAuthController@updateStoreName');
        Route::put('update-store-address', 'StoreAuthController@updateAddressStore');
        Route::put('update-time-open-close-store', 'StoreAuthController@updateTimeOpenCloseStore');
        Route::put('update-location-store', 'StoreAuthController@updateLocationStore');
    });
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('store-detail/{id}', 'StoreAuthController@selectStoreById');
        Route::get('store-all', 'StoreAuthController@selectAllStore');
        Route::post('store-search-star', 'StoreAuthController@selectStoreByStar'); // search auth for user
        Route::get('store-sort-star-home', 'StoreAuthController@selectStoreByStarInHome');
        Route::get('store-new-home', 'StoreAuthController@selectStoreNewByInHome');
    });
    Route::post('mail-reset-password', 'StoreAuthController@sendEmailResetPassword');
    Route::middleware(['auth:api,admins'])->post('store-search', 'StoreAuthController@searchStore'); // search auth for user and admin
    Route::middleware(['auth:admins'])->post('store-point-search/{id}', 'StoreAuthController@updatePointSearch'); // search auth admin
});

Route::prefix('v1/')->group(function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('services', 'ServiceController@getService'); // select all service auth for user
    });
    Route::group(['middleware' => 'auth:stores'], function () {
        Route::post('service', 'ServiceController@postService'); // create servive
        Route::put('service/{id}', 'ServiceController@putService'); // update servive
        Route::delete('service/{id}', 'ServiceController@deleteservice'); // delete servive
        Route::post('service-search', 'ServiceController@searchService'); // search auth for user
    });
    Route::middleware(['auth:api,stores'])->get('service-store/{id}', 'ServiceController@getServiceByIdStore');
});

Route::prefix('v1/')->group(function () {
    Route::middleware(['auth:api,stores,admins'])->get('comment-store/{id}', 'CommentController@getCommetByIdStore');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('comment', 'CommentController@postComment'); // add comment auth for user
        Route::put('comment/{id}', 'CommentController@putComment'); // edit comment auth for user
    });
    Route::middleware(['auth:admins'])->delete('comment/{id}', 'CommentController@deleteComment'); // admin
});

Route::prefix('v1/admin')->group(function () {
    Route::group(['middleware' => 'auth:admins'], function () {
        Route::post('register', 'AdminController@register'); // auth admin
        Route::put('change-password', 'AdminController@changePasswordAdmin'); // auth admin
        Route::post('me', 'AdminController@detail');
        Route::post('logout', 'AdminController@logout');
        Route::delete('delete/{id}', 'AdminController@deleteAdmin');
    });
    Route::post('login', 'AdminController@login');
});

Route::prefix('v1')->group(function () {
    Route::group(['middleware' => 'auth:admins'], function () {
        Route::post('notification/send-notification-store', 'NotificationController@sendNotificationToStore');
        Route::post('notification/send-notification-user', 'NotificationController@sendNotificationToUser');
    });
    Route::middleware(['auth:api'])->get('notification/user', 'NotificationController@selectNotificationToUser');
    Route::middleware(['auth:stores'])->get('notification/store', 'NotificationController@selectNotificationToStore');
    Route::middleware(['auth:api,stores'])->post('notification/mark-at-read/{id}', 'NotificationController@markAsRead');
});

Route::prefix('v1')->group(function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('order-user', 'OrderController@selectOrderUser');
        Route::post('order', 'OrderController@insertOrder');
        Route::post('order-cancel/{id}', 'OrderController@cancelOrderFromUser');
        Route::post('handle-order-cart', 'OrderController@selectOrder');
    });
    Route::group(['middleware' => 'auth:stores'], function () {
        Route::get('order-store', 'OrderController@selectOrderShop');
        Route::post('order-confirm/{id}', 'OrderController@confirmOrderFromStore');
        Route::post('order-refuse/{id}', 'OrderController@refuseOrderFromStore');
        Route::post('order-finish/{id}', 'OrderController@confirmFinishOrderFromStore');
    });
    Route::middleware(['auth:api,stores'])->get('order-detail/{id}', 'OrderController@selectDetailOrderById');
});
