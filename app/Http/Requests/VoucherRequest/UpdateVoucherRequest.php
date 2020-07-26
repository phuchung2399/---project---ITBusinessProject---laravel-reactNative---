<?php

namespace App\Http\Requests\VoucherRequest;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;
use Illuminate\Http\JsonResponse;

class UpdateVoucherRequest extends FormRequest
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
     * /^\S*$/u use to split space between the word
     * @return array
     */
    public function rules()
    {
        return [
            'voucher_name' => 'required|min:1|max:15|string|regex:/(^[A-Za-z0-9]+$)+/',
            'price'        => 'required|min:1|max:100000000|numeric|regex:/(^[0-9]+$)+/',
            'quantity'     => 'required|min:1|max:1000|numeric|regex:/(^[0-9]+$)+/',
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
            'voucher_name.required' => 'Vui lòng nhập tên mã giảm giá vào',
            'voucher_name.min'      => 'Tên mã giảm giá quá ngắn',
            'voucher_name.max'      => 'Tên mã giảm giá quá dài',
            'voucher_name.regex'    => 'Tên mã không hợp lệ',
            'price.required'        => 'Vui lòng nhập giá',
            'price.min'             => 'Giá mã quá nhỏ',
            'price.max'             => 'Giá mã quá lớn',
            'price.numeric'         => 'Giá không hợp lệ',
            'price.regex'           => 'Giá không hợp lệ',
            'quantity.required'     => 'Vui lòng nhập số lượng mã giảm giá',
            'quantity.min'          => 'Số lượng mã quá ít',
            'quantity.max'          => 'Số lượng mã quá lớn',
            'quantity.numeric'      => 'Số lượng mã không hợp lệ',
            'quantity.regex'        => 'Số lượng mã không hợp lệ',
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
            'voucher_name' => 'trim|uppercase|strip_tags',
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
