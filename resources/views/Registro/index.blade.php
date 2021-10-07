{{--<link rel="stylesheet" href="{{asset('css/DateTableMaestroDetalle.css')}}">--}}
{{--    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>--}}
{{--<link rel='stylesheet' href='https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css'>--}}

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
    <link href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">


<link  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"  rel="stylesheet"/>
<link  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"  rel="stylesheet"/>
<link   href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.css"   rel="stylesheet"/>

@extends('layouts.layoutGeneral')
@section('content')
<div class="container">
    <br>
    <br>
                    <div class="col-md-12 mb-4 text-right">
                        <a class="btn btn-success" href="javascript:void(0)" id="createNewInterno"> <i class="fas fa-plus"></i></a>
                    </div>
                    <div class="col-md-12">
                        <table class="table table-hover table-bordered data-table">
                            <thead class="bg-primary text-white ">
                                <tr>
                                    <th>#</th>
                                    <th>Paciente</th>
                                    <th>Edad</th>
                                    <th>Psicopatologia</th>
                                    <th>Encargado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
    <div class="modal fade" id="ajaxModel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modelHeading"></h4>
                </div>
                <div class="modal-body">
{{--                    <form id="productForm" name="productForm" class="form-horizontal needs-validation" novalidate>--}}
<form action="javascript: submitform()" id="productForm"  name="productForm" class="row g-4 needs-validation" novalidate>

   <div class="col-md-12">
      <label for="nombre" class="form-label">Paciente</label>
      <input type="text" class="form-control" id="nombre" name="nombre" required>
      <div class="valid-feedback">
         El nombre del paciente es correcto!
      </div>
      <div class="invalid-feedback">
         por favor ingrese el nombre del paciente!
      </div>
   </div>
    <br>
    <div class="col-md-12">
      <label for="edad" class="form-label">Edad</label>
      <input type="number" class="form-control" id="edad" name="edad" value="" maxlength="3" required>
      <div class="valid-feedback">
         La edad del paciente es correcta!
      </div>
      <div class="invalid-feedback">
         por favor ingrese la edad del paciente!
      </div>
   </div>
    <br>
    <div class="col-md-12">
      <label for="sexo" class="form-label">Sexo</label>
                                <select class="form-select" name="sexo" id="sexo" required>
                                     <option value="" selected>Por favor seleccione</option>
                                        <option  value="1">Masculino</option>
                                        <option  value="0">Femenino</option>
                                </select>
      <div class="valid-feedback">
         el campo sexo es correcto!
      </div>
      <div class="invalid-feedback">
         por favor ingrese el sexo del paciente!
      </div>
   </div>
    <br>
    <div class="col-md-12">
      <label for="psicopatologia" class="form-label">Psicopatologia</label>
                                <select class="form-select" name="id_psicopatologia" id="id_psicopatologia">
                                    <option value="4" selected>NINGUNA</option>
                                    @foreach( $psicopatologia as  $psico )
                                        <option  value="{{ $psico->id }}">{{ $psico->descripcion}}</option>
                                    @endforeach
                                </select>
      <div class="valid-feedback">
         la psicopatologia del paciente es correcta!
      </div>
   </div>
    <br>
    <div class="col-md-12">
      <label for="price" class="form-label">Encargado</label>
      <input type="text" class="form-control" id="encargado" name="encargado" value="" maxlength="50" required>
      <div class="valid-feedback">
         el campo encargado es correcto!
      </div>
      <div class="invalid-feedback">
         por favor ingrese el encargado del paciente!
      </div>
   </div>
    <br>
    <div class="col-md-12">
      <label for="telefono" class="form-label">Telefono</label>
      <input type="text" class="form-control" id="telefono" name="telefono" value="" maxlength="8" required>
      <div class="valid-feedback">
         el campo telefono es correcto!
      </div>
      <div class="invalid-feedback">
         por favor ingrese el numero de telefono encargado del paciente!
      </div>
   </div>

    <br>
    <div class="col-md-12">
      <label for="correo" class="form-label">Correo</label>
      <input type="email" class="form-control" id="correo" name="correo" value="" maxlength="50" required>
      <div class="valid-feedback">
         el campo correo electronico es correcto!
      </div>
      <div class="invalid-feedback">
         por favor ingrese el correo electronico del encargado del paciente!
      </div>
   </div>




   <div class="col-12">
{{--      <button class="btn btn-primary" type="submit">Guardar</button>--}}
 <button type="submit" class="btn btn-primary" id="saveBtn" value="create">Save changes</button>
   </div>

