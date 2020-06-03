<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use App\Repositories\SlideRepository;
use App\Helper\Constants\HttpStatus;
use App\Helper\Validation; // container check validate
use App\Helper\Response; // container Response
use App\Helper\Support; // container function to hanld string, image, number
use App\Models\Slide;
use Ramsey\Uuid\Uuid;

class SlideService
{
    private $slideRepository;
    private $slide;

    function __construct(Slide $slide, SlideRepository $slideRepository)
    {
        $this->slide = $slide;
        $this->slideRepository = $slideRepository;
    }

    /**
     * selectSlide
     * selectSlide select on slide
     **/
    function selectSlide()
    {
        return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->slideRepository->selectSlide());
    }

    /**
     * selectSlideById
     * selectSlideById select on slide by ID
     * @param id
     **/
    function selectSlideById($id)
    {
        if ($this->slideRepository->checkSlideById($id)) {
            return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $this->slideRepository->selectSlideById($id));
        } else {
            return Response::responseMessage(HttpStatus::NOT_FOUND,  "Không tìm thấy");
        }
    }

    /**
     * inserSlide
     * inserSlide save data when add slide
     * @param request
     **/
    function inserSlide($request)
    {
        $slide = $this->slide;
        $slide->slide_id = Uuid::uuid4();
        $slide->title = Validation::handleSpace($request->title);
        $slide->image = Support::handleUploadImage($request, 'slides', 'image');
        $this->slideRepository->insertSlide($slide);
        return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Slide đã được tạo");
    }

    /**
     * updateSlide
     * updateSlide save data when add update slide
     * @param request
     * @param id
     **/
    function updateSlide($request, $id)
    {
        if ($this->slideRepository->checkSlideById($id)) {
            $slide = $this->slide::find($id);
            Storage::delete("public" . Validation::handleUrlImage($slide->image)); // delete file
            $slide->title = Validation::handleSpace($request->title);
            $slide->image = Support::handleUploadImage($request, 'slides', 'image');
            $this->slideRepository->updateSlide($slide);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Cập nhập thành công");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Cập nhập không thành công");
        }
    }

    /**
     * deleteSlide
     * deleteSlide delete slide
     * @param id
     **/
    function deleteSlide($id)
    {
        if ($this->slideRepository->checkSlideById($id)) {
            $slide = $this->slide;
            $slide = $this->slide::find($id);
            $this->slideRepository->deleteSlide($slide);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  "Xóa thành công");
        } else {
            return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Xóa không thành công");
        }
    }
}
