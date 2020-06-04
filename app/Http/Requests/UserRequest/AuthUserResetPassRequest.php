<?php

namespace App\Http\Requests\UserRequest;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;

class AuthUserResetPassRequest extends FormRequest
{
    use SanitizesInput;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password' => ['required', 'min:8', 'max:16', 'string', 'regex:/(^[a-zA-Z0-9||@#$%&]+$)+/'],
            'confirm_password' => 'required|same:password',
        ];
    }

    /**
     * Get the error messages that apply to the request parameters.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'password.required'    => 'Vui lòng nhập mật khẩu mới',
            'password.min'    => 'Vui lòng nhập mật khẩu mới dài hơn 8 kí tự',
            'password.max'  => 'Vui lòng nhập mật khẩu ngắn hơn 16 kí tự',
            'password.regex' =>
            'Mật khẩu mới có chứa kí tự đặc biệt hoặc khoản rống. Bạn chỉ được dùng các kí tự đặc biệt @ # $ % & trong mật khẩu',
            'confirm_password.required'  => 'Vui lòng nhập mật khẩu xác nhận',
            'confirm_password.same'  => 'Mật khẩu không trùng khớp',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json([
            'errors' => $errors
        ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
    }
}
