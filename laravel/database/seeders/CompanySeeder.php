<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

// Si usaremos DB:: hay que importar el facade use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('companys')->insert([
            'name' => 'sgpe',
            'state' => 1,
        ]);
    }
}
