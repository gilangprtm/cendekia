<?php

namespace App\Models;

use App\Enums\BookLanguange;
use App\Enums\BookStatus;
use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    protected $fillable = [
        'book_code',
        'title',
        'slug',
        'author',
        'publication_year',
        'isbn',
        'languange',
        'synopsis',
        'number_of_pages',
        'status',
        'cover',
        'price',
        'category_id',
        'publisher_id',
    ];

    protected $casts = [
        'languange' => BookLanguange::class,
        'status' => BookStatus::class,
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function publisher()
    {
        return $this->belongsTo(Publishers::class);
    }

    public function stocks()
    {
        return $this->hasOne(Stocks::class);
    }

    public function loans()
    {
        return $this->hasMany(Loans::class);
    }
}
