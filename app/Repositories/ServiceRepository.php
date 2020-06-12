<?php

namespace App\Repositories;

use App\Models\Service;

class ServiceRepository
{
    private $service;

    function __construct(Service $service)
    {
        $this->service = $service;
    }

    /**
     * selectService
     * selectService select a service
     **/
    function selectService()
    {
        return $this->service::all();
    }

    function selectServiceById($id)
    {
        return $this->service::find($id);
    }

    /**
     * searchService
     * searchService select a service by key on client
     **/
    function searchService($string)
    {
        return $this->service::where('service_name', 'LIKE', "%{$string}%")->get();
    }

    /**
     * insertService
     * insertService save data service when add servive
     * @param slide
     **/
    function insertService($service)
    {
        $service->save();
    }

    /**
     * updateService
     * updateService save data service when update servive
     * @param slide
     **/
    function updateService($service)
    {
        $service->save();
    }

    /**
     * checkServiceById
     * checkServiceById check exists of ID
     * @param id
     **/
    function checkServiceById($id)
    {
        return $this->service::where('service_id', $id)->exists();
    }

    /**
     * selectServiceById
     * selectServiceById select a service by ID
     * fuction support hanlde update, select by ID
     * @param id
     **/
    function selectServiceByIdStore($id)
    {
        return $this->service::where('store_id', $id)->get();
    }

    /**
     * checkServiceById
     * checkServiceById check exists of ID
     * @param id
     **/
    function checkServiceByIdStore($id)
    {
        return $this->service::where('store_id', $id)->exists();
    }

    /**
     * deleteSlide
     * deleteSlide delete data location
     * @param slide
     **/
    function deleteService($service)
    {
        $service->delete();
    }
}
