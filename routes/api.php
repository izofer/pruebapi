<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*MIGRATE SPECIFIC FILE --path=database/migrations/2021_05_31_185530_create_cities_table.php*/


/*PRUEBA API*/

/*USUARIOS*/
Route::post('/register','ApiAuthenticationController@register');
Route::post('/login','ApiAuthenticationController@login');


Route::group(['middleware' => ['auth:sanctum']],function(){
	//CRUD USER API REST
	Route::apiResource('/profile','ProfileController');

	/*CERRAR SESION*/
	Route::post('/logout','ApiAuthenticationController@logout');
});
