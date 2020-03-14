<?php

namespace App\Http\Controllers;

use App\Slide;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\Response;
use App\Http\Requests\SlideRequest;

class SlideController extends Controller
{
    public function getAllSlides()
    {
        $slide = Slide::all();
        return response()->json($slide, Response::HTTP_OK);
    }

    public function getSlide($id)
    {
        if (Slide::where('slide_id', $id)->exists()) {
            $slide = Slide::where('slide_id', $id)->get();
            return response()->json($slide, 200);
        } else {
            return response()->json([
                "message" => "Slide not found"
            ], 404);
        }
    }

    public function createSlide(SlideRequest $request)
    {
        $slide = new Slide;
        $file = $request->file('image')->getClientOriginalName();
        $slide->slide_id = Uuid::uuid4();
        $slide->image =  $file;
        $request->file('image')->move('assets\images\slides', $file);
        $slide->title =  trim(preg_replace('/\s+/', ' ',  $request->title));
        $slide->save();
        return response()->json([
            "message" => "Slide created successfully"
        ], 201);
    }


    public function updateSlide(SlideRequest $request, $id)
    {
        if (Slide::where('slide_id', $id)->exists()) {
            $slide = Slide::find($id);
            $file = $request->file('image')->getClientOriginalName();
            $slide->image =  $file;
            $request->file('image')->move('assets\images\slides', $file);
            $slide->title =  trim(preg_replace('/\s+/', ' ',  $request->title));
            $slide->save();
            return response()->json([
                "message" => "Updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "Slide not found"
            ], 404);
        }
    }

    public function deleteSlide($id)
    {
        if (Slide::where('slide_id', $id)->exists()) {
            $slide = Slide::find($id);
            $slide->delete();
            return response()->json([
                "message" => "Deleted successfully"
            ], 202);
        } else {
            return response()->json([
                "message" => "Slide not found"
            ], 404);
        }
    }
}
