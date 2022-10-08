<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class LoginController extends Controller
{
    //
    public function login(Request $request){
       // print_r($request);
        $request->validate([
            'email' => ['required','email'],
            'password' => ['required','min:8']
        ]);

        if(Auth::attempt($request->only('email', 'password')))
        {
            $user = Auth::user();
            return response()->json([
                'status' =>200,
                'userId'=> $user->id,
                'username'=> $user->email]);
        
        }
         throw ValidationException::withMessages([
            //'email'=>"the provided credientials are incorrect"
            'message' => __('auth.failed'),
         ]);
        
    }

    public function logout(){
        Auth::logout();
    }
}
