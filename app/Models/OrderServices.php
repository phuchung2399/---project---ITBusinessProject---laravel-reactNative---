<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'order_service';
    protected $filable = ['order_service_id', 'service_id'];
    public $timestamps = true;
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    public function Service()
    {
        return $this->hasMany('App\Service');
    }
}
