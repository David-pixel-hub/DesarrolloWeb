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
    ajax: '/MedicoFundacion',
    pageLength: 10,
    columns: [
      {
         className: 'details-control main-table',
         orderable: false,
         data: null,
         defaultContent: "",
      },
        {data:'DT_RowIndex',name:'DT_RowIndex'},
        {data: "paciente"},
        {data: "psicopatologia"},
        {data: "motivo_visita"},
        {data: "pre_diagnostico"},
        {data: "fase"},
        {data: "horario"},
        {data: 'action', name: 'action', orderable: false, searchable: false},
    ],
    order: [[1, 'asc']],
  });


        $('body').on('click', '.CancelarCita', function (){
            var result = confirm("¿Esta seguro de cancelar el proceso del paciente?");
            var fase = getTableId("1", rowData.fase);

            if(result){

            var id_cita_medica = $(this).data('id');
            $.get("MedicoFundacion/cancelar/"+id_cita_medica)
                table.draw();
            }else{
                return false;
            }
        });
  // Add event listener for for main talbe to open and close first level child details
  $('#users-table tbody').on('click', 'td.main-table', function () {
      const tr = $(this).closest('tr');
      const row = table.row(tr);
      const rowData = row.data();
     if ( row.child.isShown() ) {
       // This row is already open - close it
       row.child.hide();
       tr.removeClass('shown');
       $('#' + rowData.paciente.replace(' ', '-')).DataTable().destroy();
     }
     else {
       var id = getTableId("1", rowData.paciente);
       row.child(format(rowData, id)).show();

       $('#' + id).DataTable({
          dom: "t",
          ajax: '/details-data/'+rowData.id_interno,
           // data: [rowData],
          columns: [
            {
               className: 'details-control child-table',
               title: '',
               orderable: false,
               data: null,
               defaultContent: ''
            },
                { data: "fecha_visita", title: 'Fecha visita' },
                { data: "motivo_visita", title: 'Motivo visita' },
                { data: "deparatamento", title: 'Especialidad' },
                { data: "nombre", title: 'Medico' },
                { data: "diagnostico", title: 'Diagnostico' },
                { data: "observacion_medica", title: 'Observacion' },
          ],
          scrollY: '100px',
          select: true,
       });

       tr.addClass('shown');
    }
  });

  $('#users-table tbody').on('click', 'button', function() {
      const data = table.row($(this).parents('tr')).data(); // getting target row data

    if (data.fase === 'Primera Visita') {
    $('.insertHere').html(
        '<input type="hidden" name="id"  value="' + data.id + '" class="form-control" ><input type="hidden" name="id_interno"  value="' + data.id_interno + '" class="form-control" ><input type="hidden" name="id_visitamedica"  value="' + data.id_visitamedica + '" class="form-control" >',
    );
    $('#modalfase2').modal('show'); // calling the bootstrap modal
}
else{
    $link = "http://nuevavida.test/MedicoFundacion/ReporteExamenesPacientepdf/"+data.id_visitamedica
    $('.insertHere4').html(
         '<input type="button" value="Resultados Examenes" onclick="window.open($link)">',
    );
    $('.insertHere3').html(
         '<input type="hidden" name="id"  value="' + data.id + '" class="form-control" ><input type="hidden" name="id_interno"  value="' + data.id_interno + '" class="form-control" ><input type="hidden" name="id_visitamedica"  value="' + data.id_visitamedica + '" class="form-control" >',
    );
    $('#modalfase4').modal('show'); // calling the bootstrap modal
}

  });


});

