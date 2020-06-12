<?php

namespace App\Http\Controllers;

use App\Services\SlideService;
use App\Http\Requests\SlideRequest\SlideRequest;

class SlideController extends Controller
{
    private $slideService;

    function __construct(SlideService $slideService)
    {
        $this->slideService = $slideService;
    }

    function getSlide()
    {
        return $this->slideService->selectSlide();
    }

    function getSlideById($id)
    {
        return $this->slideService->selectSlideById($id);
    }

    function postSlide(SlideRequest $request)
    {
        return $this->slideService->inserSlide($request);
    }

    function putSlide(SlideRequest $request, $id)
    {
        return $this->slideService->updateSlide($request, $id);
    }

    function deleteSlide($id)
    {
        return $this->slideService->deleteSlide($id);
    }
}
