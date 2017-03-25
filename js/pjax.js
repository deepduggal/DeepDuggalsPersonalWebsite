var selector = '.main',
      elem = document.querySelector(selector), 
      oldContent, 
      newContent;

function getContent(url, selector) {
  var xhr, 
        lastPos = 0;

  try {
    xhr = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
    xhr.open('GET', url, 1);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 3) {
        var data = xhr.responseText.substring(lastPos);
        lastPos = xhr.responseText.length;

        process(data);
      }
    };
    xhr.send();
  } catch (e) {
    window.console && console.log(e);
  }
};

/*
var newData = '', 
  openDivs = 0;

- Search for <div id="main">

- If (newData contains '<div id="main">') openDivs++; newContent += newData.substring(newData.indexOf('<div id="main">'));
  
  - if (opening div tag is found) 
    - if (opening div tag contains 'id="main"')
    - else: newContent += newData; openDivs++;

  - else if (closing div tag is found) 
    - if (openDivs === 1) openDivs = 0;
    - else: newContent += newData; openDivs--;
  - else: newContent += newData;
- else: newContent = '';

- 
- if </div> for '.main' is found, stop request, remove every everything after </div> in newData. 
*/