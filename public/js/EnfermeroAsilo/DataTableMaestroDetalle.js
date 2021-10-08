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
    ajax: '/master-data',
    pageLength: 8,
    columns: [
      {
         className: 'details-control main-table',
         orderable: false,
         data: null,
         defaultContent: ''
      },
        {data: "id"},
        {data: "nombre"},
        {data: "edad"},
        {data: "sexo"},
        {data: "psicopatologia"},
        {data: "encargado"},
        {data: "telefono"}
    ],
    order: [[1, 'asc']],
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

       // Destroy the Child Datatable
       $('#' + rowData.nombre.replace(' ', '-')).DataTable().destroy();
     }
     else {

       var id = getTableId("1", rowData.nombre);

       // Open this row
       row.child(format(rowData, id)).show();
        console.log(rowData.id)
       $('#' + id).DataTable({
          dom: "t",
          ajax: '/details-data/'+rowData.id,
           // data: [rowData],
          columns: [
                { data: "fecha_visita", title: 'Fecha visita' },
                { data: "motivo_visita", title: 'Motivo visita' },
                { data: "deparatamento", title: 'Especialidad' },
                { data: "nombre", title: 'Medico' },
                { data: "diagnostico", title: 'Diagnostico' },
                { data: "observacion_medica", title: 'Observacion' },
          ],
          // scrollY: '200px',
          // select: true,
       });

       tr.addClass('shown');
    }
  });



});
