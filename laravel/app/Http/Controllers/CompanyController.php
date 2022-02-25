<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companys = null;

        $companys = DB::table('companys')
            ->select('id', 'name')
            ->where('id', "<>", "1")
            ->where('state', "=", "1")
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
        $data = $request->all();

        Company::create($data);
        return json_encode("Empresa creado con éxito.");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company)
    {
        $data = $request->all(['name']);
        $respuesta = $company::findOrFail($id);

        // $respuesta->update($request->all(['document_path', 'date_start', 'date_end', 'companys_id']));
        $respuesta->update($data);
        return json_encode("Empresa editado con éxito.");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company, Request $request, $id)
    {
        $data = $request->all(['state']);
        $respuesta = $company::findOrFail($id);
        $respuesta->update($data);
        return json_encode("Empresa eliminada con éxito.");
    }
}
