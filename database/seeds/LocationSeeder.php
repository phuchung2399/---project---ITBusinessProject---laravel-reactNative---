<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('locations')->insert([
            [
                'location_id' => '3891672d-1362-49a6-b986-81eaead53b47',
                'location_name' => 'Đà Nẵng',
                'created_at' => new DateTime,
                'updated_at' => new DateTime
            ],
            [
                'location_id' => '3891672d-1362-49a6-b995-81eaead53b47',
                'location_name' => 'Hà Nội',
                'created_at' => new DateTime,
                'updated_at' => new DateTime
            ],
            [
                'location_id' => '3891672d-1362-49a6-b085-81eaead53b47',
                'location_name' => 'Hồ Chí Minh',
                'created_at' => new DateTime,
                'updated_at' => new DateTime
            ],
            [
                'location_id' => '3891672d-1362-49a6-b985-81eaead53b49',
                'location_name' => 'Hải Phòng',
                'created_at' => new DateTime,
                'updated_at' => new DateTime
            ],
            [
                'location_id' => '3891672d-1362-49a6-b985-81eaead53b40',
                'location_name' => 'Cần Thơ',
                'created_at' => new DateTime,
                'updated_at' => new DateTime
            ],
            [
                'location_id' => '3891672d-1362-49a6-b985-81eaead53b00',
                'location_name' => 'Bình Dương',
                'created_at' => new DateTime,
                'updated_at' => new DateTime
            ],
        ]);
    }
}
