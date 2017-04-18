var audio1 = new Audio('../res/sounds/woosh.wav'),
  audio2 = new Audio('../res/sounds/holidaysinthesun.mp3'),
  musicOnOff = document.querySelector('.music.bttn');

var story = document.querySelector('.story'),
      oldScrollX = 0,
      isScrolling = false;

// Click and drag to scroll values
var curYPos, curXPos, curDown;

// Animate page in, play music
window.addEventListener('DOMContentLoaded', function() {
  TweenMax.from('.main', 1, {opacity: 0}); //fadeIn
  TweenMax.staggerFrom('.story .item', 1, {delay: 1, opacity: 0}, 0.2);
  TweenMax.from('.story-menu', 1, {height: 0, opacity: 0});

  // Play title audio
  audio1.play();
  TweenMax.from(audio1, 4, {volume: 0}); //fadeIn

  //Load audio for next view
  audio2.load();

  //Play Intro Audio
  audio2.play();
  audio2.loop = true;
  TweenMax.from(audio2, 1, {volume: 0}); //fadeIn
}, false);

// Smooth scroll via arrow keys
window.addEventListener('keydown', function(e) {
  var key;

  // Get cross-browser key
  if (e.key || e.code) {
    key = e.key || e.code;
  } else {
    var code = e.which || e.keyCode;
    key  = String.fromCharCode(code);
  }

  // Handle valid keys
  if(key === 'ArrowLeft' || key === 37) {
      TweenMax.to(story, 0.3, {scrollLeft: '+=' + Math.min(window.innerWidth/-10, -1), ease: Sine.easeInOut});
    } else if(key === 'ArrowRight' || key === 39) {
      TweenMax.to(story, 0.3, {scrollLeft: '+=' + Math.max(window.innerWidth/10, 1), ease: Sine.easeInOut});
    }
}, false)

// Smooth Scrolling on mouse wheel
story.addEventListener('wheel', function(e) {
  var delta = Math.max(-1, Math.min(1, e.deltaY));

  TweenMax.to(story, 0.3, {scrollLeft: '+=' + delta*60, ease: Expo.easeOut});
}, false);

// Click and drag to scroll
story.addEventListener('mousemove', function(e){ 
  if(curDown){
    TweenMax.to(story, 0.3, {scrollLeft:  '+=' + (curXPos - e.pageX), scrollTop: '+=' + (curYPos - e.pageY)});
  }
});
story.addEventListener('mousedown', function(e){ 
  curYPos = e.pageY; 
  curXPos = e.pageX; 
  curDown = true; 
  story.style.cursor = 'grabbing';
});
story.addEventListener('mouseup', function(e){ 
  curDown = false; 
  story.style.cursor = 'grab';
});

// Turn sounds on or off
musicOnOff.addEventListener('click', function() {
  // Pause
  if(!audio1.paused || !audio2.paused) {
    TweenMax.to(audio1, 1, {volume: 0, onComplete: function() {
      audio1.pause();
    }});
    TweenMax.to(audio2, 1, {volume: 0, onComplete: function() {
      audio2.pause();
    }});
  }
  // Play
  else {
    TweenMax.to(audio1, 1, {volume: 1});
    TweenMax.to(audio2, 1, {volume: 1});
    audio1.play();
    audio2.play();
  }
}, false);
