<?php

namespace App\Models;

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
}
