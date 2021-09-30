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
<h1>PACIENTES REFERIDOS</h1>
    <br>
<table id="users-table" class="table table-striped table-bordered display" cellspacing="0" width="100%">
  <thead>
    <tr>
		<th></th>
		<th>#</th>
		<th>PACIENTE</th>
		<th>PSICOPATOLOGIA</th>
		<th>MOTIVO VISITA</th>
		<th>PRE DIAGNOSTICO</th>
		<th>ESTADO</th>
        <th>ACCIONES</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
		<th></th>

		<th>#</th>
		<th>PACIENTE</th>
		<th>PSICOPATOLOGIA</th>
		<th>MOTIVO VISITA</th>
		<th>PRE DIAGNOSTICO</th>
		<th>ESTADO</th>
        <th>ACCIONES</th>
    </tr>
  </tfoot>
  <tbody>
  </tbody>
</table>

<!-- Modal -->
<div class="modal fade" id="modalfase2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">EXAMENES A REALIZAR</h5>
            </div>
            <form action="{{ url('/MedicoFundacion') }}" method="POST">
                {{ csrf_field() }}
            <div class="modal-body">
            <div class="insertHere" ></div>
                      <div class="form-group">
                          <div class="row">
                          <div class="col-md-12">
                              <label>CATEGORIA</label>
                                <select class="form-control" disabled="true" value="categoria_examen" name="categoria_examen">
                                        <option  name="id_categoria_examen">EXAMENES BASICOS</option>
                                </select>
                              </div>
                          </div>
                          <br>
                          @foreach( $examenes as  $examen )
                          <label><input type="checkbox" name="examen[]" value="{{ $examen->id }}">   {{ $examen->nombre}}</label>
                          @endforeach
                          <br>
                      </div>
                    <button type="submit" style="float: right" class="btn btn-primary">Crear</button>
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
<script src="{{asset('js/MedicoFundacion/tabla.js')}}"></script>

{{--<script src="{{asset('js/GestionsolicitudesFundacion/DataTableMaestroDetalle.js')}}"></script>--}}
@endpush

