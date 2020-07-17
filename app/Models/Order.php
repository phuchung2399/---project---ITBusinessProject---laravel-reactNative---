<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    protected $primaryKey = 'order_id';
    protected $fillable = ['order_id', 'address', 'total', 'order_time', 'order_day', 'note', 'store_id', 'user_id', 'order_services_id', 'massage_id'];
    public $timestamps = true;
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    public function Order_Services()
    {
        return $this->hasMany('App\Models\OrderService', 'order_id', 'order_id');
    }

    public function store()
    {
        return $this->belongsTo('App\Models\Store', 'store_id', 'store_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'user_id');
    }

    public function massage()
    {
        return $this->belongsTo('App\Models\Massage', 'massage_id', 'massage_id');
    }
}
