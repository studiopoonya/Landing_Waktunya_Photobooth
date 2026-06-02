<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AdminTokenMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $adminId = Cache::get('admin_token:' . $token);

        if (!$adminId) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $admin = Admin::find($adminId);
        if (!$admin) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $request->merge(['_admin' => $admin]);
        return $next($request);
    }
}
