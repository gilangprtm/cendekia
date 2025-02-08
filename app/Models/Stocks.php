<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stocks extends Model
{
    protected $fillable = [
        'book_id',
        'total',
        'available',
        'loan',
        'lost',
        'damaged'
    ];

    public function book()
    {
        return $this->belongsTo(Books::class);
    }
}
