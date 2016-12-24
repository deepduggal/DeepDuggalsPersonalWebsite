var equation = '', 
    solution = '', 
    numbers, 
    operators;

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
function solve(nums, ops) {
  // [3, 4, 5, 2]
  // []

}
//Separates equation into numbers and operators
function splitEqn(eqn) {
  //Use Linked Lists
  var currentNum; 
  numbers = new LinkedList();
  operators = new LinkedList();

  //Check that first char is number, else error
  if(typeof eqn.charAt(0) !== 'number')
    errorMsg("Must start with an operator");
    return '';

  for(var i = 0, len = eqn.length, char = ''; i < len; i++) {
    char = eqn.charAt(i); //Cache current char
    //Handle Nums
    if (isNum(char))
      currentNum += char;
    //Handle Operators
    else if (isOperator(char)) {
      //Add completed num to numbers
      if(currentNum !== '' && !currentNum) {
        numbers.add(currentNum);
        currentNum = ''; //reset currentNum
      }
      //Add operator to operators
        operators.add(char);
    }
    // else
    //   errorMsg('Unknown Error. Please contact my creator: deep@deepduggal.me');
    //   return '';
  }
  console.log(numbers);
  console.log(operators);
}
console.log(splitEqn('3*2'));

/*
  TODO: 
    1. Fix splitEqn(); It has something to do with the linked lists. 
    2. Make solve() work;
    3. Run solve() whenever an operator is pressed (on everything before that operator). 
*/











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
  setSolution(tempSolution);
}

function validator() {
  //First char must be number
  //No Dividing by zero
  //Can't have operation after an operation
}

//Linked List
function Node(data) {
    this.data = data;
    this.next = null;
}
function LinkedList() {
    this._length = 0;
    this.head = null;
}
LinkedList.prototype.add = function(value) {
    var node = new Node(value),
        currentNode = this.head;
 
    // 1st use-case: an empty list 
    if (!currentNode) {
        this.head = node;
        this._length++;
         
        return node;
    }
 
    // 2nd use-case: a non-empty list
    while (currentNode.next) {
        currentNode = currentNode.next;
    }
 
    currentNode.next = node;
 
    this._length++;
     
    return node;
};
LinkedList.prototype.nodeAt = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};
 
    // 1st use-case: an invalid position 
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: a valid position 
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }
 
    return currentNode;
};
LinkedList.prototype.remove = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 0,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;
 
    // 1st use-case: an invalid position
    if (position < 0 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = null;
        this._length--;
         
        return deletedNode;
    }
 
    // 3rd use-case: any other node is removed
    while (count < position) {
        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;
        count++;
    }
 
    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = null;
    this._length--;
 
    return deletedNode;
};