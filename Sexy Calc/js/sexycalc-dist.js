function getEquation(){return window.equation}function setEquation(t){window.equation=t,window.equationUI.value=t}function getSolution(){return window.solution}function setSolution(t){window.solution=t,window.solutionUI.value=t}function bttnHandler(t){if(isNum(t))splitEqn(getEquation()),isOperator(getEquation().slice(-1))&&setSolution(""),setSolution(getSolution()+t);else if("/"===t||"*"===t||"-"===t||"+"===t){setEquation(0===numbers.length?getSolution()+t:getEquation()+getSolution()+t),splitEqn(getEquation());var e=solveEqn(numbers,operators);console.log("numbers: "+numbers),console.log("operators: "+operators),setSolution(e)}else if("."===t)currentNum.indexOf(".")==-1&&(currentNum+=t);else if("clear"===t)setEquation(""),setSolution("");else if("percent"===t)setSolution(100*getSolution());else if("sqrt"===t)setSolution(Math.sqrt(getSolution()));else if("squared"===t)setSolution(getSolution()*getSolution());else if("backspace"===t)setSolution(getSolution().slice(0,-1));else if("equals"===t){setEquation(getEquation()+getSolution()),splitEqn(getEquation());var e=solveEqn(numbers,operators);setSolution(e)}}function solveEqn(t,e){var n;n=solveSimple(t[0],e[0],t[1]);for(var o=1,r=operators.length;o<r;o++)t[o+1]&&(n=solveSimple(n,e[o],t[o+1]));return n}function solveSimple(t,e,n){if(t=parseInt(t),n=parseInt(n),!n)return"";switch(e){case"*":return t*n;case"/":return t/n;case"+":return t+n;case"-":return t-n;default:return errorMsg("Unknown Operation"),"Unknown Operation"}}function splitEqn(t){if(numbers=[],operators=[],isOperator(t.charAt(0)))return errorMsg("Must start with an operator"),"started with operator";for(var e=0,n=0,o=t.length,r="";e<o;e++)if(r=t.charAt(e),isOperator(r)){if(isOperator(t.charAt(e-1)))return errorMsg("Can't do two operators in a row. "),"Can't do two operators in a row. ";operators.push(r),n++}else{if(!isNum(r))return errorMsg("Unknown Error. Please contact my creator: deep@deepduggal.me"),"unknown error";if("0"===r&&"/"===t.charAt(e-1))return errorMsg("Can't divide by zero. "),"Can't divide by zero. ";numbers[n]?numbers[n]+=r:numbers.push(r)}}function numOps(t){for(var e=0,n=0,o=t.length;n<o;n++)isOperator(t.charAt(n))&&e++;return e}function isNum(t){return!isNaN(parseFloat(t))&&isFinite(t)}function isOperator(t){return"*"===t||"/"===t||"+"===t||"-"===t}function errorMsg(t){getSolution();setSolution(t)}var equationUI=document.getElementById("equation"),solutionUI=document.getElementById("solution"),equation="",solution="",numbers=[],operators=[];document.body.onkeypress=function(t){var e={"/":bttnHandler("/"),"*":bttnHandler("*"),"-":bttnHandler("-"),"+":bttnHandler("+"),"=":bttnHandler("="),".":bttnHandler("."),0:bttnHandler("0"),1:bttnHandler("1"),2:bttnHandler("2"),3:bttnHandler("3"),4:bttnHandler("4"),5:bttnHandler("5"),6:bttnHandler("6"),7:bttnHandler("7"),8:bttnHandler("8"),9:bttnHandler("9"),backspace:bttnHandler("backspace")};console.log("key: "+t.key),e.hasOwnProperty(t.key)&&(currentNum+=e[t.key],solution.value=t.key)},document.body.onclick=function(t){var e=t.target.getAttribute("name"),n={zero:"0",one:"1",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8",nine:"9",decimalPoint:".",divide:"/",multiply:"*",subtract:"-",add:"+",equals:"equals",clear:"clear",percent:"percent",squareRoot:"sqrt",squared:"squared",backspace:"backspace"};n.hasOwnProperty(e)&&bttnHandler(n[e]),t.stopPropagation()};