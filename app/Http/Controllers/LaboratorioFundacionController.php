<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Monolog\Handler\IFTTTHandler;
use phpDocumentor\Reflection\Types\Boolean;
use Yajra\DataTables\Facades\DataTables;

class LaboratorioFundacionController extends Controller
{
    public function index(Request $request)
    {

        if ($request->ajax()) {
            $data = DB::select('select ExamenPaciente.id, E.id as id_examen,ExamenPaciente.id_visitamedica, E.nombre from ExamenPaciente join Examenes E on E.id = ExamenPaciente.id_examen  where estado IS NULL');
            return Datatables::of($data)
                ->addIndexColumn()
                ->addColumn('action', function ($row) {
                    $btn = '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>';
                    return $btn;
                })
                ->rawColumns(['action'])->make(true);
        }
        return view('LaboratorioFundacion.index');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'resultado' => 'required|in:1,0'
        ]);

        $data = DB::select('execute sp_RegistrarExamenPacienteYCrearCita ?, ?, ?', [$request->id_examen_paciente, $request->resultado, $request->id_visita_medica]);

        if ($data[0]->correo_encargado == '') {
            return redirect('/LaboratorioFundacion')->with('success', 'El resultado del examen ha sido guardado correctamente');
        }
        else{
        $correo_encargado = $data[0]->correo_encargado;
        $nombre_interno = $data[0]->nombre_interno;
        $nombre_encargado = $data[0]->nombre_encargado;
        $medico = $data[0]->medico;
        $fechacita = $data[0]->fechacita;
        $horarionuevacita = $data[0]->horarionuevacita;

      $data = array('correo_encargado'=>$correo_encargado,'nombre_interno'=>$nombre_interno,'nombre_encargado'=>$nombre_encargado,'medico'=>$medico,'fechacita'=>$fechacita,'horarionuevacita'=>$horarionuevacita);
      Mail::send('LaboratorioFundacion.correo', $data, function($message) use ($correo_encargado, $nombre_encargado) {
         $message->to($correo_encargado, @$nombre_encargado)->subject
            ('CITA MEDICA');
         $message->from('citamedica@nuevavida.com','Asilo Nueva Vida');
      });
//      dd($data);
        return redirect('/LaboratorioFundacion')->with('success', 'El resultado del examen ha sido guardado correctamente, el sistema ha creado la cita medica del paciente');
        }
    }
}
