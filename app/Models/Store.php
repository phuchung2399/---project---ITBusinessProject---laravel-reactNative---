<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Store extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $guard = "stores";
    protected $table = 'stores';
    protected $primaryKey = 'store_id';
    protected $fillable = ['store_id', 'store_name', 'phone', 'email', 'password', 'address', 'open_time', 'close_time', 'image', 'status', 'location_id', 'auth'];
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

    public function location()
    {
        return $this->hasOne('App\Models\Location', 'location_id', 'location_id');
    }

    public function service()
    {
        return $this->hasMany('App\Models\Service', 'store_id', 'store_id');
    }

    public function comment()
    {
        return $this->hasMany('App\Models\Comment', 'store_id', 'store_id');
    }
}
