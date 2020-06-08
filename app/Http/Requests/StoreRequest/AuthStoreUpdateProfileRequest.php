<?php

namespace App\Http\Requests\StoreRequest;


use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;

class AuthStoreUpdateProfileRequest extends FormRequest
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
            'store_name'  => ['required', 'min:6', 'max:30', 'string', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
            'email'       => ['required', 'string', 'max: 50', 'email', 'regex:/(^[a-zA-Z0-9||@.]+$)+/'],
            'phone'       => ['required', 'numeric', 'regex:/((09|08|05|03|07)+([0-9]{8})\b)+/'],
            'address'     => ['required', 'min:6', 'max:50', 'string', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
            'open_time'   => 'required',
            'close_time'  => 'required',
            'location_id' => 'required'
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
            'store_name.required' => 'Vui lòng nhập tên của hàng của bạn',
            'store_name.min'      => 'Tên cửa hàng bạn quá ngắn',
            'store_name.max'      => 'Tên cửa hàng bạn quá dài',
            'store_namestring'    => 'Tên cửa hàng của bạn không hợp lệ',
            'store_name.regex'    => 'Vui lòng không nhập kí tự đặc biệt',

            'email.required'      => 'Vui lòng nhập email của bạn',
            'email.email'         => 'Email của bạn không hợp lệ',
            'email.string'        => 'Email của bạn không hợp lệ',
            'email.regex'         => 'Email của bạn không hợp lệ',

            'phone.required'      => 'Vui lòng nhập số điện thoại của bạn',
            'phone.numeric'       => 'Số điện thoại của bạn không hợp lệ',
            'phone.regex'         => 'Số điện thoại của bạn không hợp lệ',

            'address.required'    => 'Vui lòng nhập địa chỉ của hàng',
            'address.min'         => 'Địa chỉ cửa hàng của bạn quá ngắn',
            'address.max'         => 'Địa chỉ cửa hàng của bạn quá dài',
            'address.string'      => 'Địa chỉ cửa hàng của bạn không hợp lệ',
            'address.regex'       => 'Vui lòng không nhập kí tự đặc biệt',

            'open_time.required'  => 'Vui lòng nhập thời gian mở cửa hàng',
            'close_time.required' => 'Vui lòng nhập thời gian đóng cửa hàng',
            'location_id'         => 'Vui lòng chọn vị trí cửa hàng',
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
            'address'     => 'trim',
            'open_time'   => 'trim',
            'close_time'  => 'trim',
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
