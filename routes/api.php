<?php

// use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Artisan;
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

Route::get('clear', function () {
    Artisan::call('cache:clear');
    //  Artisan::call('route:clear');
    Artisan::call('config:clear');
    // Artisan::call('view:clear');
    return "Cache is cleared";
});

Route::prefix('v1/')->group(function () {
    Route::get('location', 'LocationController@getLocations');
    Route::get('location/{id}', 'LocationController@getLocationById');
    Route::group(['middleware' => 'auth:admins'], function () {
        Route::post('location', 'LocationController@postLocation'); // auth admin
        Route::put('location/{id}', 'LocationController@putLocation'); // auth admin
        Route::delete('location/{id}', 'LocationController@deleteLocation'); // auth admin
    });
});

Route::prefix('v1/')->group(function () {
    Route::get('slide', 'SlideController@getSlide');
    Route::get('slide/{id}', 'SlideController@getSlideById');
    Route::group(['middleware' => 'auth:admins'], function () {
        Route::post('slide', 'SlideController@postSlide'); // auth admin
        Route::post('slide/{id}', 'SlideController@putSlide'); // auth admin
        Route::delete('slide/{id}', 'SlideController@deleteSlide'); // auth admin
    });
});

Route::prefix('v1/')->group(function () {
    Route::get('voucher', 'VoucherController@getVouchers');
    Route::get('voucher/{id}', 'VoucherController@getVoucherById');
    Route::group(['middleware' => 'auth:admins'], function () {
        Route::post('voucher', 'VoucherController@postVoucher'); // auth admin
        Route::post('voucher/{id}', 'VoucherController@putVoucher'); // auth admin
        Route::delete('voucher/{id}', 'VoucherController@deleteVoucher'); // auth admin
    });
});

Route::prefix('v1/user')->group(function () {
    Route::post('login', 'UserAuthController@login');
    Route::post('register', 'UserAuthController@register');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::put('update-profile/{id}', 'UserAuthController@updateProfile');
        Route::put('password/{id}', 'UserAuthController@changePasswordUser'); // router change password
        Route::post('me', 'UserAuthController@detail');
        Route::post('logout', 'UserAuthController@logout');
        Route::put('reset-password/{id}', 'UserAuthController@resetPasswordUser');
    });
    Route::post('mail-reset-password', 'UserAuthController@sendEmailResetPassword');
});

Route::prefix('v1/store')->group(function () {
    Route::post('login', 'StoreAuthController@login');
    Route::post('register', 'StoreAuthController@register');
    Route::group(['middleware' => 'auth:stores'], function () {
        Route::put('update-profile/{id}', 'StoreAuthController@updateProfile');
        Route::put('password/{id}', 'StoreAuthController@changePasswordStore');
        Route::post('me', 'StoreAuthController@detail');
        Route::post('logout', 'UserAuthController@logout');
        Route::put('reset-password/{id}', 'StoreAuthController@resetPasswordStore');
    });
    Route::post('mail-reset-password', 'StoreAuthController@sendEmailResetPassword');
});

Route::prefix('v1/')->group(function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('service', 'ServiceController@getService'); // select all service auth for user
        Route::post('service/search', 'ServiceController@searchService'); // search auth for user
    });
    Route::group(['middleware' => 'auth:stores'], function () {
        Route::post('service', 'ServiceController@postService'); // create servive
        Route::put('service/{id}', 'ServiceController@putService'); // update servive
        Route::delete('service/{id}', 'ServiceController@deleteservice'); // delete servive
    });
    Route::middleware(['auth:api,stores'])->get('service-store/{id}', 'ServiceController@getServiceByIdStore');
});

Route::prefix('v1/')->group(function () {
    Route::middleware(['auth:api,stores,admins'])->get('comment/{id}', 'CommentController@getCommetByIdStore');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('comment', 'CommentController@postComment'); // add comment auth for user
        Route::put('comment/{id}', 'CommentController@putComment'); // edit comment auth for user
    });
    Route::middleware(['auth:admins'])->delete('comment/{id}', 'CommentController@deleteComment'); // admin
});

Route::prefix('v1/admin')->group(function () {
    Route::group(['middleware' => 'auth:admins'], function () {
        Route::post('register', 'AdminController@register'); // auth admin
        Route::put('change-password/{id}', 'AdminController@changePasswordAdmin'); // auth admin
        Route::post('me', 'AdminController@detail');
        Route::post('logout', 'AdminController@logout');
        Route::delete('delete/{id}', 'AdminController@deleteAdmin');
    });
    Route::post('login', 'AdminController@login');
});
