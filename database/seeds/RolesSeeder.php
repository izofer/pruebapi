<?php

use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
			'rol' => 'Administrator',
			'created_at'   => '2021-08-06',
          	'updated_at'   => '2018-08-06 ' 
		]);

		DB::table('roles')->insert([
			'rol' => 'Operator',
			'created_at'   => '2021-08-06',
          	'updated_at'   => '2021-08-06 ' 
		]);
    }
}
