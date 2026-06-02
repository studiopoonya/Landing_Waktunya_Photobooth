<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        return response()->json(Admin::orderBy('created_at')->get(['id', 'name', 'email', 'created_at']));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:100',
            'email'    => 'required|email|unique:admins,email',
            'password' => 'required|string|min:6',
        ]);

        $admin = Admin::create($request->only('name', 'email', 'password'));

        return response()->json(['message' => 'Admin berhasil ditambahkan.', 'admin' => $admin->only('id', 'name', 'email', 'created_at')], 201);
    }

    public function destroy(Request $request, int $id)
    {
        $current = $request->_admin;

        if ($current->id === $id) {
            return response()->json(['message' => 'Tidak bisa menghapus akun sendiri.'], 422);
        }

        $admin = Admin::findOrFail($id);
        $admin->delete();

        return response()->json(['message' => 'Admin berhasil dihapus.']);
    }

    public function updatePassword(Request $request, int $id)
    {
        $request->validate([
            'password' => 'required|string|min:6',
        ]);

        $current = $request->_admin;

        if ($current->id !== $id) {
            return response()->json(['message' => 'Tidak diizinkan.'], 403);
        }

        $current->password = $request->password;
        $current->save();

        return response()->json(['message' => 'Password berhasil diubah.']);
    }
}
