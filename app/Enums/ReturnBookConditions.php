<?php

namespace App\Enums;

enum ReturnBookConditions: string
{
    case GOOD = 'Sesuai';
    case DAMAGED = 'Rusak';
    case LOST = 'Hilang';

    public static function option(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values()->toArray();
    }
}
