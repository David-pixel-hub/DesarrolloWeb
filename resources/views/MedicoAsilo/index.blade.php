<link rel="stylesheet" href="{{asset('css/DateTableMaestroDetalle.css')}}">
<link href="https://nightly.datatables.net/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
@extends('layouts.layoutGeneral')
@section('content')

<div class="container">
    <br>
    <br>

<!-- partial -->
    <div class="container">
        @if (count($errors) >0)
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{$error}}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        @if (\Session::has('success'))
            <div class="alert alert-success">
                <p>{{ \Session::get('success') }}</p>
            </div>
        @endif
    </div>
<!-- partial -->

<!-- partial:index.partial.html -->
<h1>LISTADO DE INTERNOS EN EL ASILO</h1>
    <br>

<table id="users-table" class="table table-striped table-bordered display" cellspacing="0" width="100%">
  <thead>
    <tr>
		<th></th>
		<th>ID</th>
		<th>NOMBRE</th>
		<th>EDAD</th>
		<th>SEXO</th>
		<th>PSICOPATOLOGIA</th>
		<th>ENCARGADO</th>
		<th>TELEFONO</th>
		<th>ACCION</th>

    </tr>
  </thead>
  <tfoot>
    <tr>
		<th></th>
		<th>ID</th>
		<th>NOMBRE</th>
		<th>EDAD</th>
		<th>SEXO</th>
		<th>PSICOPATOLOGIA</th>
		<th>ENCARGADO</th>
		<th>TELEFONO</th>
		<th>ACCION</th>


    </tr>
  </tfoot>
  <tbody>

  </tbody>
</table>
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">REALIZAR SOLICITUD</h5>
            </div>
            <form action="{{ url('/MedicoAsilo') }}" method="POST">
                {{ csrf_field() }}
            <div class="modal-body">
            <div class="insertHere" ></div>
                      <div class="form-group">
                        <label>Motivo de Visita</label>
                        <input type="text" name="motivo_visita" class="form-control" >
                      </div>

                      <div class="form-group">
                        <label>Pre Diagnostico</label>
                        <input type="text" name="prediagnostico" class="form-control" >
                      </div>


                      <div class="form-group">
                          <div class="row">
                          <div class="col-md-6">
                              <label>Remitir a especialidad</label>
                                <select class="form-control " value="id_especialidad_medico" name="id_especialidad_medico">
                                    @foreach( $departamentos as  $departamento )
                                        <option name="id_especialidad_medico" value="{{ $departamento->id }}">{{ $departamento->descripcion}}</option>
                                    @endforeach
                                </select>

                              </div>
                              <div class="col-md-6">
                                <label>Enfermero Acompañante</label>
                                <select class="form-control">
                                    @foreach( $enfermeros as  $enfermero )
                                        <option value="{{ $enfermero->id }}">{{ $enfermero->nombre}}</option>
                                    @endforeach
                                </select>
                              </div>
                              </div>
                      </div>
                    <button type="submit" style="float: right" class="btn btn-primary">Crear Solicitud</button>
                <br>

            </div>
        </form>
        </div>
        </div>
    </div>

</div>

@endsection
@push('scripts')
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
<script src="{{asset('js/MedicoAsilo/DataTableMaestroDetalle.js')}}"></script>
@endpush

