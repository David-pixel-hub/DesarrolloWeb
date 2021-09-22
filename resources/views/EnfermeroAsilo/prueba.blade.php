<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
    <link href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
    <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
<link rel="stylesheet" href="{{asset('css/EnfermeroAsilo/DateTableMaestroDetalle.css')}}">
{{--        <title>DataTables</title>--}}
    </head>
    <body>
        <div class="container">
{{--            <table id="users-table" class="table">--}}
<table id="users-table" class="display nowrap" width="100%">
{{--<table id="users-table" class="table table-striped table-bordered display" cellspacing="0" width="100%">--}}
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
            </table>


        </div>

{{--    <script id="details-template" type="text/x-handlebars-template">--}}
{{--        <div class="label label-info">User's Posts</div>--}}
{{--        <table class="table details-table" id="posts-0">--}}
{{--            <thead>--}}
{{--            <tr>--}}
{{--                <th>Id</th>--}}
{{--                <th>Title</th>--}}
{{--            </tr>--}}
{{--            </thead>--}}
{{--        </table>--}}
{{--    </script>--}}



        <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
        <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
<script src="{{asset('js/EnfermeroAsilo/DataTableMaestroDetalle.js')}}"></script>
    </body>
</html>
