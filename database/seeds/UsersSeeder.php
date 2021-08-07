<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'rol_id' => 1,
			'name' => 'Pepito Perez',
			'identification' => '1018427516',
			'email' => 'admin@admin.com',
			'email_verified_at' => null,
			'cellphone' => '3058154478',
			'password'  => Hash::make('prueba2021'),
			'created_at'   => now(),
          	'updated_at'   => now() 
		]);
    }
}