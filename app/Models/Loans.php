<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Loans extends Model
{
    protected $fillable = [
        'loan_code',
        'user_id',
        'book_id',
        'loan_date',
        'due_date',
    ];

    protected $casts = [
        'loan_date' => 'date',
        'due_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Books::class);
    }

    public function returnBook()
    {
        return $this->hasOne(ReturnBooks::class);
    }
}
