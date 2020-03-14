<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    protected $filable = ['orders_id', 'address', 'total', 'note', 'store_id', 'user_id', 'service_id'];
    public $timestamps = true;

    public function Massage()
    {
        return $this->hasMany('App\Massage');
    }

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;
}
