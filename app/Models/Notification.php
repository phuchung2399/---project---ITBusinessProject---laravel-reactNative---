<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{

    use Notifiable;

    protected $table = 'notifications';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'type', 'notifiable_type', 'notifiable', 'data', 'read_at'];
    public $timestamps = true;
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    protected $hidden = [
        'type', 'notifiable_type'
    ];
}
