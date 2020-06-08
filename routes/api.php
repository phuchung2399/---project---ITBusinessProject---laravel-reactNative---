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
    Route::post('location', 'LocationController@postLocation');
    Route::put('location/{id}', 'LocationController@putLocation');
    Route::delete('location/{id}', 'LocationController@deleteLocation');
});

// Route::group(['prefix' => 'v1/', 'middleware' => ['auth:api', 'auth_store']], function () {
//     Route::get('location', 'LocationController@getLocations');
// }); // wrong

// Route::middleware(['auth:api', 'stores'])->group(function () {
//      Route::get('location', 'LocationController@getLocations');
// });

// Route::middleware(['auth:api,stores'])->get('v1/location', 'LocationController@getLocations');

Route::prefix('v1/')->group(function () {
    Route::get('slide', 'SlideController@getSlide');
    Route::get('slide/{id}', 'SlideController@getSlideById');
    Route::post('slide', 'SlideController@postSlide');
    Route::put('slide/{id}', 'SlideController@putSlide');
    Route::delete('slide/{id}', 'SlideController@deleteSlide');
});

Route::prefix('v1/')->group(function () {
    Route::get('voucher', 'VoucherController@getVouchers');
    Route::get('voucher/{id}', 'VoucherController@getVoucherById');
    Route::post('voucher', 'VoucherController@postVoucher');
    Route::put('voucher/{id}', 'VoucherController@putVoucher');
    Route::delete('voucher/{id}', 'VoucherController@deleteVoucher');
});

Route::prefix('v1/auth/user')->group(function () {
    Route::post('login', 'UserAuthController@login');
    Route::post('register', 'UserAuthController@register');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('me', 'UserAuthController@detail');
        Route::post('logout', 'UserAuthController@logout');
    });
    Route::put('update-profile/{id}', 'UserAuthController@updateProfile');
    Route::post('mail-reset-password', 'UserAuthController@sendEmailResetPassword');
    Route::put('password/{id}', 'UserAuthController@changePasswordUser'); // router change password
    Route::put('reset-password/{id}', 'UserAuthController@resetPasswordUser');
});

Route::prefix('v1/auth/store')->group(function () {
    Route::post('login', 'StoreAuthController@login');
    Route::post('register', 'StoreAuthController@register');
    Route::group(['middleware' => 'auth:stores'], function () {
        Route::post('me', 'StoreAuthController@detail');
        Route::post('logout', 'UserAuthController@logout');
    });
    Route::put('update-profile/{id}', 'StoreAuthController@updateProfile');
    Route::post('mail-reset-password', 'StoreAuthController@sendEmailResetPassword');
    Route::put('reset-password/{id}', 'StoreAuthController@resetPasswordStore');
    Route::put('password/{id}', 'StoreAuthController@changePasswordStore');
});

Route::prefix('v1/')->group(function () {
    Route::middleware(['auth:api'])->get('service', 'ServiceController@getService');
    Route::middleware(['auth:api'])->post('service/search', 'ServiceController@searchService');
    Route::post('service', 'ServiceController@postService');
    Route::put('service/{id}', 'ServiceController@putService');
    Route::delete('service/{id}', 'ServiceController@deleteservice');
});

Route::prefix('v1/')->group(function () {
    Route::get('comment/{id}', 'CommentController@getCommetByIdStore');
    Route::middleware(['auth:api'])->post('comment', 'CommentController@postComment');
    Route::middleware(['auth:api'])->put('comment/{id}', 'CommentController@putComment');
    Route::middleware(['auth:api'])->delete('comment/{id}', 'CommentController@deleteComment'); // admin
});
