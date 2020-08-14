<?php

namespace App\Services;

use App\Notifications\StatusOrderNotification;
use App\Notifications\UserOrderNotification;
use App\Events\NotifyStoreToUserOrder;
use App\Repositories\OrderRepository;
use App\Services\OrderServiceService;
use App\Repositories\StoreRepository;
use Illuminate\Support\Facades\Auth;
use App\Helper\Constants\HttpStatus;
use App\Repositories\UserRepository;
use App\Events\NotifyStatusToOrder;
use App\Services\CoordinateService;
use App\Services\ServiceService;
use Illuminate\Support\Carbon;
use App\Services\StoreSevice;
use App\Helper\Validation; // container check validate
use App\Helper\Response; // container Response
use Ramsey\Uuid\Uuid;
use App\Models\Order;

use App\Services\VoucherService;

class OrderService
{
    private $orderServiceService;
    private $coordinateService;
    private $orderRepository;
    private $storeRepository;
    private $serviceService;
    private $userRepository;
    private $voucherService;
    private $storeSevice;
    private $order;

    function __construct(
        OrderServiceService $orderServiceService,
        CoordinateService $coordinateService,
        StoreRepository $storeRepository,
        OrderRepository $orderRepository,
        UserRepository $userRepository,
        ServiceService $serviceService,
        VoucherService $voucherService,
        StoreSevice $storeSevice,
        Order $order
    ) {
        $this->orderServiceService = $orderServiceService;
        $this->coordinateService = $coordinateService;
        $this->orderRepository = $orderRepository;
        $this->storeRepository = $storeRepository;
        $this->serviceService = $serviceService;
        $this->userRepository = $userRepository;
        $this->voucherService = $voucherService;
        $this->storeSevice = $storeSevice;
        $this->order = $order;
    }

