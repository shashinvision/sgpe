<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Convenio;
use Illuminate\Http\Request;

class ConvenioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($idCompanys = 1)
    {
        /*
        * Si el $idCompanys es mayor a 1 se verán los datos por el id de la compañía.
        * Si el $idCompanys es igual a 1 se verán todos los datos independiente de la compañía.
        */

        $convenios = null;
        if ($idCompanys > 1) {
            $convenios = DB::table('convenios as c')
                ->select('c.id as id', 'c.name_company_convenio as name', 'uc.name as addBy', 'ua.name as passedBy', 'cp.name as company', 's.name as state', 'c.document_path as document', 'c.date_start as dateStart', 'c.date_end as dateEnd')
                ->join("users as uc", 'uc.id', "=", "c.created_by_user_id")
                ->leftJoin("users as ua", 'ua.id', "=", "c.approved_by_user_id")
                ->join('companys as cp', 'cp.id', "=", "c.companys_id")
                ->join('states as s', 's.id', "=", "c.states_id")
                ->where('c.id_companys', $idCompanys)
                ->order('c.id', 'asc')
                ->get();
        } else {
            $convenios = DB::table('convenios as c')
                ->select('c.id as id', 'c.name_company_convenio as name', 'uc.name as addBy', 'ua.name as passedBy', 'cp.name as company', 's.name as state', 'c.document_path as document', 'c.date_start as dateStart', 'c.date_end as dateEnd')
                ->join("users as uc", 'uc.id', "=", "c.created_by_user_id")
                ->leftJoin("users as ua", 'ua.id', "=", "c.approved_by_user_id")
                ->join('companys as cp', 'cp.id', "=", "c.companys_id")
                ->join('states as s', 's.id', "=", "c.states_id")
                ->orderBy('c.id', 'asc')
                ->get();
        }

        return json_encode($convenios);
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
        $data = $request->all();
        if ($request->hasFile('document_path')) {
            $data['document_path'] = $request->file('document_path')->store('public');
        }

        Convenio::create($data);
        return json_encode("Convenio creado con éxito.");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Convenio  $convenio
     * @return \Illuminate\Http\Response
     */
    public function show(Convenio $convenio)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Convenio  $convenio
     * @return \Illuminate\Http\Response
     */
    public function edit(Convenio $convenio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Convenio  $convenio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Convenio $convenio)
    {

        $task = Convenio::findOrFail($id);
        $task->update($request->all(['document_path', 'date_start', 'date_end', 'companys_id']));
        return $task;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Convenio  $convenio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Convenio $convenio)
    {
        //
    }
}
