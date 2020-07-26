<?php

namespace App\Services;

use App\Notifications\adminSendNotification;
use Illuminate\Support\Facades\Notification;
use App\Repositories\NotificationRepository;
use App\Events\NotifyFromAdminToStore;
use App\Events\NotifyFromAdminToUser;
use App\Repositories\StoreRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\UserRepository;
use App\Helper\Constants\HttpStatus;
use App\Helper\Response;

class NotificationServive
{

    private $notificationRepository, $storeRepository, $userRepository;

    function __construct(NotificationRepository $notificationRepository, StoreRepository $storeRepository, UserRepository $userRepository)
    {
        $this->notificationRepository = $notificationRepository;
        $this->storeRepository = $storeRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * selectNotificationToUser
     * selectNotificationToUser show all notification of user
     * @param id
     * @return object
     **/
    function selectNotificationToUser()
    {
        try {
            $notifications  = Auth::user()->notifications;
            return Response::responseSuccess($this->hanldDataToSeleteNofitication('user_id', $notifications, 'api'));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectNotificationToStore
     * selectNotificationToStore show all notification of store
     * @param id
     * @return object
     **/
    function selectNotificationToStore()
    {
        try {
            $notifications = (Auth::guard('stores')->user())->notifications;
            return Response::responseSuccess($this->hanldDataToSeleteNofitication('store_id', $notifications, 'stores'));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * sendNotificationStore
     * sendNotificationStore admin send notification for store 
     * @param request
     * @return json
     **/
    function sendNotificationStore($request)
    {
        try {
            Notification::send($this->storeRepository->selectStore(), new AdminSendNotification($request, 'store'));
            broadcast(new NotifyFromAdminToStore($this->hanldDataToNotification($request)));
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, 'Gửi thành công');
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * sendNotificationUser
     * sendNotificationUser admin send notification for user 
     * @param request
     * @return json
     **/
    function sendNotificationUser($request)
    {
        try {
            Notification::send($this->userRepository->selectUser(), new AdminSendNotification($request, 'user'));
            event(new NotifyFromAdminToUser($this->hanldDataToNotification($request)));
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, 'Gửi thành công');
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * markAsRead
     * markAsRead handle markAsRead from notification user and store
     * @param id
     * @return json
     **/
    function markAsRead($id)
    {
        try {
            if ($this->notificationRepository->checkNotificationById($id)) {
                $notification = $this->notificationRepository->selectNotificationById($id);
                $notification->update(['read_at' => now()]);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Thành công');
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Lỗi');
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * hanldDataToSeleteNofitication
     * hanldDataToSeleteNofitication is middlemen function to a lot of duplicate for Data Response
     * @param objectId *id from client
     * @param notifications *data from $this->notificationRepository->selectNotification()
     * @return object
     **/
    function hanldDataToSeleteNofitication($objectId, $notifications, $auth)
    {
        try {
            if (count($notifications) > 0) {
                $notifica_arr = [];
                $ouput_arr['unread_notification'] = Auth::guard($auth)->user()->unreadNotifications->count();
                foreach ($notifications as $value) {
                    $notification["notification_id"] = $value->id;
                    $notification[$objectId] = $value->notifiable_id;
                    $notification["content"] = $value->data;
                    $notification["read"] =  $value->read_at;
                    array_push($notifica_arr, $notification);
                }
                $ouput_arr['notifications'] = $notifica_arr; // add data of notification into array ouput_arr
                return $ouput_arr;
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * hanldDataToNotification
     * hanldDataToNotification *is middlemen function to a lot of duplicate for Data Response
     * @param request
     * @return array
     **/
    function hanldDataToNotification($request)
    {
        $data = [
            'massage' => $request->massage,
            'description' => $request->description
        ];
        return $data;
    }
}
