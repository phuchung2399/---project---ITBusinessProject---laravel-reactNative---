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
     * @return object
     **/
    function selectService()
    {
        return $this->service::all();
    }

    /**
     * selectServiceById
     * selectServiceById select service by id
     * @param id
     * @return object 
     **/
    function selectServiceById($id)
    {
        return $this->service::find($id);
    }

    /**
     * searchService
     * searchService select a service by key on client
     * @param string
     * @return object
     **/
    function searchService($string, $store_id)
    {
        return $this->service::where([['service_name', 'LIKE', "%{$string}%"], ['store_id', '=', $store_id]])->get();
    }

    /**
     * insertService
     * insertService save data service when add servive
     * @param service
     **/
    function insertService($service)
    {
        $service->save();
    }

    /**
     * updateService
     * updateService save data service when update servive
     * @param service
     **/
    function updateService($service)
    {
        $service->save();
    }

    /**
     * checkServiceById
     * checkServiceById check exists of ID
     * @param id
     * @return TrueOfFalse
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
     * @return object
     **/
    function selectServiceByIdStore($id)
    {
        return $this->service::where('store_id', $id)->get();
    }

    /**
     * checkServiceById
     * checkServiceById check exists of ID
     * @param id
     * @return TrueOfFalse
     **/
    function checkServiceByIdStore($id)
    {
        return $this->service::where('store_id', $id)->exists();
    }

    /**
     * deleteSlide
     * deleteSlide delete data location
     * @param service
     **/
    function deleteService($service)
    {
        $service->delete();
    }
}
