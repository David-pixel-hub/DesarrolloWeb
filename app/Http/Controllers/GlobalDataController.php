<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class GlobalDataController extends Controller
{
   public function Maestro()
    {
        $data = DB::select( 'select * from VistaInternos');
        return Datatables::of($data)
        ->make(true);
    }
    public function Detalle($id)
    {
        $detalle = DB::select('exec sp_historialmedico @id='.$id);
        return Datatables::of($detalle)->make(true);
    }
    public function GestionSolicitudesData()
    {
        $detalle = DB::select('exec sp_GestionSolicitudes');

         return Datatables::of($detalle)->make(true);

    }
}
