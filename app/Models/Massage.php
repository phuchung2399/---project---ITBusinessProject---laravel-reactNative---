<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Massage extends Model
{
    protected $table = 'massages';
    protected $fillable = ['massage_id', 'massage'];
    public $timestamps = true;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;
}
