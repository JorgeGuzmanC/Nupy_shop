<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    //
    function login(Request $req){

        $user = User::where('rut',$req->rut)->first();
        return $user;

    }
        
}
