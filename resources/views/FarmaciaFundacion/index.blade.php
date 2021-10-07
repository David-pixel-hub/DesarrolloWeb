{{--<link rel="stylesheet" href="{{asset('css/DateTableMaestroDetalle.css')}}">--}}
{{--<link href="https://nightly.datatables.net/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />--}}
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
<h1>ENTREGA DE MEDICAMENTOS</h1>
    <br>

<table id="users-table" class="table table-bordered table-hover">
  <thead>
    <tr>
{{--        7 total--}}
{{--        <th>#</th>--}}
		<th>PACIENTE</th>
        <th>MEDICAMENTO</th>
        <th>UNIDADES</th>
        <th>ACCION</th>

    </tr>
  </thead>
  <tfoot>
    <tr>
		<th>PACIENTE</th>
        <th>MEDICAMENTO</th>
        <th>UNIDADES</th>
        <th>ACCION</th>
    </tr>
  </tfoot>
  <tbody>
  </tbody>
</table>
<!-- Modal -->
{{--<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">--}}
{{--        <div class="modal-dialog" role="document">--}}
{{--        <div class="modal-content">--}}
{{--            <div class="modal-header">--}}
{{--            <h5 class="modal-title" id="exampleModalLabel">CONCLUIR ENTREGA</h5>--}}
{{--            </div>--}}
{{--            <form action="{{ url('/LaboratorioFundacion') }}" method="POST">--}}
{{--                {{ csrf_field() }}--}}
{{--            <div class="modal-body">--}}
{{--            <div class="insertHere" ></div>--}}
{{--                      <div class="form-group">--}}
{{--                        <div class="form-check" style="margin-left: 20px">--}}
{{--                          <input class="form-check-input" type="radio" name="resultado" value="0">--}}
{{--                          <label class="form-check-label">--}}
{{--                            NEGATIVO--}}
{{--                          </label>--}}
{{--                        </div>--}}
{{--                        <div class="form-check" STYLE="margin-left: 20px">--}}
{{--                          <input class="form-check-input" type="radio" name="resultado" value="1">--}}
{{--                          <label class="form-check-label">--}}
{{--                            POSITIVO--}}
{{--                          </label>--}}
{{--                        </div>--}}
{{--                      </div>--}}
{{--                    <button type="submit" style="float: right" class="btn btn-primary">Guardar</button>--}}
{{--                <br>--}}

{{--            </div>--}}
{{--        </form>--}}
{{--        </div>--}}
{{--        </div>--}}
{{--    </div>--}}
{{--</div>--}}

@endsection
@push('scripts')
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>

{{--<script src='https://code.jquery.com/jquery-3.5.1.js'></script>--}}
{{--<script src='https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js'></script>--}}

<script src="{{asset('js/FarmaciaFundacion/DataTableData.js')}}"></script>



@endpush

