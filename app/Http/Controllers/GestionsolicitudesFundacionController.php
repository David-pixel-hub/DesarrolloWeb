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
                $btn = '<a href="javascript:void(0)" data-toggle="tooltip" data-id="'.$row->id.'" data-original-title="Edit" class="edit btn btn-primary btn-sm editProduct"><i class="fas fa-pen text-white"></i></a>';
                $btn = $btn.' <a href="javascript:void(0)" data-toggle="tooltip" data-id="'.$row->id.'" data-original-title="Delete" class="btn btn-danger btn-sm deleteProduct"><i class="far fa-trash-alt text-white" data-feather="delete"></i></a>';
                return $btn;
            })
            ->rawColumns(['action'])->make(true);
        }
        return view('GestionsolicitudesFundacion.index');
    }


    public function cancelarcita($id)
    {
        $data = DB::select('update HistorialMedico set fase = 4 where id ='.$id);
        return response()->json($data);
    }
}
