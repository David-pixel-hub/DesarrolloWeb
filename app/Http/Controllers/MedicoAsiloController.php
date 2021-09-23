<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class MedicoAsiloController extends Controller
{
    public function index()
    {
        $departamentos = DB::select( 'select * from EspecialidadMedico');
        $enfermeros = DB::select( 'select * from Empleados where id_tipo_empleado = 1');
        return view('MedicoAsilo.union',compact('departamentos','enfermeros'));
    }

    public function store(Request $request)
    {
        $this->validate($request,[
            'id_interno' => 'required',
//            'fecha_visita' => 'required',
            'motivo_visita' => 'required',
            'id_especialidad_medico' => 'required',
//            'id_medico' => 'required',
            'diagnostico' => 'required',
//            'observacion_medica' => 'required',
//            'fase' => 'required',
        ]);

        DB::table('HistorialMedico')->insert([
        "id_interno" => $request->input('id_interno'),
        "fecha_visita" => date('Y-m-d H:i:s:n'),
        "motivo_visita" => $request->input('motivo_visita'),
        "id_especialidad_medico" => $request->input('id_especialidad_medico'),
        "id_medico" => 10,
        "diagnostico" => $request->input('diagnostico'),
        "observacion_medica" => $request->input('observacion_medica'),
        "fase" => 1
        ]);
        return redirect('/MedicoAsilo')->with('success', 'Data saved');
    }

    public function Maestro()
    {
        $data = DB::select( 'select * from VistaInternos');
        return Datatables::of($data)
        ->make(true);
    }

    public function Detalle($id){
    $detalle = DB::select('exec sp_historialmedico @id='.$id);
    return Datatables::of($detalle)->make(true);
    }
}
