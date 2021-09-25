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
            "language": {
     url: 'dataTables.espaniol.json',
  },
    ajax: '/GestionSolicitudesData',
    pageLength: 9,
    columns: [
      {
         className: 'details-control main-table',
         orderable: false,
         data: null,
         defaultContent: "",
      },
        {data: "id"},
        {data: "paciente"},
        {data: "motivo_visita"},
        {data: "pre_diagnostico"},
        {data: "psicopatologia"},
        {data: "departamentoespecialidad"},
         {
			// adding a more info button at the end
      "targets": -1,
      "data": null,
      "defaultContent": "<button type='button' class='btn btn-default'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span></button><a class='btn btn-danger' onclick='return confirm(Are you sure?)' href=''.urlencode(%7B%7Broute%28%27city-delete%27%2C%20%7Bdata%3A%20%22id%22%7D%7D%7D)''><i class='fa fa-trash'></i></a>"
         }],
    order: [[1, 'asc']],
  });



  $('#users-table tbody').on('click', 'button', function() {
      const data = table.row($(this).parents('tr')).data(); // getting target row data
    $('.insertHere').html(
      '<input type="hidden" name="id_interno"  value="'+data.id+'" class="form-control" >'
    );
    $('#myModal').modal('show'); // calling the bootstrap modal
  });

    $('#users-table tbody').on('click', 'a', function() {
              if(!confirm("Are You Sure to delete this"))
      event.preventDefault();
console.log("dentrro")
  });

});

