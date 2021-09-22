<link rel="stylesheet" href="{{asset('css/EnfermeroAsilo/DateTableMaestroDetalle.css')}}">
<link href="https://nightly.datatables.net/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
@extends('layouts.layoutGeneral')
@section('content')

<div class="container">

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

    </tr>
  </tfoot>
  <tbody>

  </tbody>
</table>
<!-- Modal -->

<!-- partial -->


</div>

@endsection
@push('scripts')
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
<script src="{{asset('js/EnfermeroAsilo/DataTableMaestroDetalle.js')}}"></script>
@endpush

