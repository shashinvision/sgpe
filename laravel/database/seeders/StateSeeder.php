<?php

namespace Database\Seeders;
// Si usaremos DB:: hay que importar el facade use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('states')->insert([
            'name' => 'Vigente',
            'state' => 1,

        ]);
        DB::table('states')->insert([
            'name' => 'No vigente',
            'state' => 1,

        ]);
    }
}
