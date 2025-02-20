<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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

    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->whereAny([
                    'book_code',
                    'title',
                    'slug',
                    'author',
                    'publication_year',
                    'isbn',
                    'languange',
                    'status'
                ], 'REGEXP', $search);
            });
        });
    }

    public function scopeSorting(Builder $query, array $sorts)
    {
        $query->when($sorts['field'] ?? null &&  $sorts['direction'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction'] ?? 'asc');
        });
    }
}
