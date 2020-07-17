<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;

class ClearController extends Controller
{

    function clear()
    {
        try {
            Artisan::call('cache:clear');
            //  Artisan::call('route:clear');
            Artisan::call('config:clear');
            // Artisan::call('view:clear');
            return "Hoàn tất";
        } catch (\Exception $exception) {
            var_dump($exception->getMessage());
        }
    }
}
