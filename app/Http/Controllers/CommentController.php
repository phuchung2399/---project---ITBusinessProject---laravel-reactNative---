<?php

namespace App\Http\Controllers;

use App\Services\CommentSerivece;
use App\Http\Requests\CommentRequset\CommentInsertRequest;
use App\Http\Requests\CommentRequset\CommentUpdateRequest;

class CommentController extends Controller
{

    private $commentSerivece;

    function __construct(CommentSerivece $commentSerivece)
    {
        $this->commentSerivece = $commentSerivece;
    }

    /**
     * @OA\Get(
     *      path="/api/v1/comment-store/{id}",
     *      summary="Get add comment of a store",
     *      tags={"comment"},
     *      operationId="get_comment_store",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *          ),
     *      ),
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
    public function getCommetByIdStore($id)
    {
        return $this->commentSerivece->selectCommentByIdShop($id);
    }

    /**
     * @OA\Post(
     *      path="/api/v1/comment",
     *      summary="Create comment",
     *      tags={"comment"},
     *      operationId="post_comment_store",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="title",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="star",
     *                     type="interger",
     *                 ),
     *                 @OA\Property(
     *                     property="store_id",
     *                     type="interger",
     *                 ),
     *                 example={"title": "Good","star": "5","store_id": "22222220"}
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
    public function postComment(CommentInsertRequest $request)
    {
        return $this->commentSerivece->insertComment($request);
    }

    /**
     * @OA\Put(
     *      path="/api/v1/comment/{id}",
     *      summary="update comment",
     *      tags={"comment"},
     *      operationId="put_comment_store",
     *      @OA\Parameter(
     *          name="id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string",
     *              format= "uuid"
     *          ),
     *      ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="title",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="star",
     *                     type="interger",
     *                 ),
     *                 @OA\Property(
     *                     property="store_id",
     *                     type="interger",
     *                 ),
     *                 example={"title": "Good","star": "5","store_id": "22222220"}
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
    public function putComment(CommentUpdateRequest $request, $id)
    {
        return $this->commentSerivece->updateComment($request, $id);
    }

    /**
     * @OA\Delete(
     *      path="/api/v1/comment/{id}",
     *      summary="delete comment",
     *      tags={"comment"},
     *      operationId="delete_comment_store",
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
    public function deleteComment($id)
    {
        return $this->commentSerivece->deleteCommnet($id);
    }
}
