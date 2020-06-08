<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stores')->insert([
            [
                'store_id' => 22222223,
                'store_name' => 'Mai nail',
                'phone' => '0967258000',
                'email' => 'phuchung2399@gmail.com',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'address' => '101b le huu trac',
                'open_time' => '8:00:00',
                'close_time' => '21:00:00',
                'image' => '/storage/stores/8Z6M9xWTOUCznv2Z6I5irZ27VfKGF4xAttWF0YUA.jpeg',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b986-81eaead53b47',
                'auth' => 'store'
            ],
            [
                'store_id' => 22222224,
                'store_name' => 'Dieu nail',
                'phone' => '0967258111',
                'email' => 'hung.vo@student.passerellesnumeriques.org',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'address' => '101b le huu trac',
                'open_time' => '9:00:00',
                'close_time' => '22:00:00',
                'image' => '/storage/stores/8Z6M9xWTOUCznv2Z6I5irZ27VfKGF4xAttWF0YUA.jpeg',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'auth' => 'store'
            ]
        ]);
    }
}
