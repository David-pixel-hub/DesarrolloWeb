<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class EnfermeroAsiloController extends Controller
{
    public function index()
    {
                return view('EnfermeroAsilo.index');
    }

    public function Maestro()
    {
        $data = DB::select( 'select * from VistaInternos');
        return Datatables::of($data)
        ->addColumn('details_url', function($user) {
            return url('eloquent/details-data/' . $user->id);
        })
        ->make(true);


    }

    public function Detalle($id){
    $detalle = DB::select('exec sp_historialmedico @id='.$id);
    return Datatables::of($detalle)->make(true);
    }


}
