<?php

namespace App\Http\Controllers;

use App\Location;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\Response;
use App\Http\Requests\LocationRequest;

class LocationController extends Controller
{
    public function getAllLocations()
    {
        $location = Location::all();
        return response()->json($location, Response::HTTP_OK);
    }

    public function getLocation($id)
    {
        if (Location::where('location_id', $id)->exists()) {
            $location = Location::where('location_id', $id)->get();
            return response()->json($location, 200);
        } else {
            return response()->json([
                "message" => "Location not found"
            ], 404);
        }
    }

    public function createLocation(LocationRequest $request)
    {
        $location = new Location;
        $location->location_id = Uuid::uuid4();
        $location->location_name = trim(preg_replace('/\s+/', ' ',  $request->location_name));
        $location->save();
        return response()->json([
            "message" => "Location record created"
        ], 201);
    }

    public function updateLocation(LocationRequest $request, $id)
    {
        if (Location::where('location_id', $id)->exists()) {
            $location = Location::find($id);
            $location->location_name = trim(preg_replace('/\s+/', ' ',  $request->location_name));
            $location->save();
            return response()->json([
                "message" => "Updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "Location not found"
            ], 404);
        }
    }

    public function deleteLocation($id)
    {
        if (Location::where('location_id', $id)->exists()) {
            $location = Location::find($id);
            $location->delete();
            return response()->json([
                "message" => "Deleted successfully"
            ], 202);
        } else {
            return response()->json([
                "message" => "Location not found"
            ], 404);
        }
    }
}
