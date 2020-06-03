<?php

namespace App\Helper;

class Validation
{

    /**
     * handleSpace
     * 
     * @param string
     * @param object
     **/
    public static function handleSpace($string)
    {
        return trim(preg_replace('/\s+/', ' ',  $string));
    }

    /**
     * handleUrlImage
     * 
     * @param $url *is url of image in storage
     * With data /storage/slides/image... in database 
     * can not use Storage::delete to delete file, so need to split /storage to data before
     * type is slides/image... to use Storage::delete to delete file
     **/
    public static function handleUrlImage($url)
    {
        return str_replace('/storage', '', $url);
    }
}
