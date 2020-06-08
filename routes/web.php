<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



/**
 * confirm account for store and user
 **/
Route::get('confirm-store/{id}', 'StoreAuthController@confirmAccountStore'); // store
Route::get('confirm-user/{id}', 'UserAuthController@confirmAccountUser'); // user

/**
 * reset password for user
 **/
Route::get('reset-password-user/{id}', 'UserAuthController@getPageResetPasswordUser');
Route::get('reset-password-store/{id}', 'UserAuthController@getPageResetPasswordUser');

/**
 * reset password for user
 **/
// Route::get('reset-password-store/{id}', 'LocationController@posta');
// Route::post('reset-password-store/{id}', 'LocationController@a');