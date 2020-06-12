<?php

namespace App\Repositories;

use App\Models\Comment;

class CommentRepository
{
    private $comment;

    function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    /**
     * selectCommentByIdShop
     * selectCommentByIdShop select a comment by id shop
     * fuction select comment of a shop
     * @param id
     **/
    function selectCommentByIdShop($id)
    {
        return $this->comment::where('store_id', $id)->get();
    }

    /**
     * checkCommentByIdShop
     * checkCommentByIdShop check the exists of shop in comment table
     * fuction select comment of a shop
     * @param id
     **/
    function checkCommentByIdShop($id)
    {
        return $this->comment::where('store_id', $id)->exists();
    }

    /**
     * insertComment
     * insertComment save data when client post on server
     * @param comment
     **/
    function insertComment($comment)
    {
        $comment->save();
    }

    /**
     * updateComment
     * updateComment save data when client put on server
     * @param comment
     **/
    function updateComment($comment)
    {
        $comment->save();
    }

    /**
     * updateComment
     * updateComment save data when client put on server
     * @param comment
     **/
    function deleteComment($id)
    {
        ($this->comment::find($id))->delete();
    }
    
    /**
     * selectCommentById
     * selectCommentById select data by id of comment
     * @param comment
     **/
    function selectCommentById($id)
    {
        return $this->comment::where('comment_id', $id)->first();
    }

    /**
     * selectCommentById
     * selectCommentById select data by id of comment
     * @param id
     **/
    function checkCommentById($id)
    {
        return $this->comment::where('comment_id', $id)->exists();
    }
}
