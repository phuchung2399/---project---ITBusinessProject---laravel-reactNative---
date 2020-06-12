<?php

namespace App\Helper;

class Response
{
    public static function responseMessage($status, $message)
    {
        return response()->json(
            ["source" =>
            [
                'status' => $status,
                "message" => $message
            ]],
            $status
        );
    }

    public static function responseSuccess($status, $data)
    {
        return response()->json(
            ["source" =>
            [
                'status' => $status,
                'data' => $data
            ]],
            $status
        );
    }

    public static function responseLoginSuccess($token, $data, $object, $status)
    {
        return response()->json(
            ["source" =>
            [
                'status' => $status,
                'data' => [
                    'token' => $token,
                    $object => $data
                ]
            ]],
            $status
        );
    }

    public static function responseRegisterSuccess($email, $status)
    {
        return response()->json(
            ["source" =>
            [
                'status' => $status,
                'data' => [
                    'message' => 'Vui lòng xác nhận tài khoản tại email: ' . $email
                ]
            ]],
            $status
        );
    }
}
