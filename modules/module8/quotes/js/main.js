var t,
  actual,
  originalGallery = galeria;

function select(i) {
  actual = i;

  $('#selector li a').removeClass('on off').addClass(function(j) {
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

/* Persistent model */
function saveQuotes(quotes) {
  localStorage.setItem('quotes', JSON.stringify(quotes));
  $('#reset').removeClass('disabled');
  $('#reset button').removeAttr('disabled');
}

function getQuotes() {
  if (localStorage.quotes) {
    return JSON.parse(localStorage.quotes);
  } else {
    localStorage.quotes = [];
    return [];
  }
}


$(function() {

  /* Detect old quotes galery */
  var tmpQuotes = getQuotes();
  if (tmpQuotes.length === galeria.length) {
    console.log('The gallery has not changed');
  } else {
    if (tmpQuotes.length > 0 && confirm('Tienes una versión guardada de la galería. ¿Quieres cargarla?')) {
      galeria = tmpQuotes;
    }
    saveQuotes(galeria);
  }

  generar_selector();
  select(0);

  /* Listeners */
  $('#arrow_edit').on('click', function() {
    var state = $('#datos').toggleClass('hide');
    if (state.hasClass('hide')) {
      select(0);
    } else {
      clearTimeout(t);
      select_d(actual);
    }

  });

  $('#guardar').on('click', function() {
    galeria[actual] = {
      persona: $('#persona_d').html(),
      frase: $('#frase_d').html(),
      foto: $('#foto_d').html()
    }
    saveQuotes(galeria);
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
    saveQuotes(galeria);
  })

  $('#borrar').on('click', function() {

    borrar_selector(actual);
    galeria.splice(actual, 1);

    select(0);
    saveQuotes(galeria);
  })

  $('#selector li').on('click', function() {
    clearTimeout(t);
    select_d($(this).index());
  });

  $('#reset').on('click', function() {
    saveQuotes(originalGallery);
    $(this).addClass('disabled');
    $(this).attr('disabled');
  });

});
