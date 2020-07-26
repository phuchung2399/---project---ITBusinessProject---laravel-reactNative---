<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Hypweb\Flysystem\GoogleDrive\GoogleDriveAdapter;
use League\Flysystem\Filesystem;
use Illuminate\Support\Facades\Storage;

class GoogleDriveServiceProvider extends ServiceProvider
{

    public $data;
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * refreshToken
     * handle refreshToken
     * @return string
     **/
    function refreshToken()
    {
        $postRequest = '{
            "client_id": "92126978448-tq33l8k8b6pqmfsjf7aoba6nh0683ljf.apps.googleusercontent.com",
            "client_secret": "beFF7CTZb2kIfE0sRvZMi8qe",
            "refresh_token": "1//04PvbrUlFWvXDCgYIARAAGAQSNwF-L9IrjCB6a4LXkn5XGWrJVRHhUsA0xK0_RTJZ70xUwF_QfSCx4794S9dxXmaHagcsRy_N1AY",
            "token_uri": "https://oauth2.googleapis.com/token"
        }';
        //
        $cURLConnection = curl_init('https://developers.google.com/oauthplayground/refreshAccessToken');
        curl_setopt($cURLConnection, CURLOPT_POSTFIELDS, $postRequest);
        curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);
        $apiResponse = curl_exec($cURLConnection);
        curl_close($cURLConnection);
        return json_decode($apiResponse)->access_token;
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // \Storage::extend("google", function ($app, $config) {
        //     $client = new \Google_Client;
        //     $client->setClientId($config['clientId']);
        //     $client->setClientSecret($config['clientSecret']);
        //     $client->refreshToken($config['refreshToken']);
        //     $service = new \Google_Service_Drive($client);
        //     $adapter = new GoogleDriveAdapter($service, $config['folderId']);
        //     return new Filesystem($adapter);
        // });
        Storage::extend('google', function ($app, $config) {
            $client = new \Google_Client();
            $client->setClientId($config['clientId']);
            $client->setClientSecret($config['clientSecret']);
            $client->refreshToken($this->refreshToken());
            //    var_dump($config);
            $service = new \Google_Service_Drive($client);
            $options = [];
            if (isset($config['teamDriveId'])) {
                $options['teamDriveId'] = $config['teamDriveId'];
            }
            $adapter = new GoogleDriveAdapter($service, $config['folderId'], $options);
            return new Filesystem($adapter);
        });
    }
}
