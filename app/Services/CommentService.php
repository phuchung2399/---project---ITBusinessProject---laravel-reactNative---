<?php

namespace App\Services;

use App\Repositories\CommentRepository;
use App\Helper\Constants\HttpStatus;
use App\Helper\Validation; // container check validate
use App\Helper\Response; // container Response
use Ramsey\Uuid\Uuid;
use App\Models\Comment;

class CommentSerivece
{
    private $commentRepository;
    private $comment;

    function __construct(CommentRepository $commentRepository, Comment $comment)
    {
        $this->commentRepository = $commentRepository;
        $this->comment = $comment;
    }

    /**
     * selectCommentByIdShop
     * selectCommentByIdShop *select data comment by id shop
     * @param request
     **/
    function selectCommentByIdShop($id)
    {
        if ($this->commentRepository->checkCommentByIdShop($id)) {
            $comments = $this->commentRepository->selectCommentByIdShop($id);
            $data = [];
            foreach ($comments as $comment) {
                $comment['comment_id'] = Validation::handleSpace($comment->comment_id);
                $comment['title'] = $comment->title;
                $comment['star'] =   $comment->star;
                $comment['user'] =  $comment->user()->get();
                array_push($data, $comment); // push object into data
            }
            return Response::responseSuccess(HttpStatus::SUCCESS_RESPONSE, $data);
        } else {
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE,  'Của hàng chưa được đăng ký');
        }
    }

    /**
     * insertComment
     * insertComment save data when add comment
     * @param request
     **/
    function insertComment($request)
    {
        $comment = $this->comment;
        $comment->comment_id = Uuid::uuid4();
        $this->handleRequest($comment, $request);
        $comment->store_id = $request->store_id;
        $comment->user_id = $request->user_id;
        $this->commentRepository->insertComment($comment);
        return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Đã bình luận thành công");
    }

    /**
     * insertComment
     * insertComment save data when add comment
     * @param request
     **/
    function updateComment($request, $id)
    {
        if ($this->commentRepository->checkCommentById($id)) {
            $comment = $this->commentRepository->selectCommentById($id);
            $this->handleRequest($comment, $request);
            $this->commentRepository->updateComment($comment);
            return Response::responseMessage(HttpStatus::SUCCESS_CREATED, "Cập nhật bình luận thành công");
        } else {
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, "Cập nhật bình luận không thành công");
        }
    }

    function deleteCommnet($id)
    {
        if ($this->commentRepository->checkCommentById($id)) {
            $this->commentRepository->deleteComment($id);
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, "Xóa bình luận thành công");
        } else {
            return Response::responseMessage(HttpStatus::SUCCESS_RESPONSE, "Xóa nhật bình luận không thành công");
        }
    }

    /**
     * handleRequest
     * handleRequest request data from client send to on server
     * @param request
     * @param comment *comment from selectCommentById in commentRepository
     **/
    function handleRequest($comment, $request)
    {
        $comment->title = $request->title;
        $comment->star = $request->star;
    }
}
