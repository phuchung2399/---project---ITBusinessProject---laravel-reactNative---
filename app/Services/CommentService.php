<?php

namespace App\Services;

use App\Repositories\CommentRepository;
use App\Repositories\StoreRepository;
use App\Helper\Constants\HttpStatus;
use Illuminate\Support\Facades\Auth;
use App\Helper\Validation; // container check validate
use App\Helper\Response; // container Response
use Ramsey\Uuid\Uuid;
use App\Models\Comment;


class CommentSerivece
{
    private $commentRepository;
    private $comment;

    function __construct(CommentRepository $commentRepository, StoreRepository $storeRepository, Comment $comment)
    {
        $this->commentRepository = $commentRepository;
        $this->storeRepository = $storeRepository;
        $this->comment = $comment;
    }

    /**
     * selectCommentByIdShop
     * selectCommentByIdShop *select data comment by id shop
     * @param request
     * @return json
     **/
    function selectCommentByIdShop($id)
    {
        try {
            if ($this->commentRepository->checkCommentByIdShop($id)) {
                $comments = $this->commentRepository->selectCommentByIdShop($id);
                $data = []; // array temp to save then object
                foreach ($comments as $comment) {
                    $comment['comment_id'] = Validation::handleSpace($comment->comment_id);
                    $comment['title'] = $comment->title;
                    $comment['star'] =   $comment->star;
                    $comment['user'] =  $comment->user()->get();
                    array_push($data, $comment); // push object into data
                }
                return Response::responseSuccess($data);
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST,  'Của hàng chưa được tạo');
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * insertComment
     * insertComment save data when add comment
     * @param request
     * @return json
     **/
    function insertComment($request)
    {
        try {
            $comment = $this->comment;
            $comment->comment_id = Uuid::uuid4();
            $this->handleRequest($comment, $request);
            $comment->store_id = $request->store_id;
            $comment->user_id = Auth::user()->user_id;
            $this->commentRepository->insertComment($comment);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Đã bình luận thành công");
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * insertComment
     * insertComment save data when add comment
     * @param request
     * @param id
     * @return json
     **/
    function updateComment($request, $id)
    {
        try {
            if ($this->commentRepository->checkCommentById($id)) {
                $comment = $this->commentRepository->selectCommentById($id);
                $this->handleRequest($comment, $request);
                $this->commentRepository->updateComment($comment);
                return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Cập nhật bình luận thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST, "Cập nhật bình luận không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * deleteCommnet
     * deleteCommnet delete deleteCommnet
     * @param id
     * @return json
     **/
    function deleteCommnet($id)
    {
        try {
            if ($this->commentRepository->checkCommentById($id)) {
                $this->commentRepository->deleteComment($id);
                return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, "Xóa bình luận thành công");
            } else {
                return Response::responseMessage(HttpStatus::BAD_REQUEST, "Xóa nhật bình luận không thành công");
            }
        } catch (\Exception $exception) {
            return Response::responseMessage(HttpStatus::BAD_REQUEST, $exception->getMessage());
        }
    }

    /**
     * handleRequest
     * handleRequest request data from client send to on server and update star for store
     * @param request
     * @param comment *comment from selectCommentById in commentRepository
     **/
    function handleRequest($comment, $request)
    {
        $comment->title = $request->title;
        $comment->star = $request->star;
        $store =  $this->storeRepository->selectStoreById($request->store_id); //
        $store->star = round($store->comment()->avg('star')); //
        $this->storeRepository->updateStore($store); // update star
    }
}
