<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ApiRegisterRequest;
use App\Http\Requests\ApiLoginRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\UsersResource;
use App\User;

class ApiAuthenticationController extends Controller
{
    public function  register(ApiRegisterRequest $request)
    {
    	$message = 'El usuario ha sido creado.';
    	return $this->dispatchUsersResource(
    		User::create([
	    		'name'  => $request['name'],
	    		'email' => $request['email'],
	    		'password' => Hash::make($request['password'])
	    	]),$message
    	);

    	/*RETORNO DE MENSAJE BASICO APIREST*/
    	// return response()->json([
    	// 	'response' => true,
    	// 	'message'  => 'El usuario ha sido creado'
    	// ]);
    }

    public function login(ApiLoginRequest $request)
    {
    	$user = User::with(['rol'])->where('email', $request['email'])->first();

	    if(!$user || !Hash::check($request['password'], $user->password)) 
	    {
	        throw ValidationException::withMessages([
	            'email' => ['Credenciales incorrectas.'],
	        ]);
	    }

	    $token = $user->createToken($request['email'])->plainTextToken;
	    $user['token'] = $token;

	    $message = 'El usuario se ha logeado.';
	    return $this->dispatchUsersResource($user,$message);
    }

    public function logout(Request $request)
    {
    	$request->user()->currentAccessToken()->delete();

    	$message = 'El usuario ha salido.';
    	return response()->json(['data' => $message]);
    }

    /*PRIVATE FUNCTION API RESOURCE*/
    private function dispatchUsersResource($query, $message = 'Acción ejecutada.')
    {
        return (new UsersResource($query))->additional([
            'message' => $message
        ]);
    }
}