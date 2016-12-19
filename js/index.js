/**
 * TODO: 
 *  - Add onmouseover and onmouseout Events for projectsDiv. Be able to id each .project div. 
 *  - Custom Scrolling
 */

////////////////////////////
// Variables
////////////////////////////

//Stored values
var height = window.innerHeight;

// Store elements and values
var h1 = document.body.getElementsByClassName('bounce')[0],
  img = document.createElement('img'),
  height = window.innerHeight,
  width = window.innerWidth, 
  // Window Walls
  leftWall, 
  rightWall, 
  bottomWall, 
  topWall,
  // Text Sides
  leftSide, 
  rightSide, 
  bottomSide, 
  topSide,
  // Animation Values
  speed = 10, 
  dx = 2, // Rate of change/increment 
  dy = 2, // Rate of change/increment
  // Scroll Values
  didScroll = false, 
  oldScrollY = window.scrollY;

// Stored Elements
var projectsDiv = document.body.getElementsByClassName('projects')[0], 
    h2 = document.createElement('h2'), 
    div = document.createElement('div');

// Stored Content
var projects = {
  // ifGame: {
  //   name: 'IF Game',
  //   description: 'Open source stories where your decisions determine the ourcome. ',
  //   url: '',
  //   img: 'http://placehold.it/800x800'
  // }, 
  sexyCalc: {
    name: 'Sexy Calc',
    description: 'A beautiful and responsive calculator. ',
    url: '',
    img: 'res/sexycalc.png'
  }
}; 

// Stored Styles
var style = {
  primaryColor: '#222', 
  secondaryColor: '#343434', 
  fontColor: 'white', 
  numPortfolioColumns: 1
};

////////////////////////////
// Generate Portfolio
////////////////////////////

// UI portfolio item
var portfolioItem = document.createElement('div');
portfolioItem.setAttribute('class', 'project overlayContainer');
portfolioItem.style.height = '100%';
portfolioItem.style.width = (100/window.style.numPortfolioColumns) + '%';
portfolioItem.style.float = 'left';

/** Generates a grid Portfolio UI
 *  - For each project, add img to body
 * @param columns
**/
function createPortfolio() {
  'use strict';
  var keys = Object.keys(window.projects);
  var len = keys.length;
  var portfolio = new Array(len);

  for(var i = 0; i < len; i++) {
    //Overlay Container Div
    portfolio[i] = portfolioItem.cloneNode();
    portfolio[i].classList.add('overlayContainer');
    portfolio[i].style.height = portfolioItem.style.height;
    portfolio[i].style.width = portfolioItem.style.width;

    //1. Img
    var content = img.cloneNode();
    content.classList.add('background');
    portfolio[i].appendChild(content);

    //Add src to Img
    if(projects[keys[i]].img !== null || projects[keys[i]].img !== '') {
      content.setAttribute('src', projects[keys[i]].img);
    }

    //2. Div used to dim content on hover
    var dim = div.cloneNode();
    dim.classList.add('dim');
    portfolio[i].appendChild(dim);

    //3. Show this div on hover
    var overlay = div.cloneNode();
    overlay.classList.add('overlay');
    portfolio[i].appendChild(overlay);

    //Add project name to overlay
    if(projects[keys[i]].name !== null || projects[keys[i]].name !== '') {
      var header = h2.cloneNode();
      h2.style.color = 'white';
      header.innerHTML = projects[keys[i]].name;
      overlay.appendChild(header);
    }

    //Add project to document
    window.projectsDiv.appendChild(portfolio[i]);
  }
}

////////////////////////////
// Event Handling
////////////////////////////

window.onload = function() {
  bounce;
  createPortfolio();
};

//Reset stored window-related values
window.onresize = function() {
  leftSide = 0;
  rightSide = 0;  
  rightSide = leftSide + bounceElem.clientWidth; 
  topSide = bottomSide + bounceElem.clientHeight;
  height = window.innerHeight;
  width = window.innerWidth;
  leftWall = 0; 
  bottomWall = 0;
  rightWall = width; 
  topWall = height;
};

// Set didScroll
window.onscroll = function() {
  didScroll = true;
};

//Handle scrolling
setInterval(function() {
  if (didScroll) {
    window.scrollY;
    var scrollDirection = getScrollDirection();
    //if scrollUp, go up by height
    //if scrollDown, go to prev section
    
    didScroll = false;
  }
}, 250);

// Checks if scrolled up or down
function getScrollDirection(oldVal, newVal) {
  if(oldVal > newVal) return 'down';
  else if(oldVal < newVal) return 'up';
  else return '';
}

//TODO: Make smoother. 
function scrollAnimation(start, end) {
  while(window.scrollY != end) {
    var px = 1;
    window.scrollY += px;
  }
}

didScroll = false, oldScrollY = window.scrollY;

////////////////////////////
// Bounce Animation
////////////////////////////

// Store elements and values
var bounceElem = document.body.getElementsByClassName('bounce')[0],
    height = window.innerHeight,
    width = window.innerWidth;

//Sets initial values for bounce animation
(function initBounce() {
  //Window Walls
  leftWall = 0; 
  rightWall = width; 
  bottomWall = 0; 
  topWall = height;

  //Text Sides
  leftSide = 0; 
  rightSide = leftSide + bounceElem.clientWidth; 
  bottomSide = 0; 
  topSide = bottomSide + bounceElem.clientHeight;

  // Animation values
  speed = 10; 
  dx = 2; // Rate of change/increment 
  dy = 2; // Rate of change/increment

  //Init
  bounceElem.style.top = '1px';
  bounceElem.style.left = '1px';
})()

// Appends 'px' to a number or string.
// Returns a String. 
function toPx(num) {
  return num + 'px';
}

//Bounce Animation
var bounce = setInterval(function() {
  if (rightSide > rightWall) {
    leftSide += dx;
    dx = dx * -1;
  } else if (leftSide < leftWall) {
    leftSide += dx;
    dx = dx * -1;
  } else if (topSide > topWall) {
    bottomSide += dy;
    dy = dy * -1;
  } else if (bottomSide < bottomWall) {
    bottomSide += dy;
    dy = dy * -1;
  }

  bottomSide += dy;
  leftSide += dx;
  
  // Move div
  bounceElem.style.top = toPx(bottomSide);
  bounceElem.style.left = toPx(leftSide);
  
  //Reset values
  rightWall = width; 
  topWall = height; 
  rightSide = leftSide + bounceElem.clientWidth; 
  topSide = bottomSide + bounceElem.clientHeight;

}, speed);