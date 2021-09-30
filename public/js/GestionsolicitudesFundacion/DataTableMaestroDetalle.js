const childEditors = {};  // Globally track created chid editors
$(document).ready(function() {

  // Generate table ID
  function getTableId(level, uniqueData) {
    // level = child level.
    // uniqueData - unique data value in table.

    return level + '-' + uniqueData.replace(' ', '-'); // Replace sapces with dashes
  }

  // Return table with id generated from row's name field
  function format(rowData, tableId) {
    // rowData - data for the table.
    // tableId - unique table ID for child table.
    // This function just builds the table tag.
    return '<table id="' + tableId + '" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
           '</table>';
  }

  // Main table
  var table = $('#users-table').DataTable( {

            processing: true,
            serverSide: true,
            "language": {
     url: 'dataTables.espaniol.json',
  },
    ajax: '/GestionsolicitudesFundacion',
    pageLength: 8,
            columns : [
                //7 data y le suma 1?
                {data:'DT_RowIndex',name:'DT_RowIndex'},
                {data: "paciente"},
                {data: "motivo_visita"},
                {data: "pre_diagnostico"},
                {data: "psicopatologia"},
                {data: "departamentoespecialidad"},
                {data: 'action', name: 'action', orderable: false, searchable: false},
            ],
    order: [[1, 'asc']],
  });

        $('body').on('click', '.CancelarCita', function (){
            var result = confirm("¿Esta seguro de cancelar el proceso del paciente?");
            if(result){
            var id_cita_medica = $(this).data('id');
            // var id_especialidad = $(this).data('id_especialidad');
            $.get("GestionsolicitudesFundacion/cancelar/"+id_cita_medica)
                table.draw();
            }else{
                return false;
            }
        });

  $('#users-table tbody').on('click', 'button', function() {
      const identificador = table.row($(this).parents('tr')).data();

    //   $('.insertHere').html(
    //   '<input type="text" name="id_interno"  value="'+identificador.id+'" class="form-control" >'
    // );


      $.get('/GestionsolicitudesFundacion/CitasMedicasDisponibles/'+identificador.id_especialidad, function (data) {
         $('#userCrudModal').html("Edit category");
         $('#submit').val("Edit category");
         $('#practice_modal').modal('show');
         $('#id_historial_medico').val(identificador.id);
         $('#id_medico').val(data.data[0].id_medico);
         $('#medico').val(data.data[0].medico);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        if (today == data.data[0].fechacita)
        {
            $('#fechacita').val(data.data[0].fechacita+' (HOY)');
        }
        else
        {
            $('#fechacita').val(data.data[0].fechacita);
        }
          $('#horarionuevacita').val(data.data[0].horarionuevacita.slice(0,5));
     })
    $('#myModal').modal('show'); // calling the bootstrap modal
  });

});

