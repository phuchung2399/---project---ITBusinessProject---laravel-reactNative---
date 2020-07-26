<?php

namespace App\Http\Requests\ServiceRequest;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;
use Illuminate\Http\JsonResponse;

class ServiceInsertRequest extends FormRequest
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
            'image'         => 'mimes:jpeg,jpg,png|required|max:5000',
            'service_name'  => ['required', 'string', 'min:6', 'max:40', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
            'description'   => ['required', 'string', 'min:6', 'max:200', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
            'price'         => 'required|min:1|max:100000000|numeric|regex:/(^[0-9]+$)+/',
            'reduced_price' => 'required|min:0|max:100000000|numeric|regex:/(^[0-9]+$)+/',
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
            'image.required'         => 'Vui lòng chọn hình ảnh',
            'image.mimes'            => 'Hình ảnh không hợp lệ',
            'image.max'              => 'Lưu lượng ảnh quá lớn',
            'service_name.required'  => 'Vui lòng nhập dịch vụ',
            'service_name.min'       => 'Tên dịch vụ quá ngắn',
            'service_name.max'       => 'Tên dịch vụ quá dài',
            'service_name.string'    => 'Tên dịch vụ không hợp lệ',
            'service_name.regex'     => 'Vui lòng không nhập kí tự đặt biệt',
            'description.required'   => 'Vui lòng nhập mô tả cho dịch vụ',
            'description.min'        => 'Mô tả cho dịch vụ quá ngắn',
            'description.max'        => 'Mô tả cho dịch vụ quá dài',
            'description.string'     => 'Mô tả cho dịch vụ không hợp lệ',
            'description.regex'      => 'Vui lòng không nhập kí tự đặt biệt',
            'price.required'         => 'Vui lòng nhập giá',
            'price.min'              => 'Giá mã quá nhỏ',
            'price.max'              => 'Giá mã quá lớn',
            'price.numeric'          => 'Giá không hợp lệ',
            'price.regex'            => 'Giá không hợp lệ',
            'reduced_price.required' => 'Vui lòng nhập giá giảm',
            'reduced_price.min'      => 'Giá giảm quá nhỏ',
            'reduced_price.max'      => 'Giá giảm quá lớn',
            'reduced_price.numeric'  => 'Giá giảm không hợp lệ',
            'reduced_price.regex'    => 'Giá giảm không hợp lệ',
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
            'service_name'  => 'trim|escape|capitalize',
            'description'   => 'trim|escape|capitalize',
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
