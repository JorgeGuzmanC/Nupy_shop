<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{

    
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->runDataDefault();
        // \App\Models\User::factory(10)->create();
    }

    public function runDataDefault()
    {
        DB::table('roles')->insert([
            'rol'=>'admin'
        ]);
    }
}
