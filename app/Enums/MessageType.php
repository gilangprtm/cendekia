<?php

namespace App\Enums;

use GuzzleHttp\Psr7\Message;

enum MessageType: string
{
    case CREATED = 'Berhasil Menambahkan';
    case UPDATE = 'Berhasil Memperbarui';
    case DELETED = 'Berhasil Menghapus';
    case ERROR = 'Terjadi Kesalahan, Silahkan Coba Lagi';

    public function message(string $entity = '', ?string $error = null): string
    {
        if ($this == MessageType::ERROR && $error) {
            return "{$this->value}, {$error}";
        }

        return "{$this->value} {$entity}";
    }
}