</form>
                </div>
            </div>
        </div>
    </div>

</div>
@endsection
@push('scripts')

<script>
        function submitform() {
            // document.productForm.submit();
            // e.preventDefault();
            $(this).html('guardando..');

            $.ajax({
                data: $('#productForm').serialize(),
                url: "{{ route('product.store') }}",
                type: "POST",
                dataType: 'json',
                success: function (data) {
                    // $('#productForm').trigger("reset");
                    // $('#ajaxModel').modal('hide');
                    location.reload();
                },
                error: function (data) {
                    console.log('Error:', data);
                    // $('#saveBtn').html('Save Changes');
                }
            });
        };


    $(function(){
        $.ajaxSetup({
            headers:{
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        var table = $('.data-table').DataTable({
            processing: true,
            serverSide: true,
            "language": {
            url: 'dataTables.espaniol.json',
            },
            ajax: "{{ route('product.index') }}",
            columns : [
                {data:'DT_RowIndex',name:'DT_RowIndex'},
                {data:'interno',name:'interno'},
                {data:'edad',name:'edad'},
                {data:'psicopatologia',name:'psicopatologia'},
                {data:'encargado',name:'encargado'},
                {data: 'action', name: 'action', orderable: false, searchable: false},
            ]
        });

        let modalHtml = "";
        $("#ajaxModel").on("hidden.bs.modal", function () {
    //here you can get old html of you modal popup
    $("#ajaxModel").html(modalHtml);// In this, we are adding old html in modal pop for achieving reset trick
});
        $('#createNewInterno').click(function () {
            $('#saveBtn').val("create-product");
            $('#interno_id').val('');
            $('#productForm').trigger("reset");
            $('#modelHeading').html("Registrar Paciente");
            $('#ajaxModel').on() .modal('show');
            modalHtml = $("#ajaxModel").html();
        });

        $('body').on('click', '.editProduct', function () {

            var interno_id = $(this).data('id');
            $.get("{{ route('product.index') }}" +'/' + interno_id +'/edit', function (data) {
            $('#modelHeading').html("Editar Paciente");
            $('#saveBtn').val("edit-user");
            $('#ajaxModel').modal('show');
            // modalHtml = $("#ajaxModel").html();
            // $('#interno_id').val(data.id);
// console.log(data[0].nombre)
            $('#nombre').val(data[0].nombre);
            $('#edad').val(data[0].edad);
            $('#sexo').val(data[0].sexo);
            $('#id_psicopatologia').val(data[0].id_psicopatologia);
            $('#encargado').val(data[0].encargado);
            $('#telefono').val(data[0].telefono);
            $('#correo').val(data[0].correo);

            })
        });



        $('body').on('click', '.deleteProduct', function (){
            var interno_id = $(this).data("id");
            var result = confirm("Are You sure want to delete !");
            if(result){
                $.ajax({
                    type: "DELETE",
                    url: "{{ route('product.store') }}"+'/'+interno_id,
                    success: function (data) {
                        table.draw();
                    },
                    error: function (data) {
                        console.log('Error:', data);
                    }
                });
            }else{
                return false;
            }
        });
    });
</script>
<script src="{{asset('js/Registro/validacion.js')}}"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
    <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
@endpush
