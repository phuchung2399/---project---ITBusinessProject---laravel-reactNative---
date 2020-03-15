<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Store;
use Illuminate\Support\Facades\Auth;

class StoreAuthController extends Controller
{
    public $successStatus = 200;

    public function login()
    {
        if (Auth::attempt(['phone' => request('phone'), 'password' => request('password')])) {
            $store = Auth::store();
            $token['token'] =  $store->createToken('token')->accessToken;
            $data['store_id'] = $store->store_id;
            $data['store_name'] = $store->store_name;
            $data['avatar'] = $store->avatar;
            $data['phone'] = $store->phone;
            $data['email'] = $store->email;
            return response()->json(['token' => $token, 'store' => $data], 200);
        } else {
            return response()->json(['error' => 'Login failed'], 401);
        }
    }

    public function register(Request $request)
    {
        $store = new Store();
        $file = $request->file('image')->getClientOriginalName();
        $store->image =  $file;
        $request->file('image')->move('assets\images\stores', $file);
        $store->store_name =  trim(preg_replace('/\s+/', ' ',  $request->store_name));
        $store->phone = $request->phone;
        $store->email = $request->email;
        $store->address = $request->address;
        $store->open_time = $request->open_time;
        $store->open_close = $request->open_close;
        $store->auth = "store";
        $password = trim(preg_replace('/\s+/', '',  $request->password));
        $store->password = bcrypt($password);
        $store->location_id = $request->location_id;
        $store->save();
        $token['token'] =  $store->createToken('token')->accessToken;
        return response()->json(['token' => $token], $this->successStatus);
    }
}