    /**
     * insertOrder
     * insertOrder *handle data from client of order and save data in database
     * @param request
     * @var date_now 
     * @var date_add_to_week
     * @var time_now
     * @return json
     */
    function insertOrder($request)
    {
        $date_now = (Carbon::now('Asia/Ho_Chi_Minh'))->toDateString(); // get date at now 
        $date_add_to_week = (Carbon::now('Asia/Ho_Chi_Minh')->addWeek())->toDateString(); // get day now + 7 day
        $time_now = Carbon::now('Asia/Ho_Chi_Minh')->toTimeString(); // get time now
        $time_limit = Carbon::now('Asia/Ho_Chi_Minh')->addMinutes(30)->toTimeString(); // get time now
        try {
            if ($request->order_day == $date_now &&  $request->order_time < $time_now) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Thời gian đặt không nhỏ hơn hơn hiện tại');
            }
            if ($request->order_day < $date_now) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Ngày đặt không nhỏ hơn hơn hiện tại');
            }
            if ($request->order_day > $date_add_to_week) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Thời gian đặt không được quá một tuần');
            }
            if (count($request->service) > 3) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Bạn chỉ được đặt 3 dịch vụ cho một lần');
            }
            if ($this->hanldeTimeOrderFollowTimeStore($request->store, $request->order_time == false)) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Thời gian đặt không phù hợp với thời mở và đóng cửa của cửa hàng');
            }
            if ($request->order_day == $date_now && $request->order_time < $time_limit) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Thời gian đặt phải trước 30 phút');
            } else {
                if ($this->coordinateService->checkRealCoordinate($request->address)) {
                    $order =  $this->order;
                    $order->order_id = Uuid::uuid4();
                    $order->address =  $this->storeSevice->hanldeAddress(
                        $request->address,
                        ($this->storeRepository->selectStoreById($request->store))->location()->first()['location_id']
                    );
                    $order->order_day = $request->order_day;
                    $order->order_time = $request->order_time;
                    $order->total = $this->hanldeTotalApplyVouvher($request->voucher_name, $request->service);
                    $order->voucher_name = $request->voucher_name;
                    $order->note = Validation::handleSpace($request->note);
                    $order->massage_id = 29; // 'massage' => 'Đơn đang chờ xác nhận'
                    $order->store_id = ($request->store); // $request->store_id;
                    $order->user_id = (Auth::user())->user_id; // get id in token
                    $this->orderRepository->insertOrder($order); // save info order
                    $this->orderServiceService->insertOrderServiceUser($request->service, $order->order_id); // save data service of order
                    $this->orderNotificationToStore((Auth::user())->user_name, 'store', $order->store_id); // save notificaton to database
                    $this->notifyStoreToUserOrder($order->store_id, $order->order_id, (Auth::user())->user_name); // notificaton order for store
                    return  Response::responseMessage(HttpStatus::SUCCESS_CREATED, 'Đặt thành công');
                } else {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Vị trí không tồn tại trên các hệ thông bản đồ');
                }
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * hanldeTotalApplyVouvher
     * hanldeTotalApplyVouvher *handle total when apply voucher
     * @param voucher_name
     * @param services
     * @return number
     **/
    function hanldeTotalApplyVouvher($voucher_name, $services)
    {
        try {
            $price_voucher =  $this->voucherService->selectPriceByName($voucher_name);
            $total_service = $this->hanldeTotal($services);
            return $total_service  -  $price_voucher;
        } catch (\Exception $exception) {
            return $total_service;
        }
    }

    /**
     * insertOrder
     * insertOrder *handle data from client of order and save data in database
     * @param request
     * @var date_now 
     * @var date_add_to_week
     * @var time_now
     * @return json
     */
    function selectOrder($request)
    {
        $date_now = (Carbon::now('Asia/Ho_Chi_Minh'))->toDateString(); // get date at now 
        $date_add_to_week = (Carbon::now('Asia/Ho_Chi_Minh')->addWeek())->toDateString(); // get day now + 7 day
        $time_now = Carbon::now('Asia/Ho_Chi_Minh')->toTimeString(); // get time now
        $time_limit = Carbon::now('Asia/Ho_Chi_Minh')->addMinutes(30)->toTimeString(); // get time now
        try {
            if ($request->order_day == $date_now &&  $request->order_time < $time_now) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Thời gian đặt không nhỏ hơn hơn hiện tại');
            }
            if ($request->order_day < $date_now) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Ngày đặt không nhỏ hơn hơn hiện tại');
            }
            if ($request->order_day > $date_add_to_week) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Thời gian đặt không được quá một tuần');
            }
            if (count($request->service) > 3) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Bạn chỉ được đặt 3 dịch vụ cho một lần');
            }
            if ($this->hanldeTimeOrderFollowTimeStore($request->store_id, $request->order_time == false)) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Thời gian đặt không phù hợp với thời mở và đóng cửa của cửa hàng');
            }
            if ($request->order_day == $date_now && $request->order_time < $time_limit) {
                return  Response::responseMessage(HttpStatus::BAD_REQUEST, 'Thời gian đặt phải trước 30 phút');
            } else {
                $order['order_day'] = $request->order_day;
                $order['order_time'] = $request->order_time;
                $order['total'] = $this->hanldeTotal($this->hanldeSelectService($request->service));
                $order['store'] = $this->storeSevice->hanldeDataResponse($this->storeRepository->selectStoreById($request->store_id));
                $order['user'] = (Auth::user()); // get id in toke
                $order['services'] = $this->hanldeSelectService($request->service); // get id in toke
                return  Response::responseSuccess($order);
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * hanldeSelectService
     * hanldeSelectService *select service
     * @param services
     * @return array
     **/
    function hanldeSelectService($services)
    {
        $orderService = []; // save data service
        foreach ($services as $id) {
            array_push($orderService, $this->serviceService->selectServiceById($id)); // push object into data
        }
        return $orderService;
    }

    /**
     * hanldeSelectService
     * hanldeSelectService *select service
     * @param services
     * @return number
     **/
    function hanldeTotal($services)
    {
        $total = 0; // save
        $order_services = [];
        foreach ($services as $service) {
            array_push($order_services, $this->serviceService->hanldeServiceToTotal($service['service_id']));
        }
        foreach ($order_services as $order_service) {
            $total += $order_service['price'];
        }
        return $total;
    }

    /**
     * hanldeTimeOrderFollowTimeStore
     * hanldeTimeOrderFollowTimeStore *check time request from client with store time
     * @param store_id
     * @param order_time
     * @return Boolean
     **/
    function hanldeTimeOrderFollowTimeStore($store_id, $order_time)
    {
        $store = $this->storeRepository->selectStoreById($store_id);
        if ($order_time < $store->open_time || $order_time > $store->close_time) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * selectOrderById
     * selectOrderById *handle data and select data of order
     * @param id
     * @var service_id
     * @var orderService
     * @var order
     * @return json
     */
    function selectDetailOrderById($id)
    {
        try {
            if ($this->orderRepository->checkOrderById($id)) {
                $order = $this->orderRepository->selectOrderById($id);
                $service_id = []; // save id services
                foreach ($order->Order_Services()->get() as $orderService) {
                    array_push($service_id, $orderService["service_id"]); // push object into data
                }
                $data =  $this->hanldeDataDetailResponse($order); // select data
                $data["services"] =  $this->hanldeSelectService($service_id); // save data service have been hanlded into data
                return Response::responseSuccess($data);
            } else {
                return Response::responseMessage(HttpStatus::NOT_FOUND, "Không tìm thấy đơn hàng");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * hanldeDataResponseOrder
     * hanldeDataResponseOrder is middlemen function to a lot of duplicate for Data Response and response necessary
     * @param order
     * @return array
     **/
    function hanldeDataDetailResponse($order)
    {
        $data['order_id'] = $order->order_id;
        $data['address'] = $order->address;
        $data['order_time'] = $order->order_time;
        $data['order_day'] = $order->order_day;
        $data['voucher_name'] = $order->voucher_name;
        $data['total'] = $order->total;
        $data['store'] = $this->storeSevice->hanldeDataResponse(($order->store()->first()));
        $data['user'] =  $order->user()->get();
        $data['status'] =  $order->massage()->get();
        return $data;
    }

    /**
     * selectOrderShop
     * selectOrderShop *select order of shop
     **/
    function selectOrderShop()
    {
        try {
            return Response::responseSuccess($this->hanldeDataResponse((Auth::guard('stores')->user())->order()->orderByDesc('created_at')->get()));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectOrderOfUser
     * selectOrderOfUser *select order of user
     **/
    function selectOrderOfUser()
    {
        try {
            return Response::responseSuccess($this->hanldeDataResponse((Auth::user())->order()->orderByDesc('created_at')->get()));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * confirmOrderFromStore
     * confirmOrderFromStore *confirm order for user
     * @param id
     **/
    function confirmOrderFromStore($id)
    {
        try {
            if ($this->orderRepository->checkOrderById($id)) {
                $order = $this->orderRepository->selectOrderById($id);
                if ($order->massage_id == 29) {
                    $order->massage_id = 16;
                    $this->orderRepository->updateOrder($order); // save info order
                    $this->statusOrderNotification($this->userRepository->selectUserById($order->user_id), 'user', 'Đơn có mã ' . $order->order_id . ' đã được xác nhận');
                    $this->notifyOrderNotification($order->user_id, $order->order_id, 'Đơn có mã' . $order->order_id . 'đã được xác nhận');
                    return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Đã xác nhận thành công');
                } else {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Bạn không thể xác nhận đơn');
                }
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * confirmOrderFromStore
     * confirmOrderFromStore *confirm order for user
     * @param id
     **/
    function refuseOrderFromStore($id)
    {
        try {
            if ($this->orderRepository->checkOrderById($id)) {
                $order = $this->orderRepository->selectOrderById($id);
                if ($order->massage_id == 29) {
                    $order->massage_id = 22;
                    $this->orderRepository->updateOrder($order); // save info order
                    $this->statusOrderNotification($this->userRepository->selectUserById($order->user_id), 'user', 'Đơn có mã ' . $order->order_id . ' đã được của hàng từ chối');
                    $this->notifyOrderNotification($order->user_id, $order->order_id, 'Đơn có mã' . $order->order_id . 'đã được của hàng từ chối');
                    return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Đã từ chối thành công');
                } else {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Bạn không thể từ chối đơn khi đã xác nhận');
                }
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * confirmFinishOrderFromStore
     * confirmFinishOrderFromStore *confirm order for user
     * @param id
     **/
    function confirmFinishOrderFromStore($id)
    {
        try {
            if ($this->orderRepository->checkOrderById($id)) {
                $order = $this->orderRepository->selectOrderById($id);
                if ($order->massage_id == 16) {
                    $order->massage_id = 17;
                    $this->orderRepository->updateOrder($order); // save info order
                    $this->statusOrderNotification($this->userRepository->selectUserById($order->user_id), 'user', 'Đơn có mã ' . $order->order_id . ' đã được hoàn thành');
                    $this->notifyOrderNotification($order->user_id, $order->order_id, 'Đơn có mã' . $order->order_id . 'đã được hoàn thành');
                    return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Cập nhật hoàn thành thành công');
                } else {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Đơn hàng chưa xác nhận hoặc đã bị hủy trước đó');
                }
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * confirmOrderFromStore
     * confirmOrderFromStore *confirm order for user
     * @param id
     **/
    function cancelOrderFromUser($id)
    {
        try {
            if ($this->orderRepository->checkOrderById($id)) {
                $order = $this->orderRepository->selectOrderById($id);
                if ($order->massage_id == 29) {
                    $order->massage_id = 10;
                    $this->orderRepository->updateOrder($order); // save info order
                    $this->statusOrderNotification($this->storeRepository->selectStoreById($order->store_id), 'store', 'Đơn có mã ' . $order->order_id . ' đã được khác hàng hủy');
                    $this->notifyOrderNotification($order->store_id, $order->order_id, 'Đơn có mã' . $order->order_id . 'đã được khác hàng hủy');
                    return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, 'Đã hủy thành công');
                } else {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST, 'Không thể hủy đơn khi đã được xác nhận');
                }
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * notifyUsersToOrder
     * notifyUsersToOrder *send event for store
     * @param store_id
     * @return array
     **/
    function notifyStoreToUserOrder($store_id, $order_id, $user_name)
    {
        $data =  [
            "id" => $store_id,
            "order" => $this->orderRepository->selectOrderById($order_id),
            "massage" => "Khách hàng tên " . $user_name . " vừa đặt dịch vụ của của cửa hàng"
        ];
        return broadcast(new NotifyStoreToUserOrder($data));
    }

    /**
     * orderNotificationToStore
     * orderNotificationToStore *save data in database
     * @param store_id
     * @return array
     **/
    function orderNotificationToStore($user_name, $auth, $store_id)
    {
        $store = $this->storeRepository->selectStoreById($store_id);
        $data =  [
            "massage" => "Khách hàng tên " . $user_name . " vừa đặt dịch vụ của của cửa hàng",
            "auth" => $auth
        ];
        $store->notify(new UserOrderNotification($data));
    }

    /**
     * confirmOrderFromStoreNotification
     * confirmOrderFromStoreNotification *save data in database
     * @param store_id
     * @return array
     **/
    function statusOrderNotification($object, $auth, $title)
    {
        $data =  [
            "massage" => $title,
            "auth" => $auth
        ];
        $object->notify(new StatusOrderNotification($data));
    }

    function notifyOrderNotification($object_id, $order_id, $title)
    {
        $data =  [
            "id" => $object_id,
            "order" => $this->hanldeDataResponse($this->orderRepository->selectOrderById($order_id)),
            "massage" => $title
        ];
        broadcast(new NotifyStatusToOrder($data));
    }

    /**
     * hanldeDataResponse
     * hanldeDataResponse *select order by user or store
     **/
    function hanldeDataResponse($data)
    {
        try {
            $output = [];
            foreach ($data as $value) {
                $order['order_id'] =   $value->order_id;
                $order['address'] =   $value->address;
                $order['order_time'] =   $value->order_time;
                $order['order_day'] =   $value->order_day;
                $order['total'] =  $value->total;
                $order['store'] = $this->storeSevice->hanldeDataResponse(($value->store()->first()));
                $order['user'] =  $value->user()->get();
                $order['status'] =   $value->massage()->get();
                array_push($output, $order);
            }
            return  $output;
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }
}
