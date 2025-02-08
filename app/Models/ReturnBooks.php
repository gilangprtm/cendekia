<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\ReturnBookStatus;

class ReturnBooks extends Model
{
    protected $fillable = [
        'return_book_code',
        'loan_id',
        'user_id',
        'book_id',
        'return_date',
        'status',
    ];

    protected $casts = [
        'return_date' => 'date',
        'status' => ReturnBookStatus::class,
    ];

    public function loan()
    {
        return $this->belongsTo(Loans::class);
    }

    public function fine()
    {
        return $this->hasOne(Fines::class);
    }

    public function book()
    {
        return $this->belongsTo(Books::class);
    }

    public function returnBookCheck()
    {
        return $this->hasOne(ReturnBookChecks::class);
    }
}
