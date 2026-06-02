<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        if (Admin::where('email', config('admin.email'))->exists()) {
            return;
        }

        Admin::create([
            'name'     => 'Super Admin',
            'email'    => config('admin.email'),
            'password' => config('admin.password'),
        ]);
    }
}
