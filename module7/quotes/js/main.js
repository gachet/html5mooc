var t,
  actual;

function select(i) {
  actual = i;

  $('contenido nav a').removeClass('on off').addClass(function(j) {
    return (j === i) ? 'on' : 'off';
  });

  if (galeria.length !== 0) {
    $('#persona').html(galeria[i].persona);
    $('#frase').html(galeria[i].frase);
    $('#foto').attr('src', galeria[i].foto);
  } else {
    $('#persona').html('');
    $('#frase').html('');
    $('#foto').attr('src', '');
  }
  clearTimeout(t);
  t = setTimeout(function() {
    select((i + 1) % galeria.length);
  }, 2000);
}

function select_d(i) {
  if (galeria.length !== 0) {
    $('#persona_d').html(galeria[i].persona);
    $('#frase_d').html(galeria[i].frase);
    $('#foto_d').html(galeria[i].foto);
  } else {
    $('#persona_d').html('');
    $('#frase_d').html('');
    $('#foto_d').attr('');
  }
}

function generar_selector() { // regenera la botonera
  var selector = $('#selector');

  selector.html('');

  galeria.forEach(function(elem, i) {
    selector.append("<li><a onClick='select(" + i + ")'></a></li>");
  });
}

function borrar_selector(indexSelector) {
  var $selector = $('#selector');
  $($selector.find('li')[indexSelector]).remove();

}

$(function() {
  generar_selector();

  $('#arrow_edit').on('click', function() {
    $('#datos').toggleClass('hide');
  });

  $('#editar').on('click', function() {
    clearTimeout(t);

    $('#persona_d').html(galeria[actual].persona);
    $('#frase_d').html(galeria[actual].frase);
    $('#foto_d').html(galeria[actual].foto);
  })

  $('#nuevo').on('click', function() {
    $('#datos').addClass('hide');

    actual = galeria.push({
      persona: $('#persona_d').html(),
      frase: $('#frase_d').html(),
      foto: $('#foto_d').html()
    }) - 1;

    generar_selector();

    select(actual);
  })

  $('#borrar').on('click', function() {

    borrar_selector(actual);
    galeria.splice(actual, 1);

    select(0);
  })

  $('#selector li').on('click', function() {
    select_d($(this).index());
  });

  select(0);
});
