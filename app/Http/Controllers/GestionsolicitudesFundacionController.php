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
        DB::select('update HistorialMedico set fase = 4 where id = '.$id);
    }
}
