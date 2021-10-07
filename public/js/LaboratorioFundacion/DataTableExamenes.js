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
    ajax: '/LaboratorioFundacion',
    pageLength: 3,
            columns : [
                //7 data y le suma 1?
                {data:'DT_RowIndex',name:'DT_RowIndex',width: '50px'},
                {data: "nombre"},
                {data: 'action', name: 'action', orderable: false, searchable: false,width: '50px'},
            ],
    order: [[1, 'asc']],
  });

        // $('body').on('click', '.CancelarCita', function (){
        //     var result = confirm("¿Esta seguro de cancelar el proceso del paciente?");
        //     if(result){
        //     var id_cita_medica = $(this).data('id');
        //     // var id_especialidad = $(this).data('id_especialidad');
        //     $.get("GestionsolicitudesFundacion/cancelar/"+id_cita_medica)
        //         table.draw();
        //     }else{
        //         return false;
        //     }
        // });
  $('#users-table tbody').on('click', 'button', function() {
      const data = table.row($(this).parents('tr')).data(); // getting target row data
    $('.insertHere').html(
			// Adding and structuring the full data
      '<input type="hidden" name="id_examen_paciente"  value="'+data.id+'" class="form-control" ><input type="hidden" name="id_visita_medica"  value="'+data.id_visitamedica+'" class="form-control" >'
    );
    $('#myModal').modal('show'); // calling the bootstrap modal
  });


});

