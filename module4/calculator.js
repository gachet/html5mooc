  var ioNumber,
    lastNumber = 0,
    currentOp = '',
    lastOp = null;

  function process(operation) {
    try {
      lastNumber = eval(currentOp);
      ioNumber.value = currentOp = lastNumber;
    } catch (e) {
      console.log('Operation not allow');
    } finally {
      console.log('lastNumber', lastNumber);
      console.log('currentOp', currentOp);
    }
  }

  function calc(event) {
    var result;
    var operation = event.target.dataset.operation;
    var isUnitOp = event.target.dataset.hasOwnProperty('unit');
    if (isUnitOp) {
      operation = operation.replace('x', lastNumber);
    } else if (operation.includes('y')) {
      operation = operation.replace('x', lastNumber);
    } else {
      operation = lastNumber + operation;
    }
    currentOp = operation;
    process(currentOp);

  }

  var ioNumber, clearButton;

  function inic() {
    ioNumber = document.getElementById('io_number');
    clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', clear);

    var numbers = document.querySelectorAll('.number');
    for (var i = 0; i < numbers.length; i++) {
      numbers[i].addEventListener('click', print, false);
    }
    var operations = document.querySelectorAll('[data-operation]');
    for (var i = 0; i < operations.length; i++) {
      operations[i].addEventListener('click', calc, false);
    }

    getDate();
  }

  function print(event) {
    lastNumber = parseInt(event.target.dataset.value);
    currentOp = '' + currentOp;
    if (isNaN(lastNumber)) {
      if (currentOp.includes('.')) {
        return false;
      }
      currentOp += '.';
    } else if (currentOp.includes('y')) {
      currentOp = currentOp.replace('y', lastNumber);
      process(currentOp);
    } else if (/\+|\-|\*|\/|\./.test(currentOp)) {
      currentOp += lastNumber;
      process(currentOp);
    } else {
      currentOp = '' + lastNumber;
    }
    console.log(currentOp);
    ioNumber.value = currentOp;
  }

  function clear() {
    lastNumber = 0;
    currentOp = '';
    ioNumber.value = 0;
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
    document.getElementById('greetings').innerText = msj;
  }
