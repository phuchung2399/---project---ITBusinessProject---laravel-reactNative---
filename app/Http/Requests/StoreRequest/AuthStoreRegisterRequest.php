<?php

namespace App\Http\Requests\StoreRequest;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;
use Illuminate\Http\JsonResponse;

class AuthStoreRegisterRequest extends FormRequest
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
            'image'            => 'mimes:jpeg,jpg,png|required|max:5000',
            'store_name'       => ['required', 'string', 'min:6', 'max:30', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
            'email'            => ['required', 'string', 'min:6', 'max:50', 'email', 'unique:stores', 'regex:/(^[a-zA-Z0-9||@.]+$)+/'],
            'phone'            => ['required', 'string', 'min:10', 'max:10', 'unique:stores', 'regex:/((09|08|05|03|07)+([0-9]{8})\b)+/'],
            'address'          => ['required', 'string', 'min:6', 'max:50', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
            'password'         => ['required', 'string', 'min:8', 'max: 16', 'regex:/(^[a-zA-Z0-9||@#$%&]+$)+/'],
            'open_time' => ['required', 'regex:/(^(0[0-1]?[0-9]|1[0-1]?[0-9]|2[0-3]):([0-5][0-9]:([0-5][0-9]))$)+/'],
            'close_time' => ['required', 'regex:/(^(0[0-1]?[0-9]|1[0-1]?[0-9]|2[0-3]):([0-5][0-9]:([0-5][0-9]))$)+/'],
            'location_id'      => 'required',
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
            'image.required'            => 'Vui lòng chọn hình ảnh',
            'image.mimes'               => 'Hình ảnh không hợp lệ',
            'image.max'                 => 'Lưu lượng ảnh quá lớn',
            'store_name.required'       => 'Vui lòng nhập tên cửa hàng của bạn',
            'store_name.min'            => 'Tên cửa hàng của bạn quá ngắn',
            'store_name.max'            => 'Tên cửa hàng của bạn quá dài',
            'store_names.string'        => 'Tên cửa hàng của bạn không hợp lệ',
            'store_name.regex'          => 'Vui lòng không nhập kí tự đặt biệt',
            'email.required'            => 'Vui lòng nhập email của bạn',
            'email.email'               => 'Email của bạn không hợp lệ',
            'email.string'              => 'Email của bạn không hợp lệ',
            'email.min'                 => 'Email của bạn quá ngắn',
            'email.max'                 => 'Email của bạn quá dài',
            'email.unique'              => 'Tài khoản email đã được đăng kí',
            'email.regex'               => 'Email của bạn không hợp lệ',
            'phone.required'            => 'Vui lòng nhập số điện thoại của bạn',
            'phone.string'              => 'Số điện thoại của bạn không hợp lệ',
            'phone.min'                 => 'Số điện thoại chỉ được 10 số',
            'phone.max'                 => 'Số điện thoại chỉ được 10 số',
            'phone.unique'              => 'Số điện thoại đã được đăng kí',
            'phone.regex'               => 'Số điện thoại của bạn không hợp lệ',
            'password.required'         => 'Vui lòng nhập mật khẩu',
            'password.min'              => 'Vui lòng nhập mật khẩu dài hơn 8 kí tự',
            'password.max'              => 'Vui lòng nhập mật khẩu ngắn hơn 16 kí tự',
            'password.regex'            => 'Mật khẩu có chứa kí tự đặc biệt hoặc khoản rống. Bạn chỉ được dùng các kí tự đặc biệt @ # $ % & trong mật khẩu',
            'confirm_password.required' => 'Vui lòng nhập mật khẩu xác nhận',
            'confirm_password.same'     => 'Mật khẩu không trùng khớp',
            'address.required'          => 'Vui lòng nhập địa chỉ cửa hàng',
            'address.min'               => 'Địa chỉ cửa hàng của bạn quá ngắn',
            'address.max'               => 'Địa chỉ cửa hàng của bạn quá dài',
            'address.string'            => 'Địa chỉ cửa hàng không hợp lệ',
            'address.regex'             => 'Vui lòng không nhập kí tự đặt biệt',
            'open_time.required'        => 'Vui lòng nhập giờ mở cửa',
            'open_time.regex'           => 'Giờ không hợp lệ',
            'close_time.required'       => 'Vui lòng nhập giờ đóng cửa',
            'close_time.regex'          => 'Giờ không hợp lệ',
            'location_id'               => 'Vui lòng chọn vị trí cửa hàng',
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
            'store_name'  => 'trim|escape|capitalize',
            'email'       => 'trim|escape|lowercase',
            'address'     => 'trim',
            'open_time' => 'trim',
            'close_time' => 'trim',
            'location_id' => 'trim'
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
