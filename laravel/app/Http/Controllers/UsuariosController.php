<?php

namespace App\Http\Controllers;

use DB;
use App\Models\User;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companys = null;

        $companys = DB::table('users as u')
            ->select('u.id', 'u.name', 'u.email', 'p.name as permissions', 'c.name as company')
            ->join('permissions as p', 'u.id_permissions', '=', 'p.id')
            ->join('companys as c', 'u.id_companys', '=', 'c.id')
            ->where('u.id', "<>", "1")
            ->where('u.state', "=", "1")
            ->get();

        return json_encode($companys);
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
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
            'state' => 'required|integer|size:1'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'state' => $request->state
        ]);
        return json_encode("Empresa creado con éxito.");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, User $user, $id)
    {
        $data = $request->all(['name', 'password']);

        if ($data['password'] != "") {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }


        $respuesta = $user::findOrFail($id);

        // $respuesta->update($request->all(['document_path', 'date_start', 'date_end', 'companys_id']));
        $respuesta->update($data);
        return json_encode("Empresa editado con éxito.");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user, Request $request, $id)
    {
        $data = $request->all(['state']);
        $respuesta = $user::findOrFail($id);
        $respuesta->update($data);
        return json_encode("Empresa eliminada con éxito.");
    }
}
