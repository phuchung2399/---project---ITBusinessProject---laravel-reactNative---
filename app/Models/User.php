<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'user_id';
    protected $filable = ['avatar', 'user_name', 'phone', 'email', 'password', 'auth'];
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

    public function Order()
    {
        return $this->hasMany('App\Orders');
    }

    public function Comment()
    {
        return $this->hasMany('App\Comments');
    }
}
