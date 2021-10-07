$(document).ready(function() {
    function submitform() {
        // document.productForm.submit();
        // e.preventDefault();
        $(this).html('guardando..');

        $.ajax({
            data: $('#productForm').serialize(),
            url: "{{ route('product.store') }}",
            type: "POST",
            dataType: 'json',
            success: function (data) {
                // $('#productForm').trigger("reset");
                // $('#ajaxModel').modal('hide');
                location.reload();
            },
            error: function (data) {
                console.log('Error:', data);
                // $('#saveBtn').html('Save Changes');
            }
        });
    };


    $(function () {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        var table = $('.data-table').DataTable({
            "language": {
                url: 'dataTables.espaniol.json',
            },
            ajax: "{{ route('product.index') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex'},
                {data: 'interno', name: 'interno'},
                {data: 'edad', name: 'edad'},
                {data: 'psicopatologia', name: 'psicopatologia'},
                {data: 'encargado', name: 'encargado'},
                {data: 'action', name: 'action', orderable: false, searchable: false},
            ]
        });

        var modalHtml = "";
        $("#ajaxModel").on("hidden.bs.modal", function () {
            //here you can get old html of you modal popup
            $("#ajaxModel").html(modalHtml);// In this, we are adding old html in modal pop for achieving reset trick
        });
        $('#createNewInterno').click(function () {
            $('#saveBtn').val("create-product");
            $('#interno_id').val('');
            $('#productForm').trigger("reset");
            $('#modelHeading').html("Registrar Paciente");
            $('#ajaxModel').on().modal('show');
            modalHtml = $("#ajaxModel").html();
        });

        $('body').on('click', '.editProduct', function () {
            var interno_id = $(this).data('id');
            $.get("{{ route('product.index') }}" + '/' + interno_id + '/edit', function (data) {
                $('#modelHeading').html("Editar Paciente");
                $('#saveBtn').val("edit-user");
                $('#ajaxModel').modal('show');
                // $('#interno_id').val(data.id);
// console.log(data[0].nombre)
                $('#nombre').val(data[0].nombre);
                $('#edad').val(data[0].edad);
                $('#sexo').val(data[0].sexo);
                $('#id_psicopatologia').val(data[0].id_psicopatologia);
                $('#encargado').val(data[0].encargado);
                $('#telefono').val(data[0].telefono);
                $('#correo').val(data[0].correo);
            })
        });


        $('body').on('click', '.deleteProduct', function () {
            var interno_id = $(this).data("id");
            var result = confirm("Are You sure want to delete !");
            if (result) {
                $.ajax({
                    type: "DELETE",
                    url: "{{ route('product.store') }}" + '/' + interno_id,
                    success: function (data) {
                        table.draw();
                    },
                    error: function (data) {
                        console.log('Error:', data);
                    }
                });
            } else {
                return false;
            }
        });
    });
});
