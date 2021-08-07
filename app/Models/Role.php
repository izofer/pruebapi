<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use SoftDeletes;

    protected $fillable = [
    	'rol'
    ];

    public function user()
    {
    	return $this->hasOne(User::class);
    }
}