const childEditors = {};  // Globally track created chid editors
$(document).ready(function() {
var groupColumn = 0;
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
        "columnDefs": [
            { "visible": false, "targets": groupColumn }
        ],
        "order": [[ groupColumn, 'asc' ]],
        "displayLength": 25,
        "drawCallback": function ( settings ) {
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;

            api.column(groupColumn, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="group" style="background: #3f75b4; color: white"><td colspan="5">'+group+'</td></tr>'
                    );

                    last = group;
                }
            } );
        },
            processing: true,
            serverSide: true,
            "language": {
     url: 'dataTables.espaniol.json',
  },
    ajax: '/FarmaciaFundacion',
    pageLength: 4,
            columns : [
                {data: "paciente"},
                {data: "medicamento"},
                {data: "unidades"},
                {data: 'action', name: 'action', orderable: false, searchable: false},
            ],
    order: [[1, 'asc']],
  });

        $('body').on('click', '.CancelarCita', function (){

            var id = $(this).data('id');
            $.get("FarmaciaFundacion/realizado/"+id)
            table.draw();
            // var id_especialidad = $(this).data('id_especialidad');

        });

  // $('#users-table tbody').on('click', 'button', function() {
  //     const data = table.row($(this).parents('tr')).data(); // getting target row data
  //   $('.insertHere').html(
	// 		// Adding and structuring the full data
  //     '<input type="hidden" name="id_examen_paciente"  value="'+data.id+'" class="form-control" ><input type="hidden" name="id_visita_medica"  value="'+data.id_visitamedica+'" class="form-control" >'
  //   );
  //   $('#myModal').modal('show'); // calling the bootstrap modal
  // });


});

