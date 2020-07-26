<?php

namespace App\Http\Requests\NotificationRequest;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;
use Illuminate\Http\JsonResponse;

class SendNotificationRequest extends FormRequest
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
            'massage'     => ['required', 'min:5', 'max:30', 'string', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
            'description' => ['required', 'min:5', 'max:50', 'string', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
        ];
    }
    //regex:/(^[a-zA-Z0-9||@#$%&]+$)+/
    /**
     * Get the error messages that apply to the request parameters.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'massage.required'     => 'Vui lòng nhập tiêu đề vào',
            'massage.min'          => 'Tiêu đề ngắn',
            'massage.max'          => 'Tiêu đề dài',
            'massage.regex'        => 'Tiêu đề không hợp lệ',

            'description.required' => 'Vui lòng nhập mô tả vào',
            'description.min'      => 'Mô tả quá ngắn',
            'description.max'      => 'Mô tả quá dài',
            'description.regex'    => 'Mô tả không hợp lệ',
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
            'massage'     => 'trim|escape|capitalize|strip_tags',
            'description' => 'trim|escape|strip_tags',
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
