<?php

namespace App\Console\Commands;


use Illuminate\Console\Command;
use Illuminate\Support\Composer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

class SetupDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'setup:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new MYSQL database and run migrate and seed';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $progressBar = $this->output->createProgressBar(100, 1000);
        $progressBar->setFormat('%current%/%max% [%bar%] %percent:3s%% %memory:6s%');
        for ($i = 0; $i < 100; $i++) {
            $progressBar->advance();
            usleep(10);
            if ($i == 100) {
                continue;
            }
        }
        // create database
        // $databaseName = env('DB_DATABASE',false);
        $databaseName = "0203_nailapplication";
        $charset = config("database.connections.mysql.charset", 'utf8mb4');
        $collation = config("database.connections.mysql.collation", 'utf8mb4_unicode_ci');
        config(["database.connections.mysql.database" => null]);
        $query = "CREATE DATABASE IF NOT EXISTS $databaseName CHARACTER SET $charset COLLATE $collation;";
        DB::statement($query);
        config(["database.connections.mysql.database" => $databaseName]);
        ////
        Artisan::call('config:cache'); // Run php artisa config:cache
        Artisan::call('migrate'); // Run php artisa migrate -> Create tables
        Artisan::call('passport:install');
        $this->info("\nSetup table successfully.");
        Artisan::call('db:seed'); // Run php artisa db:seed -> Insert data to database by faker
        $this->info("Setup seeder successfully.");
        Artisan::call('config:clear'); // Run php artisa config:clear
        ////
    }
}
