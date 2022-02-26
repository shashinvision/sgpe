<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

// Si usaremos DB:: hay que importar el facade use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // * En caso de querer truncar la tablas y desactivar las llaves foraneas
        // DB::statement('SET FOREIGN_KEY_CHECKS = 0;'); // Desactivamos la revisión de claves foráneas
        // DB::table('users')->truncate();
        // DB::statement('SET FOREIGN_KEY_CHECKS = 1;'); // Reactivamos la revisión de claves foráneas


        DB::table('users')->insert([
            'name' => 'Felipe Mancilla',
            'email' => 'felipei.mancilla@gmail.com',
            'id_companys' => 1,
            'id_permissions' => 1,
            'email' => 'felipei.mancilla@gmail.com',
            'password' => bcrypt('1234'),
            'state' => 1,
        ]);
    }
}
