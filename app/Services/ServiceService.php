<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use App\Helper\Validation; // container check validate
use App\Models\Service;
use App\Helper\Response; // container Response
use App\Repositories\ServiceRepository;
use App\Helper\Support; // container function to hanld string, image, number
use App\Helper\Constants\HttpStatus;
use Ramsey\Uuid\Uuid;
use App\Helper\Constants\FolderID;

use Illuminate\Support\Facades\Auth;

class ServiceService
{

    private $serviceRepository;
    private $service;

    function __construct(ServiceRepository $serviceRepository, Service $service)
    {
        $this->serviceRepository = $serviceRepository;
        $this->service = $service;
    }

    /**
     * selectService
     * selectService select on service
     * @return json
     **/
    function selectService()
    {
        try {
            return Response::responseSuccess($this->serviceRepository->selectService());
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * searchService
     * searchService select on service by key
     * @param request
     * @return json
     **/
    function searchService($request)
    {
        try {
            return Response::responseSuccess($this->serviceRepository->searchService($request, (Auth::guard('stores')->user())->store_id));
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectServiceById
     * selectServiceById select on service by ID
     * @param id
     * @return json
     **/
    function selectServiceByIdStore($id)
    {
        try {
            if ($this->serviceRepository->checkServiceByIdStore($id)) {
                return Response::responseSuccess($this->serviceRepository->selectServiceByIdStore($id));
            } else {
                return Response::responseMessage(HttpStatus::NOT_FOUND,  "Không tìm thấy");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectServiceById
     * selectServiceById
     * @param id
     * @return object
     */
    function selectServiceById($id)
    {
        try {
            if ($this->serviceRepository->checkServiceById($id)) {
                return $this->serviceRepository->selectServiceById($id);
            } else {
                return 'Dịch vụ không được tìm thấy';
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectServiceById
     * selectServiceById
     * @param id
     * @return object
     */
    function hanldeServiceToTotal($id)
    {
        try {
            if ($this->serviceRepository->checkServiceById($id)) {
                return $this->serviceRepository->selectServiceById($id);
            } else {
                $object['price'] = 0;
                return (object)($object['price']);
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * insertService
     * insertService save data when add service
     * @param request
     * @return json
     **/
    function insertService($request)
    {
        try {
            $service = $this->service;
            $service->service_id = Uuid::uuid4();
            $service->store_id = Auth::guard('stores')->user()->store_id;
            $service = $this->hanldeRequst($service, $request);
            $this->serviceRepository->insertService($service);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Dịch vụ đã được tạo");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateService
     * updateService save data when add update service
     * @param request
     * @param id
     * @return json
     **/
    function updateService($request, $id)
    {
        try {
            if ($this->serviceRepository->checkServiceById($id)) {
                $service = $this->serviceRepository->selectServiceById($id);
                if ($service->store_id ==  Auth::guard('stores')->user()->store_id) {
                    Storage::cloud()->delete(Validation::handleImageNameGetId($service->image)); // delete file on drive
                    $service = $this->hanldeRequst($service, $request);
                    $this->serviceRepository->updateService($service);
                    return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Cập nhật thành công");
                } else {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Dịch vụ này không thuộc cửa hàng của bạn");
                }
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Cập nhật không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * requestData
     * requestData request data from client send to on server
     * @param request
     * @param user *store from checkServiceById in serviceRepository
     * @return array
     **/
    function hanldeRequst($service, $request)
    {
        $service->service_name = $request->service_name;
        $service->description = $request->description;
        $service->reduced_price = $request->reduced_price;
        $service->price = $request->price;
        $service->image = Support::handleImageGetLink(FolderID::SERVICE_ID, $request->file('image')->store(FolderID::SERVICE_ID, 'google'));
        return $service;
    }

    /**
     * deteleService
     * deteleService delete slide
     * @param id
     * @return json
     **/
    function deteleService($id)
    {
        try {
            if ($this->serviceRepository->checkServiceById($id)) {
                $service = $this->serviceRepository->selectServiceById($id);
                if ($service->store_id ==  Auth::guard('stores')->user()->store_id) {
                    Storage::delete("public" . Validation::handleUrlImage($service->image)); // delete file
                    $this->serviceRepository->deleteService($service);
                    return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, "Xóa thành công");
                } else {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Dịch vụ này không thuộc cửa hàng của bạn");
                }
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Xóa không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }
}
