<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderService extends Model
{
    protected $table = 'order_services';
    protected $primaryKey = 'order_services_id';
    protected $fillable = ['order_services_id', 'service_id', 'order_id'];
    public $timestamps = true;
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    public function Service()
    {
        return $this->belongsTo('App\Models\Service', 'service_id', 'service_id');
    }

    public function Order()
    {
        return $this->belongsTo('App\Models\Order', 'order_id', 'order_id');
    }
}
