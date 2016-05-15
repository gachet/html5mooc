  var $ioNumber,
    $clearButton,
    lastNumber = 0,
    currentOp = '',
    lastOp = null;

  $(document).ready(function() {
    console.log("ready!");
    $ioNumber = $('#io_number');
    $ioNumber.on('input', detectCSV);
    $clearButton = $('#clear');
    $clearButton.on('click', clear);
    var $numbers = $('.number');
    $numbers.on('click', print);
    var $operations = $('[data-operation]');
    $operations.on('click', calc);
    getDate();
  });

  function process(operation) {
    try {
      lastNumber = eval(currentOp);
      $ioNumber.val(currentOp = lastNumber);
    } catch (e) {
      console.log('Operation not allow');
    } finally {
      console.log('lastNumber', lastNumber);
      console.log('currentOp', currentOp);
    }
  }

  function detectCSV(event) {
    var value = event.target.value;
    if (value.includes(',')) {
      currentOp = value;
      console.log('currentOp', currentOp);
    }
  }

  function calc(event) {
    var result;
    var operation = event.target.dataset.operation;
    if (operation === '=') {
      process(currentOp);
      print(event);
      return;
    }
    var isUnitOp = event.target.dataset.hasOwnProperty('unit');
    if (isUnitOp) {
      if (parseInt(currentOp)) {
        lastNumber = currentOp;
      }
      operation = operation.replace('x', lastNumber);
    } else if (operation.includes('y')) {
      operation = operation.replace('x', lastNumber);
    } else {
      operation = currentOp + operation;
    }
    currentOp = operation;
    process(currentOp);
  }

  function print(event) {
    var value = event.target.dataset.value;
    lastNumber = parseInt(value);

    if (isNaN(lastNumber)) {
      if (('' + currentOp).includes('.') || currentOp === '' || value === '=') {
        return false;
      }
      currentOp += '.';
    } else if (('' + currentOp).includes('y')) {
      currentOp = currentOp.replace('y', lastNumber);
      process(currentOp);
    } else if (/\+|\-|\*|\/|\./.test(currentOp)) {
      currentOp += lastNumber;
    } else {
      currentOp = currentOp + lastNumber;
      lastNumber = currentOp;
    }
    console.log(currentOp);
    $ioNumber.val(currentOp);
  }

  function clear() {
    lastNumber = 0;
    currentOp = '';
    $ioNumber.val(0);
  }

  function factorial(inputNum) {
    return inputNum <= 1 ? 1 : (inputNum * factorial(inputNum - 1));
  }

  function iterator(operator, args) {
    var value = operator === '*' ? 1 : 0;
    for (var i = 0; i < args.length; i++) {
      value = eval(value + operator + args[i]);
    }
    return value;
  }

  function sum() {
    return iterator.call(this, '+', arguments);
  }

  function prod() {
    return iterator.call(this, '*', arguments);
  }

  function getDate() {
    var msj;
    var fecha = new Date();
    if (fecha.getHours() < 7) {
      msj = "Buenas noches";
    } else if (fecha.getHours() < 12) {
      msj = "Buenos días";
    } else if (fecha.getHours() < 21) {
      msj = "Buenas tardes";
    } else {
      msj = "Buenas noches";
    }
    $('#greetings').html(msj);
  }
