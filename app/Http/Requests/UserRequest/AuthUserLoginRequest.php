<?php

namespace App\Http\Requests\UserRequest;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;

class AuthUserLoginRequest extends FormRequest
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
            'phone'    => ['required', 'string', 'regex:/((09|08|05|03|07)+([0-9]{8})\b)+/'],
            'password' => ['required', 'string', 'regex:/(^[a-zA-Z0-9||@#$%&]+$)+/'],
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
            'phone.string'      => 'Số điện thoại của bạn không hợp lệ',
            'phone.regex'       => 'Số điện thoại của bạn không hợp lệ',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.string'   => 'Mật khẩu không đúng',
            'password.regex'    => 'Mật khẩu không đúng',
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
