$(document).ready(function() {

  var table = $('#users-table').DataTable({
		// hiding columns via datatable column.visivle API
        "language": {
     url: 'dataTables.espaniol.json',
  },
    "columnDefs": [{
      "targets": [2],
      "visible": false
    }, {
      "targets": [3],
      "visible": false
    }, {
			// adding a more info button at the end
      "targets": -1,
      "data": null,
      "defaultContent": "<button type='button' class='btn btn-default'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span></button>"
    }]
  });

});



