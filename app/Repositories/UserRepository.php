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
     * selectUser
     * selectUser select all user
     * @return object
     **/
    function selectUser()
    {
        return $this->user::all();
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
     * @return TrueOrfalse
     **/
    function checkUserById($id)
    {
        return $this->user::where('user_id', $id)->exists();
    }

    /**
     * checkUserByEmail
     * checkUserByEmail check exists of EMAIL
     * @param id
     * @return TrueOrfalse
     **/
    function checkUserByEmail($email)
    {
        return $this->user::where('email', $email)->exists();
    }

    /**
     * selectUserByEmail
     * selectUserByEmail select a data have a email
     * @param email
     * @return json
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
     * @return json
     **/
    function selectManyUserByEmail($email)
    {
        return $this->user::where('email', $email)->get();
    }

    /**
     * selectUserByPhone
     * selectUserByPhone select a phone for login store
     * @param phone
     * @return json
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
     * @return json
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
     * @return json
     **/
    function selectUserById($id)
    {
        return $this->user::find($id);
    }

    function selectAllUser()
    {
        return $this->user::all();
    }
}
