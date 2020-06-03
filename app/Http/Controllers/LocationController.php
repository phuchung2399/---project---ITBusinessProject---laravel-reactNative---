<?php

namespace App\Http\Controllers;

use App\Services\LocationService;
use App\Http\Requests\LocationRequest\LocationRequest;
use App\Http\Requests\LocationRequest\LocationUpdateRequest;

class LocationController extends Controller
{
    private $locationService;

    function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    function getLocations()
    {
        return $this->locationService->selectLocation();
    }

    function getLocationById($id)
    {
        return $this->locationService->selectLocationById($id);
    }

    function postLocation(LocationRequest $request)
    {
        return $this->locationService->insertLocation($request);
    }

    function putLocation(LocationUpdateRequest $request, $id)
    {
        return $this->locationService->updateLocation($request, $id);
    }

    function deleteLocation($id)
    {
        return $this->locationService->deleteLocation($id);
    }
}
