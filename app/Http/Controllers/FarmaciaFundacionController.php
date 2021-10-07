<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class FarmaciaFundacionController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $data = DB::select('select MedicamentoPaciente.id, I.nombre as paciente, M.nombre as medicamento, MedicamentoPaciente.unidades from MedicamentoPaciente join medicamentos m on m.id = MedicamentoPaciente.id_medicamento join VisitaMedica VM on VM.id = MedicamentoPaciente.id_visitamedica join HistorialMedico HM on HM.id = VM.id_historial_medico join Interno I on I.id = HM.id_interno where MedicamentoPaciente.estado is null');
            return Datatables::of($data)
                ->addIndexColumn()
                ->addColumn('action', function ($row) {
//                    $btn = '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>';
                    $btn = '<a href="javascript:void(0)" data-toggle="tooltip" data-id="' . $row->id . '" data-original-title="Delete" type="button" data-feather="delete" class="btn btn-default CancelarCita" ><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></a>';
                    return $btn;
                })
                ->rawColumns(['action'])->make(true);
        }
        return view('FarmaciaFundacion.index');
    }
public function realizado($id){
    DB::update('update MedicamentoPaciente set estado = 1 where id = '.$id);
}

}
