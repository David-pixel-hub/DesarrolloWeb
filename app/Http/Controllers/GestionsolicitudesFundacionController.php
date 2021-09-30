<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class GestionsolicitudesFundacionController extends Controller
{
    public function index(Request $request)
    {

        if ($request->ajax()) {
            $data = DB::select('exec sp_GestionSolicitudes');
            return Datatables::of($data)
            ->addIndexColumn()
            ->addColumn('action',function($row){
                $btn = '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>';
                $btn = $btn.'<a href="javascript:void(0)" data-toggle="tooltip" data-id="'.$row->id.'" data-original-title="Delete" type="button" data-feather="delete" class="btn btn-default CancelarCita" ><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></a>';
                return $btn;
            })
            ->rawColumns(['action'])->make(true);
        }
        return view('GestionsolicitudesFundacion.index');
    }


    public function cancelarcita($id)
    {
        DB::select('update HistorialMedico set fase = 5 where id = '.$id);
    }

    public function CitasMedicasDisponibles($id)
    {
        $data = DB::select('exec sp_CitaMedicaDisponible @id_especialidad = '.@$id);
        return Datatables::of($data)->make(true);
    }

    public function store(Request $request)
    {
        $fecha = substr($request->input('fechacita'),0,10);
        $submitdate = str_replace("/","-",$fecha);
        $time = strtotime($submitdate);
        $newformat = date('Y-m-d',$time);

        DB::table('VisitaMedica')->insert([
        "fecha"                 => $newformat,
        "id_historial_medico"   => $request->input('id_historial_medico'),
        "id_medico"             => $request->input('id_medico'),
        "horario" => $request->input('horarionuevacita'),
        ]);

        DB::update ('update HistorialMedico set fase = 2, id_medico ='.$request->input('id_medico').'  where id = '.$request->input('id_historial_medico'));
        //TAMBIEN ACTUALIZAR HISTORIAL MEDICO
        return redirect('/GestionsolicitudesFundacion')->with('success', 'Cita creada correctamente');
    }
}
