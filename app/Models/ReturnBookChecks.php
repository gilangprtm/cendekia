<?php

namespace App\Models;

use App\Enums\ReturnBookConditions;
use Illuminate\Database\Eloquent\Model;

class ReturnBookChecks extends Model
{
    protected $fillable = [
        'return_book_id',
        'condition',
        'notes',
    ];

    protected $casts = [
        'condition' => ReturnBookConditions::class,
    ];

    public function returnBook()
    {
        return $this->belongsTo(ReturnBooks::class);
    }
}
