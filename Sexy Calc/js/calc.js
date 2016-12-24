var equation = '', 
    solution = '';

/* Getters and Setters*/
function getEquation() {
  return window.equation;
}
function setEquation(val) {
  window.equation = val;
}
function getSolution() {
  return window.solution;
}
function setSolution(val) {
  window.solution = val;
}

//Solves an equation string
function solve(eqn) {
  //Use Linked Lists
  var currentNum; 
  var numbers = [];
  var operators = [];

  //Check that first char is number, else error
  if(typeof eqn.charAt(0) !== 'number')
    errorMsg("Must start with an operator");
    return '';
  for(var i = 0, len = eqn.length; i < len; i++) {

  }

  return eqn;
}
//Separates equation into numbers and operators
function equationSplitter(eqn) {

}

//Set equation to error message
function errorMsg(str) {

}

function validator() {
  //First char must be number
  //No Dividing by zero
  //Can't have operation after an operation
}

function isNum() {

}

function isOperator {

}