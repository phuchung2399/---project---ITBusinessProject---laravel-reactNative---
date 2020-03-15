<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Store extends Model
{
    use HasApiTokens, Notifiable;

    protected $table = 'stores';
    protected $primaryKey = 'store_id';
    protected $filable = ['store_id', 'store_name', 'phone', 'email', 'password', 'address', 'open_time', 'open_close', 'image', 'status', 'location_id', 'auth'];
    public $timestamps = true;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function Locations()
    {
        return $this->belongsto('App\Location');
    }

    public function Order()
    {
        return $this->hasMany('App\Order');
    }

    public function Service()
    {
        return $this->hasMany('App\Service');
    }
}
