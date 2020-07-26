<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            [
                'admin_name' => 'Vo Nguyen Phuc Hung', 'email' => 'phuchung2399@gmail.com',
                'phone' => '0967258205', 'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'auth' => 'admin'
            ],
            [
                'admin_name' => 'Quach Thi Dieu', 'email' => 'dieuquoch123@gmail.com',
                'phone' => '0987456321', 'password' => '$2y$10$E1Xmh/fFgFXu8xFAGwJ4g.EOJaMCotQSIlXaqM68JRZE.0YS0LaQa',
                'auth' => 'admin'
            ],
        ]);
    }
}

