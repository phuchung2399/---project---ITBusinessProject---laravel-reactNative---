<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = 'services';
    protected $primaryKey = 'service_id';
    protected $fillable = ['service_id', 'service_name', 'description', 'reduced_price', 'price', 'image', 'store_id'];
    public $timestamps = true;
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    function store()
    {
        return $this->belongsTo('App\Models\Store', 'store_id', 'store_id');
    }

    public function order_service()
    {
        return $this->hasMany('App\Models\OrderServices', 'user_id', 'user_id');
    }
}
