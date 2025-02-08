<?php

namespace App\Enums;

enum BookLanguange: string
{
    case ENGLISH = 'English';
    case INDONESIA = 'Indonesia';
    case JAPAN = 'Japan';

    public static function option(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values()->toArray();
    }
}
