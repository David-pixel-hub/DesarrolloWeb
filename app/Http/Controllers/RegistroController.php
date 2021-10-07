<?php
namespace App\Http\Controllers;
use App\Models\Medicamentos;
use Barryvdh\DomPDF\Facade as PDF;
//use Barryvdh\DomPDF\PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;
class RegistroController extends Controller
{

    public function index(Request $request)
    {
        if ($request->ajax()) {
            $data = DB::select('select interno.id, interno.nombre as interno, interno.edad, interno.sexo, P.nombre as psicopatologia, interno.encargado, interno.telefono, interno.correo, interno.estado from Interno
            join Psicopatologia P on P.id = Interno.id_psicopatologia
            where estado = 1');
            return Datatables::of($data)
            ->addIndexColumn()
            ->addColumn('action',function($row){
                $btn = '<a href="javascript:void(0)" data-toggle="tooltip" data-id="'.$row->id.'" data-original-title="Edit" class="edit btn btn-primary btn-sm editProduct"><i class="fas fa-pen text-white"></i></a>';
                $btn = $btn.' <a href="javascript:void(0)" data-toggle="tooltip" data-id="'.$row->id.'" data-original-title="Delete" class="btn btn-danger btn-sm deleteProduct"><i class="far fa-trash-alt text-white" data-feather="delete"></i></a>';
                return $btn;
            })
            ->rawColumns(['action'])->make(true);
        }
        $psicopatologia = DB::select('select * from Psicopatologia where  id != 4');
        return view('Registro.index',compact('psicopatologia'));
    }

    public function store(Request $request)
    {
//        dd($request->all());
        $input = $request->all();
//        Product::updateOrCreate($input);
        DB::table('Interno')->insert($input);

        return response()->json(['success'=>'Paciente creado correctamente.']);
    }

    public function edit($id)
    {
        $interno = DB::select ('select * from Interno where id = '.$id);
        return response()->json($interno);
    }

    public function destroy($id)
    {
        DB::update ('update Interno set estado = 0 where id = '.$id);

        return response()->json(['success'=>'Paciente eliminado exitosamente.']);
    }
}
