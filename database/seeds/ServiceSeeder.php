<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('services')->insert([
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b40',
                'service_name' => 'nail mạ vàng',
                'description' => 'đính vàng 24k',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222223',
            ],
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b41',
                'service_name' => 'nail mạ kim cuong',
                'description' => 'đính vàng 24k',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222223',
            ],
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b42',
                'service_name' => 'nail mạ đồng',
                'description' => 'đính vàng 24k',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222223',
            ],
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b43',
                'service_name' => 'nail bình thường',
                'description' => 'đính vàng 24k',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222223',
            ],
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b44',
                'service_name' => 'nail mạ vàng rồng',
                'description' => 'đính vàng hôn',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222223',
            ],
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b45',
                'service_name' => 'nail mạ vàng khổi',
                'description' => 'đính vàng thôi',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222223',
            ],
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b46',
                'service_name' => 'nail mạ vàng mã',
                'description' => 'đính vàng mà',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222224',
            ],
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b47',
                'service_name' => 'nail mạ vàng giả',
                'description' => 'đính vàng đó',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222224',
            ],
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b48',
                'service_name' => 'nail mạ vàng vàng',
                'description' => 'đính vàng rồi',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222224',
            ],
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b49',
                'service_name' => 'nail mạ vàng 100k',
                'description' => 'đính vàng ưu',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222224',
            ],
            [
                'service_id' => '3891672d-1362-49a6-b986-81eaead53b50',
                'service_name' => 'nail mạ vàng 1k',
                'description' => 'đính vàng hà',
                'description' => 0,
                'price' => 10000000,
                'image' => '/storage/services/nail.jpg',
                'store_id' => '22222224',
            ]
        ]);
    }
}
