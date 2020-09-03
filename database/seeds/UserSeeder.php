<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'user_id' => 909090,
                'avatar' => 'https://drive.google.com/uc?export=view&id=1L8Ffo9wP-IQrhN1gFeTd0IIZoYPN4fFg',
                'user_name' => 'Mr Hưng',
                'phone' => '0967258205',
                'email' => 'phuchung2399@gmail.com',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'auth' => 'user',
                'active' => 1,
                'created_at' => '2020-09-01 06:24:50',
                'updated_at' => new DateTime,
            ],
            [
                'user_id' => 909091,
                'avatar' => 'https://drive.google.com/uc?export=view&id=1L8Ffo9wP-IQrhN1gFeTd0IIZoYPN4fFg',
                'user_name' => 'Mr Tuấn',
                'phone' => '0967258206',
                'email' => 'phuchung2499@gmail.com',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'auth' => 'user',
                'active' => 1,
                'created_at' => '2020-09-10 06:24:50',
                'updated_at' => new DateTime,
            ],
            [
                'user_id' => 909092,
                'avatar' => 'https://drive.google.com/uc?export=view&id=1L8Ffo9wP-IQrhN1gFeTd0IIZoYPN4fFg',
                'user_name' => 'Mr Thịnh',
                'phone' => '0967258207',
                'email' => 'phuchung2599@gmail.com',
                'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'auth' => 'user',
                'active' => 1,
                'created_at' => '2020-09-20 06:24:50',
                'updated_at' => new DateTime,
            ]
        ]);
    }
}
