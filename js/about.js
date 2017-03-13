var navTrigger = document.querySelector('.navTrigger'), 
    nav = document.querySelector('nav'),
    header = document.querySelector('header'),
    loading = document.querySelector('.loading'),
    main = document.querySelector('.main'),
    spotlightItems = document.querySelectorAll('.spotlightItem');

var oldScrollY = 0;

var quotes = ['First learn computer science and all the theory. Next develop a programming style. Then forget all that and just hack.' ];
      names = ['George Carrette'];

navTrigger.onclick = function() {
  //hide
  if(nav.style.display === 'block') {
    TweenMax.to(nav, 0.3, {left: '-100%', display: 'none'});
  }
  //show
  else {
    TweenMax.to(nav, 0, {left: '101%'});
    TweenMax.to(nav, 0.2, {display: 'block', left: '0%'});
    TweenMax.staggerTo('.navItem', 0.2, {opacity: 1}, 0.2);
  }
};

//Animate the page in, when it loads
window.addEventListener('DOMContentLoaded', function() {
  TweenMax.to(loading, 0.25, {left: '-100%'});
  TweenMax.from(main, 0.25, {left: '101%'});
  TweenMax.from(header, 0.25, {delay: 0.2, top: '-100%'});
}, false);

//scroll Animations
main.addEventListener('scroll', function() {
  //Hide nav on scrollDown
  if(oldScrollY < main.scrollTop) {
    TweenMax.to(header, 0.2, {top: '-3.95rem'});
  }
  //Show nav on scrollUp
  else if(oldScrollY > main.scrollTop) {
    TweenMax.to(header, 0.2, {top: '0'});
  }

  //reset oldScrollY
  oldScrollY = main.scrollTop;
}, false);

function scrollTo(elem) {
  var scrollPos = elem.getBoundingClientRect().top - main.getBoundingClientRect().top;
  TweenMax.to(main, 0.3, {scrollTo: '#spotlight'});
}