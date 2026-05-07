<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'min:2', 'max:100'],
            'phone' => [
                'required',
                'string',
                // Accept +62XXXXXXXXXX or 08XXXXXXXXXX (8–13 digits after prefix)
                'regex:/^(\+62|62|0)[0-9]{8,13}$/',
                'max:20',
            ],
            'email' => ['required', 'email:rfc,dns', 'max:150'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'  => 'Nama wajib diisi.',
            'name.min'       => 'Nama minimal 2 karakter.',
            'phone.required' => 'Nomor HP wajib diisi.',
            'phone.regex'    => 'Format nomor HP tidak valid. Gunakan format Indonesia (+62xxx atau 08xxx).',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email'    => 'Format email tidak valid.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }
}
