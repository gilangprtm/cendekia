<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Publishers extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'address',
        'phone',
        'email',
        'logo',
    ];

    public function books()
    {
        return $this->hasMany(Books::class);
    }

    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->orWhere('name', 'REGEXP', $search)
                    ->orWhere('slug', 'REGEXP', $search)
                    ->orWhere('email', 'REGEXP', $search)
                    ->orWhere('address', 'REGEXP', $search)
                    ->orWhere('phone', 'REGEXP', $search);
            });
        });

        $query->when($filters['name'] ?? null, function ($query, $name) {
            $query->where(function ($query) use ($name) {
                $query->orWhere('name', 'REGEXP', $name);
            });
        });

        $query->when($filters['slug'] ?? null, function ($query, $slug) {
            $query->where(function ($query) use ($slug) {
                $query->orWhere('slug', 'REGEXP', $slug);
            });
        });

        $query->when($filters['created_at'] ?? null, function ($query, $created_at) {
            $query->whereDate('created_at', $created_at);
        });
    }

    public function scopeSorting(Builder $query, array $sorts)
    {
        $query->when($sorts['field'] ?? null &&  $sorts['direction'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction'] ?? 'asc');
        });
    }
}
