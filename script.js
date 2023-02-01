const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const clearBtns = document.querySelectorAll(".clear-btn");
const decimalBtn = document.getElementById("decimal");
const result = document.getElementById("result");
const display = document.getElementById("display");
const negativeNumBtn = document.getElementById("negative");
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = "";

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener("click", function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener("click", function (e) {
    operationPress(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener("click", function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener("click", decimal);

negativeNumBtn.addEventListener("click", addMinus);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(op) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== "=") {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === "+") {      
      MemoryCurrentNumber = ((MemoryCurrentNumber * 1e18) + (localOperationMemory * 1e18)) / 1e18;
    } else if (MemoryPendingOperation === "-") {
      MemoryCurrentNumber = ((MemoryCurrentNumber * 1e18) - (localOperationMemory * 1e18)) / 1e18;
    } else if (MemoryPendingOperation === "*") {
      MemoryCurrentNumber = ((MemoryCurrentNumber * 1e6) * (localOperationMemory * 1e6)) / 1e12;
    } else if (MemoryPendingOperation === "/") {
      MemoryCurrentNumber /= +localOperationMemory;
    } else if (MemoryPendingOperation === "**") {
      MemoryCurrentNumber **= +localOperationMemory;
    } else if (MemoryPendingOperation === "√") {              
        MemoryCurrentNumber = Math.sqrt(localOperationMemory);         
    } else {
      MemoryCurrentNumber = +localOperationMemory;
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op; 
    console.log(MemoryPendingOperation);   
  }
  if (MemoryPendingOperation === "√") {
    MemoryNewNumber = false;
    operationPress("=");    
  } 
}

function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = "0.";
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf(".") === -1) {
      localDecimalMemory += ".";
    }
  }
  display.value = localDecimalMemory;  
}

function addMinus() {
  if (display.value.indexOf("-") === -1) {
    display.value = "-" + display.value;    
  } else {
    display.value = (display.value).slice(1);
  } 
}

function clear(id) {
  if (id === "ce") {
    display.value = "0";
    MemoryNewNumber = true;
  } else if (id === "c") {
    display.value = "0";
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = "";
  }
}
