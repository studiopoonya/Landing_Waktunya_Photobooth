<?php

namespace App\Exports;

use App\Models\Lead;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class LeadsExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    public function collection()
    {
        return Lead::orderBy('created_at', 'desc')->get();
    }

    public function headings(): array
    {
        return ['#', 'Nama', 'Nomor HP', 'Email', 'Tanggal Submit'];
    }

    public function map($lead): array
    {
        return [
            $lead->id,
            $lead->name,
            $lead->phone,
            $lead->email,
            $lead->created_at->setTimezone('Asia/Jakarta')->format('d/m/Y H:i'),
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
