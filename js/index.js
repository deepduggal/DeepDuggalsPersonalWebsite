/**
 * TODO: 
 *  - Add onmouseover and onmouseout Events for projectsDiv. Be able to id each .project div. 
 *  - Custom Scrolling
 */

////////////////////////////
// Variables
////////////////////////////

//Stored values
var height = window.innerHeight,
    width = window.innerWidth;

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
    url: 'Sexy%20Calc/sexycalc.html',
    img: 'Sexy%20Calc/sexycalc.png'
  }, 
  digitalServices: {
    name: 'Digital Services Website',
    description: 'A simple, but attractive sample digital services website. Made with Bootstrap and Font Awesome. ',
    url: 'Digital%20Services%20Website/digitalservices.html',
    img: 'Digital%20Services%20Website/screenshot.gif'
  }
}; 

// Stored Styles
var style = {
  primaryColor: '#222', 
  secondaryColor: '#343434', 
  fontColor: 'white', 
  numPortfolioColumns: (width < 769)? 1: 2
};

////////////////////////////
// Generate Portfolio
////////////////////////////

// UI portfolio item
var portfolioItem = document.createElement('div');
portfolioItem.className = 'project overlayContainer';
portfolioItem.style.height = '100%';
portfolioItem.style.width = 100 / style.numPortfolioColumns + '%';
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

    //Open url on click
    if(projects[keys[i]].url !== null || projects[keys[i]].url !== '') {
      portfolio[i].style.cursor = 'pointer';

      portfolio[i].onclick = function(arg) {
        return function() {
          location.href = projects[keys[arg]].url;
        }
      }(i);
    }

    //Add project to document
    window.projectsDiv.appendChild(portfolio[i]);
  }
}

////////////////////////////
// Event Handling
////////////////////////////

window.onload = function() {
  createPortfolio();
};

//Reset stored window-related values
window.onresize = function() {
  height = window.innerHeight;
  width = window.innerWidth;

  style.numPortfolioColumns = (width < 769)? 1: 2;
  portfolioItem.style.width = 100 / style.numPortfolioColumns + '%';
  projectsDiv.innerHTML = '';
  createPortfolio();
};

function smoothScroll(selector) {
  // Scroll to a certain element
  var elem = document.querySelector(selector), 
      elemY = elem.getBoundingClientRect().top,
      currentY = window.scrollY;


  var timer = setInterval(function() {
    if (window.scrollY === 'elemY') {
      clearInterval(timer);
    }
    else if (scrollY){

    }
  }, 100);


}
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