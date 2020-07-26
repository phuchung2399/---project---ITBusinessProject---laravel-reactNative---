<?php

namespace App\Helper;

use App\Helper\Constants\HttpStatus;

class Response
{
    /**
     * responseMessage
     * responseMessage response massage
     * @param status
     * @param message
     * @return json
     **/
    public static function responseMessage($status, $message)
    {
        return response()->json(
            [
                'status' => $status,
                "message" => $message
            ],
            $status
        );
    }

    /**
     * responseSuccess
     * responseSuccess response when response success
     * @param data
     * @return json
     **/
    public static function responseSuccess($data)
    {
        return response()->json(
            [
                'data' => $data
            ],

        );
    }

    /**
     * responseLoginSuccess
     * responseLoginSuccess response when login success
     * @param token
     * @param data *data of account
     * @param object *object login
     * @return json
     **/
    public static function responseLoginSuccess($token, $data, $object)
    {
        return response()->json(
            [
                'data' => [
                    'status' =>   HttpStatus::SUCCESS_RESPONSE,
                    'token' => $token,
                    $object => $data
                ]
            ],
            HttpStatus::SUCCESS_RESPONSE
        );
    }

    /**
     * responseRegisterSuccess
     * responseRegisterSuccess response when register success
     * @param email
     * @return json
     **/
    public static function responseRegisterSuccess($email)
    {
        return response()->json(
            [
                'message' => 'Vui lòng xác nhận tài khoản tại email: ' . $email
            ],
            HttpStatus::SUCCESS_RESPONSE
        );
    }

    /**
     * responseRegisterSuccess
     * responseRegisterSuccess response when register success
     * @param email
     * @return json
     **/
    public static function responseOrderNotifySuccess($data)
    {
        return response()->json(
            [
                'data' => $data
            ],
            HttpStatus::SUCCESS_RESPONSE
        );
    }
}
