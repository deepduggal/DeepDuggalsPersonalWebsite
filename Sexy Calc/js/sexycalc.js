/*
  URGENT TODO - Fix bugs: 
    1. Disallow   double operators (3**=43), disallow divide by zero
    2. Make 'equals' button work
    3. Allow double digits. Currently, pressing two nums in a row doesn't work. 

*/

/** TODO: 
 *    - Listen for keyboard events, Press corresponding button on keypress. 
 *    - Add error handling. ex. can't do do or divide by zero. 
 */
// View
var equationUI = document.getElementById('equation');
var solutionUI = document.getElementById('solution');

// Model
var equation = '', 
    solution = '', 
    numbers = [], 
    operators = [];

/* Getters and Setters - Update Model and View Simultaneously*/
function getEquation() {
  return window.equation;
}
function setEquation(val) {
  window.equation = val;
  window.equationUI.value = val;
}
function getSolution() {
  return window.solution;
}
function setSolution(val) {
  window.solution = val;
  window.solutionUI.value = val;
} 

// Controller
function bttnHandler(val) {
    //Handle digits
    if (isNum(val)) {
      splitEqn(getEquation()); //reset numbers and operators
      //If last input was an operator
      if(isOperator(getEquation().slice(-1)) ) {
        setSolution(''); //reset solution
      }
      setSolution(getSolution() + val);
    }
    //Handle simple functions
    else if (val === '/' || val === '*' || val === '-' || val === '+') {
      //Set equation
      setEquation((numbers.length === 0)? getSolution() + val: getEquation() + getSolution() + val);
      //Prep for solving
      splitEqn(getEquation());
      //Solve eqn
      var result = solveEqn(numbers, operators); //solve eqn
      console.log('numbers: ' + numbers);
      console.log('operators: ' + operators);
      setSolution(result);
    }
    //Handle modifier operations/special functions
    else if (val === '.') {
      if (currentNum.indexOf('.') == -1) currentNum += val;
    } else if (val === 'clear') {
        setEquation('');
        setSolution('');
    } else if (val === 'percent') {
        setSolution(getSolution()*100);
    } else if (val === 'sqrt') {
        setSolution(Math.sqrt(getSolution()));
    } else if (val === 'squared') {
        setSolution(getSolution()*getSolution());
    } else if (val === 'backspace') {
        setSolution(getSolution().slice(0, -1));
    } else if (val === 'equals') {
        setEquation(getEquation() + getSolution());
        //Prep for solving
        splitEqn(getEquation());
        //Solve eqn
        var result = solveEqn(numbers, operators); //solve eqn
        setSolution(result);
    }
}

//TODO: Fix keypress listener. Change from onkeypress to onkeydown. Adjust keybinding keys. 
//TODO: Change keybindings backspace key to ASCII value of backspace button. 
//Keypress Listener
document.body.onkeypress = function(event) {
    var keyBindings = {
        '/': bttnHandler('/'),
        '*': bttnHandler('*'),
        '-': bttnHandler('-'),
        '+': bttnHandler('+'),
        '=': bttnHandler('='),
        '.': bttnHandler('.'),
        0: bttnHandler('0'),
        1: bttnHandler('1'),
        2: bttnHandler('2'),
        3: bttnHandler('3'),
        4: bttnHandler('4'),
        5: bttnHandler('5'),
        6: bttnHandler('6'),
        7: bttnHandler('7'),
        8: bttnHandler('8'),
        9: bttnHandler('9'),
        backspace: bttnHandler('backspace')
    }

    console.log('key: ' + event.key);

    if (keyBindings.hasOwnProperty(event.key)) {
        currentNum += keyBindings[event.key];
        solution.value = event.key;
    }
}

//Button Click Listener
document.body.onclick = function(event) {
    var currentElemName = event.target.getAttribute('name');
    var buttonNames = {
        //Changing the number
        //If valid, append to  current number
        zero: '0',
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',

        //Changing the number
        //Add to end of currentNum. Only allow once per currentNum. 
        decimalPoint: '.',

        //Operation btwn. two number
        //Add symbol to equation, run parseFloat() on currentNum, 
        //solve previous subproblem, update solution.  
        divide: '/',
        multiply: '*',
        subtract: '-',
        add: '+',
        equals: 'equals',

        //Do stuff to currentNum
        clear: 'clear', //equation = "", currentNumber = ""
        percent: 'percent', //currentNum*100
        squareRoot: 'sqrt', //Math.sqrt();
        squared: 'squared', //currentNum*currentNum
        backspace: 'backspace'
    }

    //If a valid button (in buttonNames) was pressed, 
    if (buttonNames.hasOwnProperty(currentElemName)) {
        bttnHandler(buttonNames[currentElemName]);
    }
    event.stopPropagation();
}

//Solves an equation string, which is simply a lot of simple operations in one string
function solveEqn(nums, ops) {
  var subResult; //Store the result of the previous Simple Operation

  subResult = solveSimple(nums[0], ops[0], nums[1]);
  for(var i = 1, len = operators.length; i < len; i++) {
    if(nums[i+1]) {
      subResult = solveSimple(subResult, ops[i], nums[i+1]);
    }
  }
  return subResult;
}
//Does an operation between two numbers (a simple operation)
function solveSimple(num1, oper, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  // if there's no second number, return empty string
  if(!num2)
    return '';
  else {
    switch (oper) {
      case '*':
        return num1 * num2;
        break;
      case '/':
        return num1 / num2;
        break;
      case '+':
        return num1 + num2;
        break;
      case '-':
        return num1 - num2;
        break;
      default:
        errorMsg("Unknown Operation");
        return 'Unknown Operation';
        break;
    }
  }
}
//Separates equation into numbers and operators
function splitEqn(eqn) {
  numbers = [];
  operators = [];

  //Check that first char is number, else error
  if(isOperator(eqn.charAt(0))) {
    errorMsg("Must start with an operator");
    return 'started with operator';
  }
  for(var i = 0, operPos = 0, len = eqn.length, char = ''; i < len; i++) {
    char = eqn.charAt(i); //Cache current char

    //Handle Operators
    if (isOperator(char)) {
      //Logical Error Handling - Operation on an operation
      if(isOperator(eqn.charAt(i - 1))) {
        errorMsg("Can't do two operators in a row. ");
        return "Can't do two operators in a row. ";
      }
      //If Error Free: Add operator to operators
      else {
        operators.push(char);
      }
      operPos++;
    }
    //Handle Nums
    else if (isNum(char)) {
      //Logical Error Handling - Divide by Zero
      if(char === '0' && eqn.charAt(i - 1) === '/') {
        errorMsg("Can't divide by zero. ");
        return "Can't divide by zero. ";
      }
      //Add digit to end of number
      else if(numbers[operPos]) {
        numbers[operPos] += char;
      }
      //Or add it if it doesn't exist
      else {
        numbers.push(char);
      }
    }
    else {
      errorMsg('Unknown Error. Please contact my creator: deep@deepduggal.me');
      return 'unknown error';
    }
  }
}
function numOps(eqn) {
  var num = 0;
  for(var i = 0, len = eqn.length; i < len; i++) {
    if(isOperator(eqn.charAt(i))) {
      num++;
    }
  }
  return num;
}

function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function isOperator(char) {
  return char === '*' || char === '/' || char === '+' || char === '-';
}

//Set equation to error message
function errorMsg(str) {
  var tempSolution = getSolution();
  //Do animation to temporarily show error
  setSolution(str);
}