<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

// Si usaremos DB:: hay que importar el facade use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            'name' => 'administrador',
            'state' => 1,

        ]);
        DB::table('permissions')->insert([
            'name' => 'creador',
            'state' => 1,

        ]);
        DB::table('permissions')->insert([
            'name' => 'activador',
            'state' => 1,

        ]);

        DB::table('permissions')->insert([
            'name' => 'revisor',
            'state' => 1,

        ]);
    }
}
