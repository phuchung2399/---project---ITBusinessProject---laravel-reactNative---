<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotificationRequest\SendNotificationRequest;
use App\Services\NotificationServive;

class NotificationController extends Controller
{
    private $notificationServive;

    function __construct(NotificationServive $notificationServive)
    {
        $this->notificationServive = $notificationServive;
    }

    /**
     * @OA\Post(
     *      path="/api/v1/notification/send-notification-store",
     *      summary="admin send notification store",
     *      tags={"notification"},
     *      operationId="send_notification_store",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="massage",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 ),
     *                 example={"massage": "Null","description": "Null"}
     *             )
     *         )
     *     ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function sendNotificationToStore(SendNotificationRequest $requset)
    {
        return $this->notificationServive->sendNotificationStore($requset);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/notification/send-notification-user",
     *      summary="admin send notification user",
     *      tags={"notification"},
     *      operationId="send_notification_user",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="massage",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 ),
     *                 example={"massage": "Null","description": "Null"}
     *             )
     *         )
     *     ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function sendNotificationToUser(SendNotificationRequest $requset)
    {
        return $this->notificationServive->sendNotificationUser($requset);
    }

    /**
     * @OA\Get(
     *      path="/api/v1/notification/user",
     *      summary="get notifications of user",
     *      tags={"notification"},
     *      operationId="get_notifications_user",
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function selectNotificationToUser()
    {
        return $this->notificationServive->selectNotificationToUser();
    }

    /**
     * @OA\Get(
     *      path="/api/v1/notification/store",
     *      summary="get notifications of store",
     *      tags={"notification"},
     *      operationId="get_notifications_store",
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function selectNotificationToStore()
    {
        return $this->notificationServive->selectNotificationToStore();
    }

    /**
     * @OA\Post(
     *      path="/api/v1/notification/mark-at-read/{id}",
     *      summary="mark at read to notification",
     *      tags={"notification"},
     *      operationId="mark_at_read",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          )
     *      ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function markAsRead($id)
    {
        return $this->notificationServive->markAsRead($id);
    }
}
