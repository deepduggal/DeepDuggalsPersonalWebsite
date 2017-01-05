function Cat(name, img) {
  this.name = name;
  this.img = img;
  this.numClicks = 0; 
}

Cat.prototype.appendCat = function(someKitty) {
  //Create container div
  var container = document.createElement('div');
  container.setAttribute('id', someKitty.name);
  
  //Create cat UI components
  var nameUI = document.createElement('h1')
  var imgUI = document.createElement('img');
  var numClicksUI = document.createElement('h3');
  
  //Set attributes and text of cat UI components
  nameUI.innerHTML = someKitty.name;
  imgUI.setAttribute('src', someKitty.img);
  numClicksUI.innerHTML = someKitty.numClicks;
  
  //Handle Clicks
  container.onclick = function() {
    numClicksUI.innerHTML = parseInt(numClicksUI.innerHTML) + 1;
  }

  //Add cat UI components to cat container div
  container.appendChild(nameUI);
  container.appendChild(imgUI);
  container.appendChild(numClicksUI);
  
  document.body.appendChild(container);
}

var cat1 = new Cat('Ultimate Cat Clicker', 'http://www.catgifpage.com/ui/images/grumpy.png')
Cat.prototype.appendCat(cat1);