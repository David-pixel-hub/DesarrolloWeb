<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Examenes</title>
    <style>
        #examenes{
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }
        #examenes td, #examenes th{
            border: 1px solid #171817;
            padding: 8px;
            width: 30px;
            height: 10px;
            line-height: 14px;
        }
        tr {
        height: 50px;
        }
        /*#examenes tr:nth-child(even){*/
        /*    background-color: #80bdff;*/
        /*}*/
        #examenes tr:nth-child(even){
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;

            /*color: #fff;*/
        }
    </style>
</head>
<body>
<table id="examenes">
    <thead>
    <tr>
        <th>#</th>
        <th>EXAMEN</th>
        <th>RESULTADO</th>
        <th>FECHA</th>
        <th>HORA</th>
    </tr>
    </thead>
    <tbody>
    @foreach($data as $examen)
    @if($examen->resultado == 'POSITIVO')
        <tr style="color: #ffffff; background-color: rgba(23,24,23,0.73)">
            <td>{{$loop->iteration}}</td>
            <td>{{$examen->examen}}</td>
            <td>{{$examen->resultado}}</td>
            <td>{{$examen->fecha}}</td>
            <td>{{$examen->hora}}</td>
        </tr>
    @else
        <tr style="background-color: rgba(243,240,240,0.52)">
            <td>{{$loop->iteration}}</td>
            <td>{{$examen->examen}}</td>
            <td>{{$examen->resultado}}</td>
            <td>{{$examen->fecha}}</td>
            <td>{{$examen->hora}}</td>
        </tr>
    @endif
    @endforeach
    </tbody>
</table>
</body>
</html>
