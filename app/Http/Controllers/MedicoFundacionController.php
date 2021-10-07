<?php

namespace App\Http\Controllers;
use App\Models\Medicamentos;
use Barryvdh\DomPDF\Facade as PDF;
//use Barryvdh\DomPDF\PDF;
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

    public function medicamentos(Request $request)
    {
        $res = Medicamentos::select("nombre","id")
                ->where("nombre","LIKE","%{$request->term}%")
                ->get();
        return response()->json($res);
    }


    public function storefase4(Request $request)
    {
        DB::table('HistorialMedico')
        ->where('id', $request->input('id'))
        ->limit(1)
        ->update(array(
            'fase' => 5,
            'diagnostico'=>$request->input('diagnostico'),
             'observacion_medica'=>$request->input('observacion')
            ));

        $ids_medicamentos = $request->input('id_medicamentos', []); //extraigo el la cadena separada por comas,  en la posicion 0 del arreglo
        $arrayIdMedicamentos = explode(',',$ids_medicamentos[0]); //lo convierto a array
        $descipcion_medicamentos = $request->input('descripcion_medicamentos', []);
        $arrayDescripcionMedicamentos = explode(',',$descipcion_medicamentos[0]);
        $unidades_medicamentos = $request->input('unidades_medicamentos', []);
        $arrayUnidadesMedicamentos = explode(',',$unidades_medicamentos[0]);
        for ($x = 0; $x < sizeof($arrayIdMedicamentos); $x++) {
        DB::table('MedicamentoPaciente')->insert([
        "id_visitamedica"   => $request->input('id_visitamedica'),
        "id_medicamento"         =>  $arrayIdMedicamentos[$x],
        "instrucciones"         =>  $arrayDescripcionMedicamentos[$x],
        "unidades"         =>  $arrayUnidadesMedicamentos[$x],
        ]);
        }
        return redirect('/MedicoFundacion')->with('success', 'los medicamentos se han asignado corectamente');
    }
    public function ReporteExamenesPacientepdf($id_visitamedica){
        $data = DB::select('exec sp_ReporteExamenesPaciente @id_visitamedica= '.$id_visitamedica);
        $pdf = PDF::loadView('MedicoFundacion.ReporteExamenesPaciente',compact('data'));
        return $pdf->stream('data.pdf');
    }



}
