function isNum(u){return!isNaN(parseFloat(u))&&isFinite(u)}function bttnHandler(u){isNum(u)?(currentNum+=u,solution.value=currentNum,wasInputtingNum=!0):"/"===u||"*"===u||"-"===u||"+"===u?(wasInputtingNum&&(equation.value+=previousNum+u,solution.value=currentNum),wasInputtingNum&&currentNum&&("/"===u?currentNum=previousNum/currentNum:"*"===u?currentNum*=previousNum:"-"===u?currentNum=previousNum-currentNum:"+"===u?currentNum=previousNum+currentNum:console.log("Error!")),wasInputingNum=!1):"."===u?(currentNum.indexOf(".")==-1&&(currentNum+=u),solution.value=currentNum):"clear"===u?(currentNum="",equation.value="",solution.value=currentNum):"percent"===u?(currentNum*=100,solution.value=currentNum):"sqrt"===u?(currentNum=Math.sqrt(currentNum),solution.value=currentNum):"squared"===u?(currentNum*=currentNum,solution.value=currentNum):"backspace"===u&&(currentNum=currentNum.slice(0,-1),solution.value=currentNum)}function doMath(){"."===bttnVal?(currentNum.indexOf(".")==-1&&(currentNum+=bttnVal),solution.value=currentNum):"clear"===bttnVal?(currentNum="",equation.value="",solution.value=currentNum):"percent"===bttnVal?(currentNum*=100,solution.value=currentNum):"sqrt"===bttnVal?(currentNum=Math.sqrt(currentNum),solution.value=currentNum):"squared"===bttnVal?(currentNum*=currentNum,solution.value=currentNum):"backspace"===bttnVal?(currentNum=currentNum.slice(0,-1),solution.value=currentNum):isNum(bttnVal)}function updateUI(u,t,n){equationVal&&(u.value=equationVal),solutionVal&&(t.value=solutionVal)}var previousNum="",currentNum="",previousOperator="",equation=document.getElementById("equation"),solution=document.getElementById("solution"),wasInputtingNum=!1,firstNum,secondNum;document.body.onkeypress=function(u){var t={"/":bttnHandler("/"),"*":bttnHandler("*"),"-":bttnHandler("-"),"+":bttnHandler("+"),"=":bttnHandler("="),".":bttnHandler("."),0:bttnHandler("0"),1:bttnHandler("1"),2:bttnHandler("2"),3:bttnHandler("3"),4:bttnHandler("4"),5:bttnHandler("5"),6:bttnHandler("6"),7:bttnHandler("7"),8:bttnHandler("8"),9:bttnHandler("9"),backspace:bttnHandler("backspace")};t.hasOwnProperty(u.key)&&(currentNum+=t[u.key],solution.value=u.key)},document.body.onclick=function(u){var t=u.target.getAttribute("name"),n={zero:"0",one:"1",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8",nine:"9",decimalPoint:".",divide:"/",multiply:"*",subtract:"-",add:"+",equals:"=",clear:"clear",percent:"percent",squareRoot:"sqrt",squared:"squared",backspace:"backspace"};n.hasOwnProperty(t)&&bttnHandler(n[t]),u.stopPropagation()};