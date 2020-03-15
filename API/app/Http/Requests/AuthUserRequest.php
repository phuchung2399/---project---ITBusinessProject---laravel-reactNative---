<?php

namespace App\Http\Requests;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use Waavi\Sanitizer\Laravel\SanitizesInput;


class AuthUserRequest extends FormRequest
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
            'avatar' => 'mimes:jpeg,jpg,png|required|max:5000',
            'user_name' => 'required|min:6|max:25|string|regex:/(^[A-Za-z0-9 ]+$)+/',
            'email' => 'required|string|email|unique:users',
            'phone' => 'required|min:10|numeric|unique:users',
            'password' => 'required|min:8|string|regex:/(^[A-Za-z0-9 ]+$)+/',
            'c_password' => 'required|same:password',
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
            'avatar.required'       => 'Please enter again your avatar!',
            'name_user.required' => 'Please enter again your name',
            'email.required'        => 'Please enter again your email',
            'phone.required'    => 'Please enter again your phone',
            'password.required'    => 'Please enter again your password',
            'c_password.required'  => 'Password does not match !'
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
            'user_name' => 'trim|escape|capitalize',
            'email' =>  'trim|escape|lowercase',
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
