<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use App\Repositories\SlideRepository;
use App\Helper\Constants\HttpStatus;
use App\Helper\Constants\FolderID;
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
     * @return json
     **/
    function selectSlide()
    {
        try {
            return Response::responseSuccess($this->slideRepository->selectSlide());
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * selectSlideById
     * selectSlideById select on slide by ID
     * @param id
     * @return json
     **/
    function selectSlideById($id)
    {
        try {
            if ($this->slideRepository->checkSlideById($id)) {
                return Response::responseSuccess($this->slideRepository->selectSlideById($id));
            } else {
                return Response::responseMessage(HttpStatus::NOT_FOUND,  "Không tìm thấy");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * inserSlide
     * inserSlide save data when add slide
     * @param request
     * @return json
     **/
    function inserSlide($request)
    {
        try {
            $slide = $this->slide;
            $slide->slide_id = Uuid::uuid4();
            $slide = $this->hanldeRequst($slide, $request);
            $this->slideRepository->insertSlide($slide);

            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Slide đã được tạo");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * updateSlide
     * updateSlide save data when add update slide
     * @param request
     * @param id
     * @return json
     **/
    function updateSlide($request, $id)
    {
        try {
            if ($this->slideRepository->checkSlideById($id)) {
                $slide = $this->slide::find($id);
                Storage::cloud()->delete(Validation::handleImageNameGetId($slide->image)); // delete file on drive
                $slide = $this->hanldeRequst($slide, $request);
                $this->slideRepository->updateSlide($slide);
                return Response::responseMessage(HttpStatus::SUCCESS_CREATED,  "Cập nhật thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  "Cập nhật không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * deleteSlide
     * deleteSlide delete slide
     * @param id
     * @return json
     **/
    function deleteSlide($id)
    {
        try {
            if ($this->slideRepository->checkSlideById($id)) {
                $slide = $this->slide;
                $slide = $this->slide::find($id);
                Storage::cloud()->delete(Validation::handleImageNameGetId($slide->image)); // delete file on drive
                $this->slideRepository->deleteSlide($slide);
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
     * @param store *store from selectVoucherById in slideRepository
     * @return array
     **/
    function hanldeRequst($slide, $request)
    {
        $slide->title = Validation::handleSpace($request->title);
        // $slide->image = Support::handleImageGetLink(FolderID::SLIDE_ID, $request->file('image')->store(FolderID::SLIDE_ID, 'google'));
        $slide->image = Support::handleImageGetLink(FolderID::SLIDE_ID, Storage::cloud()->put(FolderID::SLIDE_ID, $request->image));
        return $slide;
    }
}
