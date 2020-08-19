<?php

namespace App\Http\Requests\StoreRequest;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;
use Illuminate\Http\JsonResponse;

class AuthStoreUpdateTimeStoreRequest extends FormRequest
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
            'open_time'  => ['required', 'regex:/(^(0[0-1]?[0-9]|1[0-1]?[0-9]|2[0-3]):([0-5][0-9]:([0-5][0-9]))$)+/'],
            'close_time' => ['required', 'regex:/(^(0[0-1]?[0-9]|1[0-1]?[0-9]|2[0-3]):([0-5][0-9]:([0-5][0-9]))$)+/'],
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
            'open_time.required'  => 'Vui lòng nhập giờ mở cửa',
            'open_time.regex'     => 'Giờ không hợp lệ',
            'close_time.required' => 'Vui lòng nhập giờ đóng cửa',
            'close_time.regex'    => 'Giờ không hợp lệ',
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
            'open_time'  => 'trim',
            'close_time' => 'trim',

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
