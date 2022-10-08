<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    //
    public function register(Request $request){
        //print_r($request);
         $request->validate([
             'name' => ['required'],
             'email' => ['required','email'],
             'password' => ['required','min:8']
         ]);
 
        $user =  User::create([
             'name'=>$request->name,
             'email'=>$request->email,
             'password'=>Hash::make($request->password)
 
         ]);

         return response()->json([
            'status' =>200,
            'userId'=> $user->id,
            'username'=> $user->email
         ]);
 
     }
}
