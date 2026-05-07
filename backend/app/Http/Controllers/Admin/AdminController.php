<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\LeadsExport;

class AdminController extends Controller
{
    public function showLogin()
    {
        if (session('admin_logged_in')) {
            return redirect()->route('admin.dashboard');
        }
        return view('admin.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $adminEmail    = config('admin.email');
        $adminPassword = config('admin.password');

        if ($request->email === $adminEmail && $request->password === $adminPassword) {
            session(['admin_logged_in' => true, 'admin_email' => $request->email]);
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['email' => 'Email atau password salah.'])->withInput();
    }

    public function logout()
    {
        session()->forget(['admin_logged_in', 'admin_email']);
        return redirect()->route('admin.login');
    }

    public function dashboard(Request $request)
    {
        $query = Lead::query()->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('from')) {
            $query->whereDate('created_at', '>=', $request->from);
        }

        if ($request->filled('until')) {
            $query->whereDate('created_at', '<=', $request->until);
        }

        $leads = $query->paginate(15)->withQueryString();
        $total = Lead::count();

        return view('admin.dashboard', compact('leads', 'total'));
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();
        return back()->with('success', 'Data lead berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate(['ids' => 'required|array', 'ids.*' => 'integer']);
        Lead::whereIn('id', $request->ids)->delete();
        return back()->with('success', count($request->ids) . ' data lead berhasil dihapus.');
    }

    public function export()
    {
        return Excel::download(new LeadsExport, 'leads-' . date('Y-m-d') . '.xlsx');
    }
}
