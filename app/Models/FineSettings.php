<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FineSettings extends Model
{
    protected $fillable = [
        'late_fee_per_day',
        'damaged_fee_percentage',
        'lost_fee_percentage',
    ];
}
