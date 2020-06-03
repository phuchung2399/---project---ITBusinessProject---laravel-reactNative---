<?php

namespace App\Http\Requests\VoucherRequest;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;

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
            'price' => 'required|min:3|numeric',
            'quantity' => 'required|min:1|numeric',
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
            'voucher_name.min' => 'Tên mã giảm giá quá ngắn',
            'voucher_name.max' => 'Tên mã giảm giá quá dài',
            'voucher_name.regex' => 'Tên mã không hợp lệ',

            'price.required' => 'Vui lòng nhập giá',
            'price.min' => 'Giá không hợp lệ',
            'price.numeric' => 'Giá không hợp lệ',

            'quantity.required' => 'Vui lòng nhập số lượng mã giảm giá',
            'quantity.min' => 'Số lượng giá không hợp lệ',
            'quantity.numeric' => 'Số lượng giá không hợp lệ',
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
