<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
    <link href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
    <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
</head>
<body class="bg-light">
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <h4 class="text-center">Laravel 8 Ajax CRUD Tutorial Using Datatable - MyWebTuts.com</h4>
                    </div>
                    <div class="col-md-12 mb-4 text-right">
                        <a class="btn btn-success" href="javascript:void(0)" id="createNewProduct"> <i class="fas fa-plus"></i></a>
                    </div>
                    <div class="col-md-12">
                        <table class="table table-hover table-bordered data-table">
                            <thead class="bg-secondary text-white">
                                <tr>
                                    <th>#</th>
		<th>PACIENTE</th>
		<th>MOTIVO VISITA</th>
		<th>PRE DIAGNOSTICO</th>
		<th>PSICOPATOLOGIA</th>
		<th>ESPECIALIDAD REMITDA</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

<script>
    $(function(){
        $.ajaxSetup({
            headers:{
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        var table = $('.data-table').DataTable({
            processing: true,
            serverSide: true,
            ajax: "{{ route('GestionsolicitudesFundacion') }}",
            columns : [
                {data:'DT_RowIndex',name:'DT_RowIndex'},
        {data: "paciente"},
        {data: "motivo_visita"},
        {data: "pre_diagnostico"},
        {data: "psicopatologia"},
        {data: "departamentoespecialidad"},
                {data: 'action', name: 'action', orderable: false, searchable: false},
            ]
        });


        $('body').on('click', '.deleteProduct', function (){
            // var product_id = $(this).data("id");
            var result = confirm("Are You sure want to delete !");
            if(result){

            var product_id = $(this).data('id');
            $.get("{{ route('GestionsolicitudesFundacion') }}" +'/cancelar/'+product_id)
                table.draw();
            }else{
                return false;
            }
        });
    });
</script>
</html>
