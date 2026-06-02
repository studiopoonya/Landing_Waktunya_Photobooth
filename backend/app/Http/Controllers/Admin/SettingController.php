<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    private array $defaults = [
        'packages' => [
            [
                'id'        => 'no-print',
                'emoji'     => '📱',
                'label'     => 'Tanpa Print',
                'sublabel'  => '2 Jam · Digital Only',
                'price'     => '1.000.000',
                'desc'      => 'Cocok untuk event casual tanpa cetak foto.',
                'highlight' => false,
            ],
            [
                'id'        => '2jam',
                'emoji'     => '⭐',
                'label'     => 'Paket 2 Jam',
                'sublabel'  => '2 Jam · Cetak 2R atau 4R',
                'price'     => '1.499.000',
                'desc'      => 'Pilihan paling populer untuk semua jenis acara.',
                'highlight' => true,
            ],
            [
                'id'        => '3jam',
                'emoji'     => '🎉',
                'label'     => 'Paket 3 Jam',
                'sublabel'  => '3 Jam · Cetak 2R atau 4R',
                'price'     => '1.849.000',
                'desc'      => 'Ideal untuk pernikahan dan event besar.',
                'highlight' => false,
            ],
        ],
        'promo' => [
            'tagline'         => 'Jangan Lewatkan',
            'title'           => "Siap Membuat Acara Anda Tak Terlupakan?",
            'description'     => 'Hubungi kami sekarang. Promo terbatas untuk 20 pemesan pertama bulan ini!',
            'discount_label'  => 'Hemat 40%',
            'discount_amount' => '15K',
            'button_text'     => 'Claim Promo Sekarang',
            'active'          => true,
        ],
    ];

    public function show(string $key)
    {
        if (!array_key_exists($key, $this->defaults)) {
            return response()->json(['message' => 'Setting not found'], 404);
        }

        $value = Setting::get($key, $this->defaults[$key]);
        return response()->json(['key' => $key, 'value' => $value]);
    }

    public function update(Request $request, string $key)
    {
        if (!array_key_exists($key, $this->defaults)) {
            return response()->json(['message' => 'Setting not found'], 404);
        }

        $value = $request->input('value');
        Setting::set($key, $value);

        return response()->json(['key' => $key, 'value' => $value, 'message' => 'Saved']);
    }
}
