<link rel="stylesheet" href="{{asset('css/MedicoFundacion/style.css')}}">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>

<link rel="stylesheet" href="{{asset('css/DateTableMaestroDetalle.css')}}">
<link href="https://nightly.datatables.net/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">


  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">


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
		<th>HORARIO</th>
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
		<th>HORARIO</th>
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
            <form action="{{ url('/MedicoFundacionFase2') }}" method="POST">
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

    <!-- Modal1 -->
<div class="modal fade" id="modalfase4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">

{{--            <h5 class="modal-title" id="exampleModalLabel">REALIZAR DIAGNOSTICO</h5>--}}
{{--                <div class="insertHere4"></div>--}}



<div classname="panel-heading">
<h4 classname="panel-title headingText" style="float:left " id="exampleModalLabel">REALIZAR DIAGNOSTICO</h4>
{{--<button type="button" style="float:right;padding:10px" classname="btn btn-info btn-sml pull-right" data-toggle="modal" data-target="#newListModal">New List</button>--}}
<div class="insertHere4" style="float:right;padding:10px" classname="btn btn-info btn-sml pull-right" data-toggle="modal" data-target="#newListModal"></div>
</div>


{{--                <input type="button" value="Open Window" onclick="window.open('http://nuevavida.test/MedicoFundacion/ReporteExamenesPacientepdf')">--}}
            </div>
            <form action="{{ url('/MedicoFundacionFase4') }}" method="POST">
            {{ csrf_field() }}
            <div class="modal-body">
            <div class="insertHere3" ></div>
            <div class="insertHere2" ></div>
                      <div class="form-group">
                        <label>Diagnostico</label>
                        <input type="text" id="diagnostico" name="diagnostico" class="form-control" >
                      </div>
                    <div class="centermod">
                        <div class="containermod">
                          <div class="row">
                          <div class="col-md-10">
                            <label>Receta Medica</label>
                            <input type="hidden" id="field_id" name="field_id" class="form-control">
                            <input type="text" id="title" name="title" class="form-control">
                              </div>
                              <div class="col-md-2">
                                <label>unidades</label>
                                <input type="number" id="unidades" name="unidades" class="form-control" >
                              </div>
                              </div>

                            <br>
                            <textarea class="copy-input form-control" placeholder="modo de empleo" id="copy"></textarea><br>
                            <div class="add">Agregar</div>
                            <hr>
                        </div>
                    </div>
<!-- partial -->
                    <div class="form-group">
                        <label>Observacion</label>
                        <input type="text" name="observacion" id="observacion" class="form-control" >
                    </div>

                    <button type="submit" style="float: right" class="btn btn-primary">Guardar</button>
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
<script src="{{asset('js/MedicoFundacion/lista.js')}}"></script>

<script src="{{asset('js/MedicoFundacion/BusquedaMedicamentos.js')}}"></script>
{{--  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>--}}
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
@endpush

