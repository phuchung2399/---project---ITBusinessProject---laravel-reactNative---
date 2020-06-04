<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    private $user;

    function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * insertUser
     * insertUser save data user when register
     * @param user
     **/
    function insertUser($user)
    {
        $user->save();
    }

    /**
     * updateUser
     * updateUser save data user when update
     * @param user
     **/
    function updateUser($user)
    {
        $user->save();
    }

    /**
     * checkUserById
     * checkUserById check exists of ID
     * @param id
     **/
    function checkUserById($id)
    {
        return $this->user::where('user_id', $id)->exists();
    }

    /**
     * checkUserByEmail
     * checkUserByEmail check exists of EMAIL
     * @param id
     **/
    function checkUserByEmail($email)
    {
        return $this->user::where('email', $email)->exists();
    }

    /**
     * selectUserByEmail
     * selectUserByEmail select a data have a email
     * @param email
     **/
    function selectUserByEmail($email)
    {
        return $this->user::where('email', $email)->first();
    }

    /**
     * selectManyUserByEmail
     * selectManyUserByEmail select many data have a email
     * fuction support hanlde duplicate email in database when update data store
     * @param email
     **/
    function selectManyUserByEmail($email)
    {
        return $this->user::where('email', $email)->get();
    }

    /**
     * selectUserByPhone
     * selectUserByPhone select a phone for login store
     * @param phone
     **/
    function selectUserByPhone($phone)
    {
        return $this->user::where('phone', $phone)->first();
    }

    /**
     * selectManyUserByPhone
     * selectManyUserByPhone select many data have a phone
     * fuction support hanlde duplicate phone in database when update data store
     * @param phone
     **/
    function selectManyUserByPhone($phone)
    {
        return $this->user::where('phone', $phone)->get();
    }

    /**
     * selectUserById
     * selectUserById select a user by id
     * fuction support hanlde update, sendemail to reset password, login, change password
     * @param id
     **/
    function selectUserById($id)
    {
        return $this->user::find($id);
    }
}
