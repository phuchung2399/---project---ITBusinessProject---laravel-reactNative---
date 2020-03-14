<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::prefix('v1/')->group(function () {
    Route::get('location', 'LocationController@getAllLocations');
    Route::get('location/{id}', 'LocationController@getLocation');
    Route::post('location', 'LocationController@createLocation');
    Route::put('location/{id}', 'LocationController@updateLocation');
    Route::delete('location/{id}', 'LocationController@deleteLocation');
});

Route::prefix('v1/')->group(function () {
    Route::get('voucher', 'VoucherController@getAllVouchers');
    Route::get('voucher/{id}', 'VoucherController@getVoucher');
    Route::post('voucher', 'VoucherController@createVoucher');
    Route::put('voucher/{id}', 'VoucherController@updateVoucher');
    Route::delete('voucher/{id}', 'VoucherController@deleteVoucher');
});

Route::prefix('v1/')->group(function () {
    Route::get('slide', 'SlideController@getAllSlides');
    Route::get('slide/{id}', 'SlideController@getSlide');
    Route::post('slide', 'SlideController@createSlide');
    Route::put('slide/{id}', 'SlideController@updateSlide');
    Route::delete('slide/{id}', 'SlideController@deleteSlide');
});

Route::prefix('v1/auth/user')->group(function () {
    Route::post('register', 'UserAuthController@register');
    Route::post('login', 'UserAuthController@login');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('me', 'UserAuthController@user');
    });
    Route::put('profile/{id}', 'UserAuthController@updateProfile');
    Route::put('password/{id}', 'UserAuthController@changePasswordUser');
});

Route::prefix('v1/auth/store')->group(function () {
    Route::post('register', 'StoreAuthController@register');
    Route::post('login', 'StoreAuthController@login');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('me', 'StoreAuthController@store');
    });
    Route::put('profile/{id}', 'StoreAuthController@updateProfile');
    Route::put('password/{id}', 'StoreAuthController@changePasswordUser');
});
