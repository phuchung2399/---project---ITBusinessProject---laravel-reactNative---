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

    public function getCommetByIdStore($id)
    {
        return $this->commentSerivece->selectCommentByIdShop($id);
    }

    public function postComment(CommentInsertRequest $request)
    {
        return $this->commentSerivece->insertComment($request);
    }

    public function putComment(CommentUpdateRequest $request, $id)
    {
        return $this->commentSerivece->updateComment($request, $id);
    }

    public function deleteComment($id)
    {
        return $this->commentSerivece->deleteCommnet($id);
    }
}
