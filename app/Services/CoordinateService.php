<?php

namespace App\Services;

use App\Repositories\CoordinateRepository;
use App\Repositories\LocationRepository;
use App\Models\Coordinate;
use App\Helper\Support;

class CoordinateService
{
    private $coordinateRepository;
    private $locationRepository;
    private $coordinate;
    private $data;



    function __construct(CoordinateRepository $coordinateRepository, LocationRepository $locationRepository, Coordinate $coordinate)
    {
        $this->coordinateRepository = $coordinateRepository;
        $this->locationRepository = $locationRepository;
        $this->coordinate = $coordinate;
    }

    /**
     * insert
     * @param coordinates
     * @param store_id
     * 
     **/
    function insert($coordinates, $store_id)
    {
        $coordinate = $this->coordinate;
        $this->data = json_decode(Support::handleGetCoordinate($coordinates))->results[0]->geometry->location;
        $coordinate->lat = ($this->data)->lat;
        $coordinate->lng = ($this->data)->lng;
        $coordinate->store_id = $store_id;
        $this->coordinateRepository->insert($coordinate);
    }

    /**
     * insert
     * @param coordinates
     * @param store_id
     * 
     **/
    function update($coordinates, $store_id)
    {
        $coordinate = $this->coordinateRepository->selectCoordinateByIdStore($store_id);
        $this->data = json_decode(Support::handleGetCoordinate($coordinates))->results[0]->geometry->location;
        $coordinate->lat = ($this->data)->lat;
        $coordinate->lng = ($this->data)->lng;
        $this->coordinateRepository->update($coordinate);
    }

    /**
     * handleRealCoordinate
     * @param address
     * @param store_id
     * @return bool
     **/
    function checkRealCoordinate($address)
    {
        $this->data = Support::handleGetCoordinate($address);
        if (strcasecmp(json_decode($this->data)->status, 'OK') == 0) {
            return true;
        } else {
            return false;
        }
    }
}
