<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Http\Requests\StoreLeadRequest;
use Illuminate\Http\JsonResponse;

class LeadController extends Controller
{
    /**
     * Store a new lead from the landing page form.
     */
    public function store(StoreLeadRequest $request): JsonResponse
    {
        // Normalise phone: store always as +62XXXXXXXXXX
        $phone = $request->phone;
        if (str_starts_with($phone, '0')) {
            $phone = '+62' . substr($phone, 1);
        } elseif (str_starts_with($phone, '62')) {
            $phone = '+' . $phone;
        }

        $lead = Lead::create([
            'name'  => $request->name,
            'phone' => $phone,
            'email' => $request->email,
        ]);

        return response()->json([
            'message' => 'Data berhasil disimpan. Tim kami akan menghubungi Anda segera.',
            'data'    => $lead,
        ], 201);
    }
}
