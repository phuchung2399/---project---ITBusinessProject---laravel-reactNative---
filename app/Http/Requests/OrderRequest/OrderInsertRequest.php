<?php

namespace App\Http\Requests\OrderRequest;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;
use Illuminate\Http\JsonResponse;

class OrderInsertRequest extends FormRequest
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
            'order_day'  => ['required', 'regex:/(\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$)+/'],
            'order_time' => ['required', 'regex:/(^(0[0-1]?[0-9]|1[0-1]?[0-9]|2[0-3]):([0-5][0-9]:([0-5][0-9]))$)+/'],
            'total'      => ['required', 'numeric'],
             // 'note'       => ['regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
            'store'      => ['required'],
            'service'    => ['required'],
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
            'order_day.required'  => 'Vui lòng nhập ngày',
            'order_day.regex'     => 'Ngày không hợp lệ',
            'order_time.required' => 'Vui lòng nhập giờ',
            'order_time.regex'    => 'Giờ không hợp lệ',
            'total.required'      => 'Tổng giá không chưa được tính',
            'total.numeric'       => 'Tổng giá không hợp lệ',
            'note.regex'          => 'Ghi chú có chứa kí tự đặc biệt',
            'store.required'      => 'Hệ thống đang bảo trì, vui lòng đặt đơn của hàng khác',
            'service.required'    =>  'Bạn chưa chọn dịch vụ',
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
            'address'      => 'trim',
            'order_day'    => 'trim',
            'order_time'   => 'trim',
            'note'         => 'trim',
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
