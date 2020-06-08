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
    protected $fillable = ['avatar', 'user_name', 'phone', 'email', 'password', 'auth'];
    public $timestamps = true;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    protected $hidden = [
        'password', 'remember_token','auth'
    ];

    public function order()
    {
        return $this->hasMany('App\Models\Orders');
    }

    public function comment()
    {
        return $this->hasMany('App\Models\Comment', 'user_id', 'user_id');
    }
}
