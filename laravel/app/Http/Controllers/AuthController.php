<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


class AuthController extends Controller
{
    /**
     * Registro de usuario
     */
    public function signUp(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'id_permissions' => 'required|integer',
            'id_companys' => 'required|integer',
            'password' => 'required|string',
            'state' => 'required|integer|size:1'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'id_permissions' => $request->id_permissions,
            'id_companys' => $request->id_companys,
            'password' => bcrypt($request->password),
            'state' => $request->state
        ]);

        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    /**
     * Inicio de sesión y creación de token
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);

        $user = $request->user();

        // Extraigo los nombres del permiso de usuario que tiene y la compañía a la que pertenece
        $datosUsuario = DB::table('users as u')
            ->select('p.name as permissions', 'c.name as company')
            ->join('permissions as p', 'p.id', '=', 'u.id_permissions')
            ->join('companys as c', 'c.id', '=', 'u.id_companys')
            ->where('u.id', '=', $user->id)
            ->first();

        $user['permissions'] = $datosUsuario->permissions;
        $user['company'] = $datosUsuario->company;

        $tokenResult = $user->createToken('Personal Access Token');

        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString(),
            'user_data' => $user

        ]);
    }

    /**
     * Cierre de sesión (anular el token)
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Obtener el objeto User como json
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
