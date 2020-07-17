<?php

namespace App\Repositories;

use App\Models\Coordinate;

class CoordinateRepository
{
    private $coordinate;

    function __construct(Coordinate $coordinate)
    {
        $this->coordinate = $coordinate;
    }

    /**
     * insert
     * insertStore save data store when register
     * @param coordinate
     **/
    function insert($coordinate)
    {
        $coordinate->save();
    }

    /**
     * update
     * update save data when update
     **/
    function update($coordinate)
    {
        $coordinate->save();
    }

    /**
     * selectStoreByPhone
     * @param  *data request from client
     * @return array
     **/
    function selectCoordinateByIdStore($store_id)
    {
        return $this->coordinate::where('store_id', $store_id)->first();
    }

    /**
     * checkCoordinateByIdStore
     * @param  store_id
     * @return bool
     **/
    function checkCoordinateByIdStore($store_id)
    {
        return $this->coordinate::where('store_id', $store_id)->exists();
    }
}
