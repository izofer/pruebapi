<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email'  => $this->email,
            'identification'  => $this->identification,
            'cellphone' => $this->cellphone,
            'rol_id' => $this->rol_id,
            'rol'    => $this->rol->rol,
            'token'  => $this->token
        ];
    }

    public function with($request)
    {
        return [
            'response' => true,
        ];
    }
}
