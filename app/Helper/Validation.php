<?php

namespace App\Helper;

class Validation
{
    /**
     * handleSpace
     * @param string
     * @return string
     **/
    public static function handleSpace($string)
    {
        return trim(preg_replace('/\s+/', ' ',  $string));
    }

    /**
     * handleUrlImage
     * 
     * @param url *is url of image in storage
     * With data /storage/slides/image... in database 
     * can not use Storage::delete to delete file, so need to split /storage to data before
     * type is slides/image... to use Storage::delete to delete file
     * @return string
     **/
    public static function handleUrlImage($url)
    {
        return str_replace('/storage', '', $url);
    }

    /**
     * handleImageNameGetFromGgdrive
     * handleImageNameGetFromGgdrive *slice id and name when response
     * @param folder_id *id folder in google drive
     * @param path *$request->file('image')->store($folder_id, 'google')
     * @return string
     **/
    public static function handleImageNameGetFromGgdrive($folder_id, $path)
    {
        return str_replace($folder_id . '/', '', $path);
    }

    /**
     * handleImageNameGetId
     * handleImageNameGetId *slice id from link
     * @param image *id folder in google drive
     * @return string
     **/
    public static function handleImageNameGetId($image)
    {
        return str_replace('https://drive.google.com/uc?export=view&id=', '', $image);
    }
}
