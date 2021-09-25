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
        return view('MedicoAsilo.index',compact('departamentos','enfermeros'));
    }

    public function store(Request $request)
    {
        $this->validate($request,[
        'id_interno' => 'required',
        'motivo_visita' => 'required',
        'id_especialidad_medico' => 'required',
        'prediagnostico' => 'required',
        ]);

        DB::table('HistorialMedico')->insert([
        "id_interno"             => $request->input('id_interno'),
        "fecha_visita"           => date('Y-m-d H:i:s:n'),
        "motivo_visita"          => $request->input('motivo_visita'),
        "id_especialidad_medico" => $request->input('id_especialidad_medico'),
        "pre_diagnostico"        =>  $request->input('prediagnostico'),
        "id_medico"              => 10,
        "diagnostico"            =>  "NO DISPONIBLE",
        "observacion_medica"     => "NO DISPONIBLE",
        "fase"                   => 1
        ]);
        return redirect('/MedicoAsilo')->with('success', 'Solicitud creada correctamente');
    }
}
