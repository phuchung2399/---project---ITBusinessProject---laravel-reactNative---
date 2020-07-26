<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('comments')->insert([
            [
                'comment_id' => '9091672d-1362-49a6-b986-81eaead53b40',
                'title' => 'Good',
                'star' => 5,
                'store_id' => '22222223',
                'user_id' => '909090'
            ],
            [
                'comment_id' => '8191672d-1362-49a6-b986-81eaead53b40',
                'title' => 'Good good',
                'star' => 5,
                'store_id' => '22222223',
                'user_id' => '909090'
            ],
            [
                'comment_id' => '8291672d-1362-49a6-b986-81eaead53b40',
                'title' => 'OMG Good',
                'star' => 5,
                'store_id' => '22222223',
                'user_id' => '909090'
            ],
            [
                'comment_id' => '8391672d-1362-49a6-b986-81eaead53b40',
                'title' => 'Great',
                'star' => 5,
                'store_id' => '22222224',
                'user_id' => '909090'
            ],
            [
                'comment_id' => '8491672d-1362-49a6-b986-81eaead53b40',
                'title' => 'oh yes, great',
                'star' => 5,
                'store_id' => '22222224',
                'user_id' => '909090'
            ],
            [
                'comment_id' => '8591672d-1362-49a6-b986-81eaead53b40',
                'title' => 'So good',
                'star' => 5,
                'store_id' => '22222224',
                'user_id' => '909090'
            ],
        ]);
    }
}
