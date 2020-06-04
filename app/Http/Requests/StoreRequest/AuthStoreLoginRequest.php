<?php

namespace App\Http\Requests\StoreRequest;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;

class AuthStoreLoginRequest extends FormRequest
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
            'phone' => ['required', 'numeric', 'regex:/((09|08|05|03|07)+([0-9]{8})\b)+/'],
            'password' => ['required', 'min:8', 'max: 16', 'string', 'regex:/(^[a-zA-Z0-9||@#$%&]+$)+/'],
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
            'phone.required'    => 'Vui lòng nhập số điện thoại của bạn',
            'phone.numeric'    => 'Số điện thoại không hợp lệ',
            'phone.regex' => 'Số điện thoại không hợp lệ',
            'password.required'    => 'Vui lòng nhập mật khẩu',
            'password.min'    => 'Vui lòng nhập mật khẩu dài hơn 8 kí tự',
            'password.max'  => 'Vui lòng nhập mật khẩu ngắn hơn 16 kí tự',
            'password.regex' => [
                'Mật khẩu có chứa kí tự đặc biệt hoặc khoản rống',
                'Bạn chỉ được dùng các kí tự đặc biệt @ # $ % & trong mật khẩu'
            ],
        ];
    }

    /**
     *  Filters to be applied to the input.
     *
     * @return array
     */
    public function filters()
    {
        return [
            'phone' => 'trim',
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
