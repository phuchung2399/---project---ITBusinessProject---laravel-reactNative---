<?php

namespace App\Http\Requests\CommentRequset;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;

class CommentInsertRequest extends FormRequest
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
            'title'    => ['required', 'string', 'min:1', 'max:30', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
            'star'     => ['required', 'numeric',  'min:1', 'max:5', 'regex:/([1-5||^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]{1}\b)+/'],
            'store_id' => 'required',
            'user_id'  => 'required'
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
            'title.required'     => 'Vui lòng nhập bình luận',
            'title.string'      => 'Bình luận không hợp lệ',
            'title.min'         => 'Bình luận của bạn quá ngắn',
            'title.max'         => 'Bình luận của bạn quá dài',
            'title.regex'       => 'Vui lòng không nhập kí tự đặc biệt',
            'star.required'     => 'Vui lòng nhập số sao',
            'star.numeric'      => 'Số sao không hợp lệ',
            'star.min'          => 'Số sao không hợp lệ',
            'star.max'          => 'Số sao không hợp lệ',
            'star.regex'        => 'Số sao không hợp lệ',
            'store_id.required' => 'Bình luận không thành công',
            'user_id.required'  => 'Bình luận không thành công',

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
            'title'  => 'trim',
            'star'     => 'trim',
            'store_id'  => 'trim',
            'user_id' => 'trim'
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
