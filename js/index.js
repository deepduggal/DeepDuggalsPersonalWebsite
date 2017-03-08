var navTrigger = document.querySelector('.navTrigger'), 
    nav = document.querySelector('nav'),
    header = document.querySelector('header'),
    loading = document.querySelector('.loading'),
    main = document.querySelector('.main'),
    spotlightItems = document.querySelectorAll('.spotlightItem'),
    audio = document.querySelector('audio');

navTrigger.onclick = function() {
  //hide
  if(nav.style.display === 'block') {
    // TweenMax.to(header, 0.3, {background: 'black'});
    TweenMax.to(nav, 0.3, {height: 0, paddingTop: 0, display: 'none'});
  }
  //show
  else {
    // TweenMax.to(header, 0.3, {background: 'black'});
    TweenMax.to(nav, 0.3, {display: 'block', height: '100%', paddingTop: '4rem'});
    TweenMax.from('.navItem', 0.3, {right: 0, delay: 0.3});
  }
};

//on window load
window.addEventListener('load', function() {
  TweenMax.to(loading, 0.25, {left: '-100%'});
  TweenMax.from(main, 0.25, {left: '101%'});
  TweenMax.from(header, 0.25, {delay: 0.2, top: '-100%'});
}, false);

//scroll Animations
main.addEventListener('scroll', function() {
  //.spotlightItems
  // TweenMax.staggerFrom(['.spotlightItem .header', '.spotlightItem .subheader'], 0.3, {x: '100%'}, 0.3);
}, false);

/**
 * Check if an element is visible in viewport
 * @param el - The element
 */
function isVisible(elem) {
    var rect = elem.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/*
TODO
=============================
  Fix
    - Landing Page text: sucks, doesn't fit on page, etc.
    - Implement isVisible as an Event Listener (http://stackoverflow.com/a/7557433/5628);
    - Hide "Deep Duggal" from %header on mobile (or remove completely?)
    - Improve page loading screen
    - .spotlightItem Animations. Do them one at a time. Only when visible. 
    - Navbar transition
    - Change resume link

  Add
   - On 1st click of .socialBttn, show description. Open on 2nd click. 
   - For resume .socialBttn, onclick show popup with file type options. 
   - Add cool, quick animations, for when the page loads. 
   - Logo to %header
   - Remove Music
   - Make .landing interactive and fun. Something that works on mobile too. (Valid Events: onSwipe)
   - Add transition between pages. Using push state AJAX. 
   - Add About Page
   - Add Contact Page
   - Add new projects to .spotlight
*/

/*
- John - Amazon Fire Stick vs. Chromecast
- Post on Reddit: "How did you get your first Web Developer job?"
- Perfect Website
- Call Liz @ HQ Raleigh
- Do Meetups
*/