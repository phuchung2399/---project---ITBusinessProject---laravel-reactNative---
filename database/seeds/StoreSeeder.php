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
                'image' => 'https://drive.google.com/uc?export=view&id=1Ot5aOKzsy0HF8n9sJrWIYmW9F7CmL2_b',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b986-81eaead53b47',
                'auth' => 'store',
                'star' => 0,
                'point_search' => 0
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
                'image' => 'https://drive.google.com/uc?export=view&id=1Ot5aOKzsy0HF8n9sJrWIYmW9F7CmL2_b',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'auth' => 'store',
                'star' => 0,
                'point_search' => 0
            ],
            [
                'store_id' => 22222225,
                'store_name' => 'ahuhu nail',
                'phone' => '0967258222',
                'email' => 'hung.vo.vo@student.passerellesnumeriques.org',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'address' => '101b le huu trac',
                'open_time' => '9:00:00',
                'close_time' => '22:00:00',
                'image' => 'https://drive.google.com/uc?export=view&id=1Ot5aOKzsy0HF8n9sJrWIYmW9F7CmL2_b',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'auth' => 'store',
                'star' => 0,
                'point_search' => 0
            ],
            [
                'store_id' => 22222626,
                'store_name' => 'haha nail',
                'phone' => '0967258333',
                'email' => 'hung.vo.ahihi@student.passerellesnumeriques.org',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'address' => '101b le huu trac',
                'open_time' => '9:00:00',
                'close_time' => '22:00:00',
                'image' => 'https://drive.google.com/uc?export=view&id=1Ot5aOKzsy0HF8n9sJrWIYmW9F7CmL2_b',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'auth' => 'store',
                'star' => 0,
                'point_search' => 0
            ],
            [
                'store_id' => 22222226,
                'store_name' => 'kaka nail',
                'phone' => '0967258444',
                'email' => 'hung.vo.1@student.passerellesnumeriques.org',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'address' => '101b le huu trac',
                'open_time' => '9:00:00',
                'close_time' => '22:00:00',
                'image' => 'https://drive.google.com/uc?export=view&id=1Ot5aOKzsy0HF8n9sJrWIYmW9F7CmL2_b',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'auth' => 'store',
                'star' => 0,
                'point_search' => 0
            ], [
                'store_id' => 22222227,
                'store_name' => 'hihi nail',
                'phone' => '0967258555',
                'email' => 'hung.vo2@student.passerellesnumeriques.org',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'address' => '101b le huu trac',
                'open_time' => '9:00:00',
                'close_time' => '22:00:00',
                'image' => 'https://drive.google.com/uc?export=view&id=1Ot5aOKzsy0HF8n9sJrWIYmW9F7CmL2_b',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'auth' => 'store',
                'star' => 0,
                'point_search' => 0
            ], [
                'store_id' => 22222228,
                'store_name' => 'oi ha nail',
                'phone' => '0967258666',
                'email' => 'hung.vo5@student.passerellesnumeriques.org',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'address' => '101b le huu trac',
                'open_time' => '9:00:00',
                'close_time' => '22:00:00',
                'image' => 'https://drive.google.com/uc?export=view&id=1Ot5aOKzsy0HF8n9sJrWIYmW9F7CmL2_b',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'auth' => 'store',
                'star' => 0,
                'point_search' => 0
            ], [
                'store_id' => 22222229,
                'store_name' => 'ha a nail',
                'phone' => '0967258999',
                'email' => 'hung.vo7@student.passerellesnumeriques.org',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'address' => '101b le huu trac',
                'open_time' => '9:00:00',
                'close_time' => '22:00:00',
                'image' => 'https://drive.google.com/uc?export=view&id=1Ot5aOKzsy0HF8n9sJrWIYmW9F7CmL2_b',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'auth' => 'store',
                'star' => 0,
                'point_search' => 0
            ], [
                'store_id' => 22222231,
                'store_name' => 'iiuiu nail',
                'phone' => '0967258888',
                'email' => 'hung.vo6@student.passerellesnumeriques.org',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'address' => '101b le huu trac',
                'open_time' => '9:00:00',
                'close_time' => '22:00:00',
                'image' => 'https://drive.google.com/uc?export=view&id=1Ot5aOKzsy0HF8n9sJrWIYmW9F7CmL2_b',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'auth' => 'store',
                'star' => 0,
                'point_search' => 0
            ], [
                'store_id' => 22222232,
                'store_name' => 'Dieu nail',
                'phone' => '0967258777',
                'email' => 'hung.vo8787@student.passerellesnumeriques.org',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'address' => '101b le huu trac',
                'open_time' => '9:00:00',
                'close_time' => '22:00:00',
                'image' => 'https://drive.google.com/uc?export=view&id=1Ot5aOKzsy0HF8n9sJrWIYmW9F7CmL2_b',
                'status' => '',
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'auth' => 'store',
                'star' => 0,
                'point_search' => 0
            ]
        ]);
    }
}
