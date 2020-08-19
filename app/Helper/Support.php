<?php

namespace App\Helper;

use App\Helper\Validation;

class Support
{
    /**
     * handleUploadImage
     * @param request *data request from client
     * @param forder *foder name
     * @param field *request field from client
     * @var path *save url of image
     * @return string
     **/
    public static function handleUploadImage($request, $forder, $field)
    {
        $path = $request->file($field)->store(
            $forder,
            'public'
        ); // upload and get path of image
        return "/storage" . "/" . $path; // save url image
    }

    /**
     * handleImageGetLink
     * handleImageGetLink *hanlde data and return link image on google drive
     * @param folder_id *id folder in google drive
     * @param path *$request->file('image')->store($folder_id, 'google')
     * @return string
     **/
    public static function handleImageGetLink($folder_id, $path)
    {
        $handleNameImage  = new Support;
        $image_id = ($handleNameImage->findImageByName($folder_id, $path))['path'];
        return  'https://drive.google.com/uc?export=view&id=' . Validation::handleImageNameGetFromGgdrive($folder_id, $image_id);
    }

    /**
     * findImageByName
     * findImageByName *find data of image by name of image
     * @param folder_id *id folder in google drive
     * @param path *$request->file('image')->store($folder_id, 'google')
     * @return object
     **/
    public static function findImageByName($folder_id, $path)
    {
        $filename = Validation::handleImageNameGetFromGgdrive($folder_id, $path);
        $recursive = false; // Có lấy file trong các thư mục con không?
        $contents = collect(\Storage::cloud()->listContents($folder_id, $recursive));
        $file = $contents
            ->where('type', '=', 'file')
            ->where('filename', '=', pathinfo($filename, PATHINFO_FILENAME))
            ->where('extension', '=', pathinfo($filename, PATHINFO_EXTENSION))
            ->first(); // có thể bị trùng tên file với nhau!
        return $file;
    }

    /**
     * refreshToken
     * handle refreshToken
     * @return string
     **/
    public static function handleGetCoordinate($address)
    {
        $cURLConnection = curl_init();
        $url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($address) . '&key=AIzaSyBFjbFDpdBp3xkJC-88ntALX2XOBns9z6Y';
        curl_setopt($cURLConnection, CURLOPT_URL, $url);
        curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);
        $data = curl_exec($cURLConnection);
        curl_close($cURLConnection);
        return $data;
    }
}
