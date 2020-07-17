<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\NotificationRequest\SendNotificationRequest;
use App\Services\NotificationServive;

class NotificationController extends Controller
{
    private $notificationServive;

    function __construct(NotificationServive $notificationServive)
    {
        $this->notificationServive = $notificationServive;
    }

    function sendNotificationToStore(SendNotificationRequest $requset)
    {
        return $this->notificationServive->sendNotificationStore($requset);
    }

    function sendNotificationToUser(SendNotificationRequest $requset)
    {
        return $this->notificationServive->sendNotificationUser($requset);
    }

    function selectNotificationToUser()
    {
        return $this->notificationServive->selectNotificationToUser();
    }

    function selectNotificationToStore()
    {
        return $this->notificationServive->selectNotificationToStore();
    }

    function markAsRead($id)
    {
        return $this->notificationServive->markAsRead($id);
    }
}
