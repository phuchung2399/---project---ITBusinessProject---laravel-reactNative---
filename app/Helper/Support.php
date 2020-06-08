<?php

namespace App\Helper;

class Support
{

    /**
     * handleUploadImage
     * 
     * @param request
     **/
    public static function handleUploadImage($request, $forder, $field)
    {
        $path = $request->file($field)->store(
            $forder,
            'public'
        ); // upload and get path of image
        return "/storage" . "/" . $path; // save url image
    }
}
