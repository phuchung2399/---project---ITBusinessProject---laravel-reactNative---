<?php

namespace App\Services;

use App\Repositories\LocationRepository;
use App\Helper\Constants\HttpStatus;
use App\Helper\Validation; // container check validate
use App\Models\Location;
use App\Helper\Response; // container Response
use Ramsey\Uuid\Uuid;

class LocationService
{
    private $locationRepository;
    private $location;

    function __construct(LocationRepository $locationRepository, Location $location)
    {
        $this->locationRepository = $locationRepository;
        $this->location = $location;
    }

    /**
     * selectLocation
     * selectLocation select on location
     **/
    function selectLocation()
    {
        return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->locationRepository->selectLocation());
    }

    /**
     * selectLocationById
     * selectLocationById select on location by ID
     * @param id
     **/
    function selectLocationById($id)
    {
        if ($this->locationRepository->checkLocationById($id)) {
            return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->locationRepository->selectLocationById($id));
        } else {
            return Response::responseMessage(HttpStatus::NOT_FOUND,  "Không tìm thấy");
        }
    }

    /**
     * insertLocation
     * insertLocation save data when add location
     * @param request
     **/
    function insertLocation($request)
    {
        $location = $this->location;
        $location->location_id = Uuid::uuid4();
        $location = $this->hanldeRequst($location, $request);
        $this->locationRepository->insertLocation($location);
        return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Vị trí đã được tạo");
    }

    /**
     * updateLocation
     * updateLocation save data when add update location
     * @param request
     * @param id
     **/
    function updateLocation($request, $id)
    {
        if ($this->locationRepository->checkLocationById($id)) {
            $location = $this->location::find($id);
            if ($location->location_name == $request->location_name) {
                return $this->handleUpdateLocation($location, $request);
            } elseif (count($this->locationRepository->selectManyLocationByName($request->location_name)) >= 1) {
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Vị trí đã tồn tại");
            } else {
                return $this->handleUpdateLocation($location, $request);
            }
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Cập nhật không thành công");
        }
    }

    /**
     * handleUpdateLocation
     * handleUpdateLocation is middlemen function to a lot of duplicate for update
     * @param request
     * @param location *location from  $this->location::find($id);
     **/
    function handleUpdateLocation($location, $request)
    {
        $this->locationRepository->updateLocation($this->hanldeRequst($location, $request));
        return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Cập nhật thành công");
    }

    /**
     * deleteLocation
     * deleteLocation delete location
     * @param id
     **/
    function deleteLocation($id)
    {
        if ($this->locationRepository->checkLocationById($id)) {
            $this->locationRepository->deleteLocation($id);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Xóa thành công");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Xóa không thành công");
        }
    }

    /**
     * handleUpdate
     * handleUpdate is middlemen function to a lot of duplicate for update
     * @param request
     * @param store *store from selectLocationById in locationRepository
     **/
    function hanldeRequst($location, $request)
    {
        $location->location_name = Validation::handleSpace($request->location_name);
        return $location;
    }
}
