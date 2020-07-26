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
        try {
            return Response::responseSuccess($this->locationRepository->selectLocation());
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectLocationById
     * selectLocationById select on location by ID
     * @param id
     * @return json
     **/
    function selectLocationById($id)
    {
        try {
            if ($this->locationRepository->checkLocationById($id)) {
                return Response::responseSuccess($this->locationRepository->selectLocationById($id));
            } else {
                return Response::responseMessage(HttpStatus::NOT_FOUND,  "Không tìm thấy");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * insertLocation
     * insertLocation save data when add location
     * @param request
     * @return json
     **/
    function insertLocation($request)
    {
        try {
            $location = $this->location;
            $location->location_id = Uuid::uuid4();
            $location = $this->hanldeRequst($location, $request);
            $this->locationRepository->insertLocation($location);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Vị trí đã được tạo");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateLocation
     * updateLocation save data when add update location
     * @param request
     * @param id
     * @return json
     **/
    function updateLocation($request, $id)
    {
        try {
            if ($this->locationRepository->checkLocationById($id)) {
                $location = $this->location::find($id);
                if ($location->location_name == $request->location_name) {
                    return $this->handleUpdateLocation($location, $request);
                } elseif (count($this->locationRepository->selectManyLocationByName($request->location_name)) >= 1) {
                    return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Vị trí đã tồn tại");
                } else {
                    return $this->handleUpdateLocation($location, $request);
                }
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Cập nhật không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * handleUpdateLocation
     * handleUpdateLocation is middlemen function to a lot of duplicate for update
     * @param request
     * @param location *location from  $this->location::find($id);
     * @return json
     **/
    function handleUpdateLocation($location, $request)
    {
        try {
            $this->locationRepository->updateLocation($this->hanldeRequst($location, $request));
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED,  "Cập nhật thành công");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * deleteLocation
     * deleteLocation delete location
     * @param id
     * @return json
     **/
    function deleteLocation($id)
    {
        try {
            if ($this->locationRepository->checkLocationById($id)) {
                $this->locationRepository->deleteLocation($id);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Xóa thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Xóa không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * handleUpdate
     * handleUpdate is middlemen function to a lot of duplicate for update
     * @param request
     * @param store *store from selectLocationById in locationRepository
     * @return string
     **/
    function hanldeRequst($location, $request)
    {
        $location->location_name = Validation::handleSpace($request->location_name);
        return $location;
    }

    /**
     * getNameLocation
     * @param location_id
     * @return string
     **/
    function getNameLocation($location_id)
    {
        $location = $this->locationRepository->selectLocationById($location_id);
        return json_decode($location)->location_name;
    }
}
