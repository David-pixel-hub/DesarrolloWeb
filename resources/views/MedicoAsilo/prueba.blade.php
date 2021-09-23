<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Document</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>


    {{-- model start here  --}}
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Employee Detail</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <form action="{{ url('/MedicoAsilo') }}" method="POST">
                {{ csrf_field() }}
            <div class="modal-body">

                    <div class="form-group">
                      <label>ID INTERNO</label>
                      <input type="text" name="id_interno" class="form-control" >
                    </div>


                      <div class="form-group">
                        <label>Motivo de Visita</label>
                        <input type="text" name="motivo_visita" class="form-control" >
                      </div>

                      <div class="form-group">
                        <label>Diagnostico</label>
                        <input type="text" name="diagnostico" class="form-control" >
                      </div>

                    <div class="form-group">
                        <label>Observacion Medica</label>
                        <input type="text" name="observacion_medica" class="form-control" >
                      </div>

                      <div class="form-group">
                                <p>Departamento a remitir</p>
                                <select class="form-control input-lg"  name="id_especialidad_medico">
                                    @foreach( $departamentos as  $departamento )
                                        <option value="{{ $departamento->id }}">{{ $departamento->descripcion}}</option>
                                    @endforeach
                                </select>
                      </div>

                    <button type="submit" class="btn btn-primary">Submit</button>

            </div>
        </form>
        </div>
        </div>
    </div>
    {{-- model end here  --}}
    <br><br><br>
    <div class="container">
        <h1>Store Data in Pop-modal in laravel</h1>

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

        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Add Employee
        </button>
    </div>

    {{-- pop model start here  --}}

    <!-- Button trigger modal -->
        {{-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
        </button> --}}

        <!-- Modal -->


    {{-- pop model end here  --}}
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>
