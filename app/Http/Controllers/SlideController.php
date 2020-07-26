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

    /**
     * @OA\Get(
     *      path="/api/v1/slide",
     *      summary="get all slide",
     *      tags={"slide"},
     *      operationId="slide_get",
     *      @OA\RequestBody(),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function getSlide()
    {
        return $this->slideService->selectSlide();
    }

    /**
     * @OA\Get(
     *      path="/api/v1/slide/{id}",
     *      summary="get slide by id",
     *      tags={"slide"},
     *      operationId="slide_get_by_id",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          ),
     *      ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function getSlideById($id)
    {
        return $this->slideService->selectSlideById($id);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/slide",
     *      summary="Create slide",
     *      tags={"slide"},
     *      operationId="slide_post",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="title",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="image",
     *                     type="file",
     *                 ),
     *                 example={"title": "Ngày hội nail app"}
     *             )
     *         )
     *     ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function postSlide(SlideRequest $request)
    {
        return $this->slideService->inserSlide($request);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/slide/{id}",
     *      summary="Update silde",
     *      tags={"slide"},
     *      operationId="slide_put",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          )
     *      ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="title",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="image",
     *                     type="file",
     *                 ),
     *                 @OA\Property(
     *                     property="_method",
     *                     type="string",
     *                 ),
     *             )
     *         )
     *     ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function putSlide(SlideRequest $request, $id)
    {
        return $this->slideService->updateSlide($request, $id);
    }

    /**
     * @OA\Delete(
     *      path="/api/v1/slide/{id}",
     *      summary="Delete slide",
     *      tags={"slide"},
     *      operationId="slide_delete",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          )
     *      ),
     *      @OA\Response(response=200,description="Successful operation"),
     *      @OA\Response(response=201,description="Successful Created"),
     *      @OA\Response(response=400, description="Bad Request"),
     *      @OA\Response(response=401, description="Unauthorized "),
     *      @OA\Response(response=403, description="Forbidden "),
     *      @OA\Response(response=404, description="Resource Not Found"),
     *      @OA\Response(response=406, description="Not Acceptable"),
     *      @OA\Response(response=422, description="Unprocessable Entity"),
     *      @OA\Response(response=500, description="Internal Server Error"),
     *      security={{"passport":{}}},
     * )
     */
    function deleteSlide($id)
    {
        return $this->slideService->deleteSlide($id);
    }
}
