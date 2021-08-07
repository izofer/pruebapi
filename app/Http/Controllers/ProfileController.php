<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use Illuminate\Support\Facades\Hash;
use App\User;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = User::all();

        //con resources api
        return UsersResource::collection($query)->additional([
            'response' => true,
            'message'  => 'Los usuarios fueron listados.'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //con resources api
        $message = 'El usuario fue agregado.';
        $request['password'] = Hash::make($request['password']);
        return $this->dispatchCitiesResource(User::create($request->all()),$message);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $query = User::where('id',$id)
                     ->firstOrFail();

        //con resources api
        return $this->dispatchCitiesResource($query);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $query = User::findOrFail($id);
        $query->fill($request->all())->save();

        //con resources api
        $message = 'El usuario fue editado.';
        return $this->dispatchCitiesResource($query,$message);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $query = User::findOrFail($id);
        $query->delete();

        //con resources api
        $message = 'El usuario fue eliminado';
        return $this->dispatchCitiesResource($query,$message);
    }

    /*PRIVATE FUNCTION API RESOURCE*/
    private function dispatchCitiesResource($query, $message = 'Acción ejecutada.')
    {
        return (new UsersResource($query))->additional([
            'message' => $message
        ]);
    }
}
