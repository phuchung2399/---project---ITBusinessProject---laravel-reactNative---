<?php

namespace App\Repositories;

use App\Models\Notification;

class NotificationRepository
{

    private $notification;

    function __construct(Notification $notification)
    {
        $this->notification = $notification;
    }

    /**
     * selectNotification
     * selectNotification show all notification
     * @return object
     **/
    function selectNotification()
    {
        return $this->notification::all();
    }

    /**
     * selectNotificationById
     * selectNotificationByIdshow find notification by ID
     * @param id
     * @return object
     **/
    function selectNotificationById($id)
    {
        return $this->notification::find($id);
    }

    /**
     * checkNotificationById
     * checkNotificationById check notification have exists by ID
     * @param id
     * @return trueOrfalse
     **/
    function checkNotificationById($id)
    {
        return $this->notification::where('id', $id)->exists();
    }
}
