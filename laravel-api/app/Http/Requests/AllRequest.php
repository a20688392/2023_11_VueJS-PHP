<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class AllRequest extends FormRequest
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
        return [];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [];
    }

    /**
     * 自定義錯誤
     * code 為 error_code
     * message 為 自定義錯誤訊息
     *
     * @return array
     */
    protected function getCustomError()
    {
        return  [
            "code" => 10000,
            "message" => "驗證失敗"
        ];
    }

    /**
     * Handle a failed validation attempt.
     * 重寫 function，只回傳 Json 格式
     * 根據 .env 的 APP_DEBUG 回傳 details 詳細錯誤
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $httpStatus = Response::HTTP_BAD_REQUEST;

        $error = $this->getCustomError();
        $response = [
            "error_code" => $error["code"],
            "message" => $error["message"],
        ];

        $appDebug = config('app.debug', false);

        if ($appDebug) {
            $response["detail"] = $validator->errors();
        }

        $response = response()->json($response, $httpStatus);

        throw new HttpResponseException($response);
    }
}
