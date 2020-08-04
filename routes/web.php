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

// Route::get('/ahihi', function () {
//     return view('ahihi');
// });

// Route::get('/ahuhu', function () {
//     return view('welcome');
// });


/**
 * confirm account for store and user
 **/
Route::get('confirm-store/{id}', 'StoreAuthController@confirmAccountStore'); // store
Route::get('confirm-user/{id}', 'UserAuthController@confirmAccountUser'); // user

/**
 * reset password for user
 **/
Route::get('reset-password-user/{id}/{token}', 'UserAuthController@getPageResetPasswordUser');
Route::get('reset-password-store/{id}/{token}', 'UserAuthController@getPageResetPasswordUser');

/**
 * confirm change email for store and user
 **/
Route::get('confirm-update-email-store/{id}/{token}', 'StoreAuthController@getPageUpdateEmailStore'); // store
Route::get('confirm-update-email-user/{id}/{token}', 'UserAuthController@getPageUpdateEmailUser'); // user
