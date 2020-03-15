<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rank extends Model
{
    protected $table = 'ranks';
    protected $filable = ['rank_id', 'star_rank', 'store_id'];
    public $timestamps = true;

    public function Shops()
    {
        return $this->belongsTo('App\Shop');
    }
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;
}
