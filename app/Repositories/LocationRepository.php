<?php

namespace App\Repositories;

use App\Models\Location;

class LocationRepository
{
    private $location;

    function __construct(Location $location)
    {
        $this->location = $location;
    }

    /**
     * selectLocation
     * selectLocation select a location
     * @return object
     **/
    function selectLocation()
    {
        return $this->location::all();
    }

    /**
     * selectLocationById
     * selectLocationById select a loaction by id
     * fuction support hanlde update, sendemail to reset password, login, change password
     * @param id
     * @return object
     **/
    function selectLocationById($id)
    {
        return $this->location::find($id);
    }

    /**
     * insertLocation
     * insertLocation save data location when add loaction
     * @param location
     **/
    function insertLocation($location)
    {
        $location->save();
    }

    /**
     * updateLocation
     * updateLocation save data location when update
     * @param location
     **/
    function updateLocation($location)
    {
        $location->save();
    }

    /**
     * deleteLocation
     * deleteLocation delete data location
     * @param location
     **/
    function deleteLocation($id)
    {
        ($this->location::find($id))->delete();
    }

    /**
     * checkLocationById
     * checkLocationById check exists of ID
     * @param id
     * @return TrueOrFalse
     **/
    function checkLocationById($id)
    {
        return $this->location::where('location_id', $id)->exists();
    }

    /**
     * selectManyLocationByName
     * selectManyLocationByName select many data have a name
     * fuction support hanlde duplicate name in database when update data location
     * @param name
     * @return object
     **/
    function selectManyLocationByName($name)
    {
        return $this->location::where('location_name', $name)->get();
    }
}
