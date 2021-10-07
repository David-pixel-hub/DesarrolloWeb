$(document).ready(function() {

    $('#title').focus();

    var list = {}; //init list object
    var counter = 0; //init counter for id and for undo history
    var historyAction = "";

    var trunc = function(card) { //the function that truncates the content of a card and then stores it in an object -- needs work
        var $p = card.children('.copy');
        var copy = $p.text();
        var divh = card.height();
        var fullcopy = copy;

        while ($p.outerHeight() > (divh - 40)) {
            $p.text(function (index, text) {
                console.log('here');
                return text.replace(/\W*\s(\S)*$/, '...');
            });
        }

        return fullcopy;
    }

    const id_medicamentos =[];
    const descripcion_medicamentos =[];
    const unidades_medicamentos =[];


    $('.add').click(function(){ //logic for adding a card animating it adn truncating the content with an ellipses
        if ($('#title').val() || ($('#copy').val() && $('#title').val() && $('#unidades').val()  )) {
            counter++;
            var temp = {};
            temp.id = counter;
            temp.title = $('#title').val();
            temp.copy = $('#copy').val();
            temp.unidades = $('#unidades').val();

            temp.id_medicamento = $('#field_id').val();
            id_medicamentos.push(temp.id_medicamento);
            descripcion_medicamentos.push(temp.copy);
            unidades_medicamentos.push(temp.unidades);
             $('.insertHere2').html(
                 '<input type="hidden" id="id_medicamentos" name="id_medicamentos[]"  value="' + id_medicamentos + '" class="form-control"><input type="hidden" id="descripcion_medicamentos" name="descripcion_medicamentos[]"  value="' + descripcion_medicamentos + '" class="form-control"><input type="hidden" id="unidades_medicamentos" name="unidades_medicamentos[]"  value="' + unidades_medicamentos + '" class="form-control">',
             );
            $('.containermod').append(
                '<div class="card hidden" id="' + counter + '" data-color="#2980b9">' +
                '<div class="options-toggle">' +
                    '&#x2717;' +
                '</div>' +
                '<p id ="' + temp.unidades + '" class="unidades"></p>' +
                '<p id ="' + temp.id_medicamento+ '" class="title">'+temp.unidades+'      ' + temp.title + '</p>' +
                '<p id ="' + temp.copy + '" class="copy">' + temp.copy + '</p>' +
            '</div>'
            );

            temp.fullcopy = trunc($('.hidden'));
            temp.copy = $('.hidden').children('.copy').text();

            list[counter] = temp;

            $('#title').val('');
            $('#copy').val('');
            $('#unidades').val('');

            $('#title').focus();
            $('.hidden').animate({
                'marginTop': '0'},
                'fast', function() {
                    $(this).removeClass('hidden');
            });
        }
        $('#title').blur();
        $('#copy').blur();
        $('#unidades').blur();
    });

    // $('.undo').click(function(){ //undo last added card
    //     console.log("boton borrar");
    //     if (counter) {
    //         var history = counter;
    //         counter--;
    //
    //         $('.card[data-id=' + history + ']').slideUp('fast', function() {
    //             $('.card[data-id=' + history + ']').remove();
    //         });
    //     }
    // });


    $('.centermod').on('click', '.options-toggle', function(event) {

        let id_delete_medicament = $(this).parent('.card').children().prevObject[0].getElementsByClassName('title')[0].id
        let descripcion_delete_medicament = $(this).parent('.card').children().prevObject[0].getElementsByClassName('copy')[0].id;
        let unidades_delete_medicament = $(this).parent('.card').children().prevObject[0].getElementsByClassName('unidades')[0].id;

      $('#id_medicamentos').remove();


    for( var i = 0; i < id_medicamentos.length; i++){
        if ( id_medicamentos[i] === id_delete_medicament) {
            id_medicamentos.splice(i, 1);
                   $('.insertHere2').html(
                 '<input type="hidden" id="id_medicamentos" name="id_medicamentos[]"  value="' + id_medicamentos + '" class="form-control">',
             );
        }
    }

    for( var x = 0; x < descripcion_medicamentos.length; x++){
        if ( descripcion_medicamentos[x] === descripcion_delete_medicament) {
            descripcion_medicamentos.splice(x, 1);
                   $('.insertHere2').html(
                 '<input type="hidden" id="descripcion_medicamentos" name="descripcion_medicamentos[]"  value="' + descripcion_medicamentos + '" class="form-control">',
             );
        }
    }

    for( var y = 0; y < unidades_medicamentos.length; y++){
        if ( unidades_medicamentos[y] === unidades_delete_medicament) {
            unidades_medicamentos.splice(y, 1);
                   $('.insertHere2').html(
                 '<input type="hidden" id="unidades_medicamentos" name="unidades_medicamentos[]"  value="' + unidades_medicamentos + '" class="form-control">',
             );
        }
    }

        $(this).parent('.card').slideUp('fast', function() {
            $(this).parent('.card').empty();
        });



    });
});
