<?php

namespace App\Http\Requests\UserRequest;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;


class AuthUserUpdateProfileRequest extends FormRequest
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
            'avatar'           => 'mimes:jpeg,jpg,png|required|max:5000',
            'user_name'        => ['required', 'string', 'min:2', 'max:20', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
            'email'            => ['required', 'string', 'email', 'max:50', 'regex:/(^[a-zA-Z0-9||@.]+$)+/'],
            'phone'            => ['required', 'string', 'min:10', 'max:10', 'regex:/((09|08|05|03|07)+([0-9]{8})\b)+/'],
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
            'avatar.required'           => 'Vui lòng chọn hình ảnh',
            'avatar.mimes'              => 'Hình ảnh không hợp lệ',
            'avatar.max'                => 'Lưu lượng ảnh quá lớn',
            'user_name.required'        => 'Vui lòng nhập tên của bạn',
            'user_name.string'          => 'Tên của bạn không hợp lệ',
            'user_name.min'             => 'Tên cửa hàng bạn quá ngắn',
            'user_name.max'             => 'Tên cửa hàng bạn quá dài',
            'user_name.regex'           => 'Vui lòng không nhập kí tự đặt biệt',
            'email.required'            => 'Vui lòng nhập email của bạn',
            'email.email'               => 'Email của bạn không đúng',
            'email.string'              => 'Email của bạn không đúng',
            'email.max'                 => 'Email của bạn quá dài',
            'email.unique'              => 'Tài khoản email đã được đăng kí',
            'email.regex'               => 'Email không hợp lệ',
            'phone.required'            => 'Vui lòng nhập số điện thoại của bạn',
            'phone.string'              => 'Số điện thoại của bạn không hợp lệ',
            'phone.min'                 => 'Số điện thoại chỉ được 10 số',
            'phone.max'                 => 'Số điện thoại chỉ được 10 số',
            'phone.unique'              => 'Số điện thoại đã được đăng kí',
            'phone.regex'               => 'Số điện thoại của bạn không hợp lệ',
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
            'user_name' => 'trim|escape|capitalize',
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
