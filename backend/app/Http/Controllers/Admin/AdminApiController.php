<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class AdminApiController extends Controller
{
    public function login(Request $request)
    {
        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !$admin->checkPassword($request->password)) {
            return response()->json(['message' => 'Email atau password salah.'], 401);
        }

        $token = Str::random(64);
        Cache::put('admin_token:' . $token, $admin->id, now()->addHours(8));

        return response()->json(['token' => $token, 'admin' => ['id' => $admin->id, 'name' => $admin->name, 'email' => $admin->email]]);
    }

    public function logout(Request $request)
    {
        if ($token = $request->bearerToken()) {
            Cache::forget('admin_token:' . $token);
        }
        return response()->json(['message' => 'Logged out.']);
    }

    public function stats()
    {
        return response()->json([
            'total' => Lead::count(),
            'today' => Lead::whereDate('created_at', today())->count(),
            'week'  => Lead::where('created_at', '>=', now()->startOfWeek())->count(),
        ]);
    }

    public function leads(Request $request)
    {
        $query = Lead::query();

        if ($s = $request->search) {
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('phone', 'like', "%{$s}%");
            });
        }

        if ($from = $request->from) {
            $query->whereDate('created_at', '>=', $from);
        }
        if ($to = $request->to) {
            $query->whereDate('created_at', '<=', $to);
        }

        return response()->json($query->latest()->paginate(15));
    }

    public function destroy($id)
    {
        Lead::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted.']);
    }

    public function bulkDestroy(Request $request)
    {
        Lead::whereIn('id', $request->ids ?? [])->delete();
        return response()->json(['message' => 'Deleted.']);
    }

    public function export()
    {
        $leads = Lead::latest()->get(['id', 'name', 'phone', 'email', 'created_at']);
        return response()->json($leads);
    }
}
