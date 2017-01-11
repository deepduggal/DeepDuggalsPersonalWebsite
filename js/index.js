/**
 * TODO: 
 *  - Add onmouseover and onmouseout Events for projectsDiv. Be able to id each .project div. 
 *  - Custom Scrolling
 */

////////////////////////////
// Variables
////////////////////////////

// Store elements and values
var img = document.createElement('img'),
  height = window.innerHeight,
  width = window.innerWidth, 
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
  withLoveBani: {
    name: 'With Love, Bani',
    description: 'A High-End, Designer Fashion Website',
    url: 'http://withlovebani.com',
    img: 'http://deepduggal.me/res/with-love-bani-screenshot.gif'
  },
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
  },
  catClicker: {
    name: 'Cat Clicker Game',
    description: 'A strangely addicting game involving clicking a cat repeatedly.',
    url: 'portfolio/Cat%20Clicker/clicker.html',
    img: 'portfolio/Cat%20Clicker/screenshot.png'
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
window.onload = function () {
  createPortfolio();
}
//Reset stored window-related values
window.onresize = function() {
  height = window.innerHeight;
  width = window.innerWidth;

  style.numPortfolioColumns = (width < 769)? 1: 2;
  portfolioItem.style.width = 100 / style.numPortfolioColumns + '%';
  projectsDiv.innerHTML = '';
  createPortfolio();
};

//Smooth scrolling to links via Zenscroll
!function(t,e){"function"==typeof define&&define.amd?define([],e()):"object"==typeof module&&module.exports?module.exports=e():t.zenscroll=e()}(this,function(){"use strict";var t=function(t){return"getComputedStyle"in window&&"smooth"===window.getComputedStyle(t)["scroll-behavior"]};if("undefined"==typeof window||!("document"in window))return{};var e=function(e,n,o){n=n||999,o||0===o||(o=9);var i,r=function(t){i=t},c=document.documentElement,u=function(){return e?e.scrollTop:window.scrollY||c.scrollTop},l=function(){return e?Math.min(e.offsetHeight,window.innerHeight):window.innerHeight||c.clientHeight},a=function(t){return e?t.offsetTop:t.getBoundingClientRect().top+u()-c.offsetTop},s=function(){clearTimeout(i),r(0)},f=function(o,i,a){if(s(),t(e?e:document.body))(e||window).scrollTo(0,o),a&&a();else{var f=u(),d=Math.max(o,0)-f;i=i||Math.min(Math.abs(d),n);var h=(new Date).getTime();!function t(){r(setTimeout(function(){var n=Math.min(((new Date).getTime()-h)/i,1),o=Math.max(Math.floor(f+d*(n<.5?2*n*n:n*(4-2*n)-1)),0);e?e.scrollTop=o:window.scrollTo(0,o),n<1&&l()+o<(e||c).scrollHeight?t():(setTimeout(s,99),a&&a())},9))}()}},d=function(t,e,n){var i=a(t)-o;return f(i,e,n),i},h=function(t,e,n){var i=t.getBoundingClientRect().height,r=a(t),c=r+i,s=l(),h=u(),w=h+s;r-o<h||i+o>s?d(t,e,n):c+o>w?f(c-s+o,e,n):n&&n()},w=function(t,e,n,o){f(Math.max(a(t)-l()/2+(n||t.getBoundingClientRect().height/2),0),e,o)},m=function(t,e){t&&(n=t),(0===e||e)&&(o=e)};return{setup:m,to:d,toY:f,intoView:h,center:w,stop:s,moving:function(){return!!i},getY:u}},n=e();if("addEventListener"in window&&!t(document.body)&&!window.noZensmooth){"scrollRestoration"in history&&(history.scrollRestoration="manual",window.addEventListener("popstate",function(t){t.state&&t.state.scrollY&&n.toY(t.state.scrollY)},!1));var o=function(t,e){try{history.replaceState({scrollY:n.getY()},""),history.pushState({scrollY:e},"",t)}catch(t){}};window.addEventListener("click",function(t){for(var e=t.target;e&&"A"!==e.tagName;)e=e.parentNode;if(!(!e||1!==t.which||t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)){var i=e.getAttribute("href")||"";if(0===i.indexOf("#"))if("#"===i)t.preventDefault(),n.toY(0),o(window.location.href.split("#")[0],0);else{var r=e.hash.substring(1),c=document.getElementById(r);c&&(t.preventDefault(),o("#"+r,n.to(c)))}}},!1)}return{createScroller:e,setup:n.setup,to:n.to,toY:n.toY,intoView:n.intoView,center:n.center,stop:n.stop,moving:n.moving}});