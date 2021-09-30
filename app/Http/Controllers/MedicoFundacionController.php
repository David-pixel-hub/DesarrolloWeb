<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class MedicoFundacionController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {

            $data = DB::select('exec sp_PacientesReferidosMedicoFundacion @id_usuario= '.Auth::id());
            return Datatables::of($data)
            ->addIndexColumn()
            ->addColumn('action',function($row){
                $btn = '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>';
                $btn = $btn.'<a href="javascript:void(0)" data-toggle="tooltip" data-id="'.$row->id.'" data-original-title="Delete" type="button" data-feather="delete" class="btn btn-default CancelarCita" ><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></a>';
                return $btn;
            })
            ->rawColumns(['action'])->make(true);
        }
        $examenes = DB::select('select * from Examenes');
        return view('MedicoFundacion.index',compact('examenes'));
    }
    public function cancelarcita($id)
    {
        DB::select ('update HistorialMedico set fase = 5 where id = '.$id);
    }

    public function storefase2(Request $request)
    {
        DB::update ('update HistorialMedico set fase = 3 where id = '.$request->input('id'));
        for ($x = 0; $x < sizeof($request->input('examen')); $x++) {
        DB::table('ExamenPaciente')->insert([
        "id_visitamedica"   => $request->input('id_visitamedica'),
        "id_examen"         =>  $request['examen'][$x]
        //"resultado"         => $request->input('id_visitamedica'),
        //"fecha_examen"      => $request->input('id_visitamedica'),
        //"precio"            => $request->input('id_visitamedica'),
        //"estado"             => $request->input('id_visitamedica'),
        ]);
    }
        return redirect('/MedicoFundacion')->with('success', 'los examenes se han asignado corectamente');
    }



}
