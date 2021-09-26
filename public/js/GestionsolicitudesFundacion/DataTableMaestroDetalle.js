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
            var result = confirm("¿Esta seguro de cancelar cita medica?");
            if(result){
            var id_cita_medica = $(this).data('id');
            $.get("GestionsolicitudesFundacion/cancelar/"+id_cita_medica)
                table.draw();
            }else{
                return false;
            }
        });

  $('#users-table tbody').on('click', 'button', function() {
      const identificador = table.row($(this).parents('tr')).data(); // getting target row data

      $('.insertHere').html(
        // Adding and structuring the full data
      '<input type="hidden" name="id_interno"  value="'+identificador.id+'" class="form-control" >'
    );
      $.get('/master-data', function (data) {
         $('#userCrudModal').html("Edit category");
         $('#submit').val("Edit category");
         $('#practice_modal').modal('show');
         // $('#color_id').val(data.data.id);
         $('#motivo_visita').val(data.data[0].nombre);
         console.dir(data.data[0].nombre)
     })
    $('#myModal').modal('show'); // calling the bootstrap modal
  });

});

