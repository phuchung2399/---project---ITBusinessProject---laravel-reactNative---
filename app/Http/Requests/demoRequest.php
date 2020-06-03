<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class demoRequest extends FormRequest
{
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
            'title'  => ['required', 'min:3', 'max:50', 'string', 'regex:/([^!@#$%^&*()_+\-=\[\]{};:"\\|<>\?]+$)+/'],
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
            'title.required' => 'Vui lòng nhập tiêu đề',
            'title.min' => 'Tiêu đề quá ngắn',
            'title.max' => 'Tiêu đề quá dài',
            'title.string' => 'Tiêu đề không hợp lệ',
            'title.regex' => 'Vui lòng không nhập ký tự đặc biệt',
        ];
    }
}
