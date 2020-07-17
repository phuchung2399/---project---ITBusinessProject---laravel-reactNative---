<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MassageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('massages')->insert([
            [
                'massage_id' => 10,
                'massage' => 'Đã hủy'
            ],
            [
                'massage_id' => 16,
                'massage' => 'Đã xác nhận'
            ],
            [
                'massage_id' => 17,
                'massage' => 'Đã hoàn thành'
            ],
            [
                'massage_id' => 22,
                'massage' => 'Đơn bị từ chối'
            ],  [
                'massage_id' => 29,
                'massage' => 'Đơn đang chờ xác nhận'
            ]
        ]);
    }
}
