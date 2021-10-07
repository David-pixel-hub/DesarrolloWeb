$(document).ready(function() {
    $( "#title" ).autocomplete({
        source: function(request, response) {
            $.ajax({
            url: '/MedicoFundacion/medicamentos',
            data: {
                    term : request.term
             },
            dataType: "json",
            success: function(data){
               var resp = $.map(data,function(obj){
                return {
                    label: obj.nombre,
                    value: obj.id
                };
               });
               response(resp);
            }
        });
    },
    select: function (event, ui) {
        $("#title").val(ui.item.label); // display the selected text
        $("#field_id").val(ui.item.value); // save selected id to hidden input
        return false;
    },
    minLength: 2
 });
});
