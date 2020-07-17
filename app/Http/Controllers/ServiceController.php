<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest\ServiceInsertRequest;
use App\Http\Requests\ServiceRequest\ServiceUpdateRequest;
use App\Services\ServiceService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    private $serviceService;

    function __construct(ServiceService $serviceService)
    {
        $this->serviceService = $serviceService;
    }

    function getService()
    {
        return $this->serviceService->selectService();
    }

    function getServiceByIdStore($id)
    {
        return $this->serviceService->selectServiceByIdStore($id);
    }

    function searchService(Request $request)
    {
        return $this->serviceService->searchService($request->key);
    }

    function postService(ServiceInsertRequest $request)
    {
        return $this->serviceService->insertService($request);
    }

    function putService(ServiceUpdateRequest $request, $id)
    {
        return $this->serviceService->updateService($request, $id);
    }

    function deleteService($id)
    {
        return $this->serviceService->deteleService($id);
    }
}
