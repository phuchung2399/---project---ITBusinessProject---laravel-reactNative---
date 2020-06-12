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
     **/
    function selectService()
    {
        return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->serviceRepository->selectService());
    }

    /**
     * searchService
     * searchService select on service by key
     **/
    function searchService($request)
    {
        return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->serviceRepository->searchService($request));
    }

    /**
     * selectServiceById
     * selectServiceById select on service by ID
     * @param id
     **/
    function selectServiceByIdStore($id)
    {
        if ($this->serviceRepository->checkServiceByIdStore($id)) {
            return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->serviceRepository->selectServiceByIdStore($id));
        } else {
            return Response::responseMessage(HttpStatus::NOT_FOUND,  "Không tìm thấy");
        }
    }

    /**
     * insertService
     * insertService save data when add service
     * @param request
     **/
    function insertService($request)
    {
        $service = $this->service;
        $service->service_id = Uuid::uuid4();
        $service->store_id = $request->store_id;
        $service = $this->hanldeRequst($service, $request);
        $this->serviceRepository->insertService($service);
        return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Dịch vụ đã được tạo");
    }

    /**
     * updateService
     * updateService save data when add update service
     * @param request
     * @param id
     **/
    function updateService($request, $id)
    {
        if ($this->serviceRepository->checkServiceById($id)) {
            $service = $this->serviceRepository->selectServiceById($id);
            Storage::delete("public" . Validation::handleUrlImage($service->image)); // delete file
            $service = $this->hanldeRequst($service, $request);
            $this->serviceRepository->updateService($service);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Cập nhật thành công");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Cập nhật không thành công");
        }
    }

    /**
     * requestData
     * requestData request data from client send to on server
     * @param request
     * @param user *store from checkServiceById in serviceRepository
     **/
    function hanldeRequst($service, $request)
    {
        $service->service_name = $request->service_name;
        $service->description = $request->description;
        $service->reduced_price = $request->reduced_price;
        $service->price = $request->price;
        $service->image = Support::handleUploadImage($request, 'services', 'image');
        return $service;
    }

    /**
     * deteleService
     * deteleService delete slide
     * @param id
     **/
    function deteleService($id)
    {
        if ($this->serviceRepository->checkServiceById($id)) {
            $service = $this->serviceRepository->selectServiceById($id);
            Storage::delete("public" . Validation::handleUrlImage($service->image)); // delete file
            $this->serviceRepository->deleteService($service);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Xóa thành công");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Xóa không thành công");
        }
    }
}
