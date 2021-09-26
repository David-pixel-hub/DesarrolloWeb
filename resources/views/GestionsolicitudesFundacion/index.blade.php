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
<h1>GESTIONAR CITAS MEDICAS</h1>
    <br>

<table id="users-table" class="table table-striped table-bordered display" cellspacing="0" width="100%">
  <thead>
    <tr>
        <th>#</th>
		<th>PACIENTE</th>
		<th>MOTIVO VISITA</th>
		<th>PRE DIAGNOSTICO</th>
		<th>PSICOPATOLOGIA</th>
		<th>ESPECIALIDAD REMITDA</th>
        <th>ACCIONES</th>

    </tr>
  </thead>
  <tfoot>
    <tr>
        <th>#</th>
		<th>PACIENTE</th>
		<th>MOTIVO VISITA</th>
		<th>PRE DIAGNOSTICO</th>
		<th>PSICOPATOLOGIA</th>
		<th>ESPECIALIDAD REMITDA</th>
        <th>ACCIONES</th>

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
            <h5 class="modal-title" id="exampleModalLabel">CREAR CITA MEDICA</h5>
            </div>
            <form action="{{ url('/MedicoAsilo') }}" method="POST">
                {{ csrf_field() }}
            <div class="modal-body">
            <div class="insertHere" ></div>
                      <div class="form-group">
                        <label>Fecha Asignada</label>
                        <input type="text" name="motivo_visita" id="motivo_visita" class="form-control" >
                      </div>

{{--                      <div class="form-group">--}}
{{--                          <div class="row">--}}
{{--                              <div class="col-md-6">--}}
{{--                                <label>Medico Asignado</label>--}}
{{--                                <select class="form-control">--}}
{{--                                    @foreach( $MedicosEspecializados as  $medico )--}}
{{--                                        <option value="{{ $medico->id }}">{{ $medico->nombre}}</option>--}}
{{--                                    @endforeach--}}
{{--                                </select>--}}
{{--                              </div>--}}
{{--                              </div>--}}
{{--                      </div>--}}
                    <button type="submit" style="float: right" class="btn btn-primary">Crear Cita</button>
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
<script src="{{asset('js/GestionsolicitudesFundacion/DataTableMaestroDetalle.js')}}"></script>




@endpush

