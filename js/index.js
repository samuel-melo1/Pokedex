$(document).ready(function () {
    $.ajax({
        beforeSend: function () {
            $('#loading').show();
        },
        complete: function () {
            $('#loading').hide();
        }
    });

    var url = 'https://pokeapi.co/api/v2/pokemon/';
    callService(url);

    $(window).dblclick(function () {
        callService($('#next-url').val());
    });

    $(document).on('click', '.imagem-pokemon', function () {
        $('#loading').show();

        var nomePokemon = $(this).parent().parent().find('.titulo').text();
        $('#modal-title').text(nomePokemon);

        setTimeout(function () {
            $('#loading').hide();
            $('#modal-detalhes').modal('show')
        }, 5000);


    });

});

function callService(url) {
    $.ajax({
        url: url,
        async: true
    })
        .done(function (response) {
            var results = response.results;
            $('#next-url').val(response.next);
            results.forEach(function (result) {
                //chamada para url de detalhe de cada retorno
                $.get(result.url, {}).done(function (response) {
                    createCard(response).appendTo('#elemento');
                });
            });
        });
}

function createCard(item) {

    var html =
        $('<div>').attr('class', 'col-md-4')
            .append(
                $('<div>').attr('class', 'bloco-principal')
                    .append(
                        $('<div>').attr('class', 'label-titulo-bloco')
                            .append(
                                $('<label>').attr('class', 'titulo').text(item.name)
                            )
                            .append(
                                $('<div>').attr('class', 'div-imagem-pokemon')
                                    .append(
                                        $('<img>').attr('class', 'imagem-pokemon').attr('src', item.sprites.other.dream_world.front_default)
                                    )
                            )
                            .append(
                                $('<div>').attr('class', 'container')
                                    .append(
                                        $('<div>').attr('class', 'row')
                                            .append(
                                                $('<div>').attr('class', 'col-md-6 col-sm-12').text('Informação 1')
                                            )
                                            .append(
                                                $('<div>').attr('class', 'col-md-6 col-sm-12').text('Informação 2')
                                            )
                                    )
                            )
                    )
            );
    return html;
}

function handlerClickImg() {
    alert('teste');
}