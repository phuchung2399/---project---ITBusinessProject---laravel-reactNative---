<?php

namespace App\Repositories;

use App\Models\Slide;

class SlideRepository
{
    private $slide;

    function __construct(Slide $slide)
    {
        $this->slide = $slide;
    }

    /**
     * selectSlide
     * selectSlide select a slide
     * @return object
     **/
    function selectSlide()
    {
        return $this->slide::all();
    }

    /**
     * selectSlideById
     * selectSlideById select all location
     * @param id
     * @return object
     **/
    function selectSlideById($id)
    {
        return $this->slide::find($id);
    }

    /**
     * insertSlide
     * insertSlide save data slide when add slide
     * @param slide
     **/
    function insertSlide($slide)
    {
        $slide->save();
    }

    /**
     * updateSlide
     * updateSlide save data slide when update
     * @param slide
     **/
    function updateSlide($slide)
    {
        $slide->save();
    }

    /**
     * deleteSlide
     * deleteSlide delete data location
     * @param slide
     **/
    function deleteSlide($slide)
    {
        $slide->delete();
    }

    /**
     * checkSlideById
     * checkSlideById check exists of ID
     * @param id
     * @return TrueOfFalse
     **/
    function checkSlideById($id)
    {
        return $this->slide::where('slide_id', $id)->exists();
    }
}
