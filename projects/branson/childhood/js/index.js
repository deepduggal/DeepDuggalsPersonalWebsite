var audio1 = new Audio('../res/sounds/woosh.wav'),
  audio2 = new Audio('../res/sounds/tubular-bells.ogg'),
  musicOnOff = document.querySelector('.music.bttn');

var story = document.querySelector('.story'),
      oldScrollX = 0,
      isScrolling = false;

window.addEventListener('DOMContentLoaded', function() {
  TweenMax.from('.main', 1, {opacity: 0}); //fadeIn
  TweenMax.staggerFrom('.story .item', 1, {delay: 1.2, opacity: 0}, 0.2);
  TweenMax.from('.menu', 1, {height: 0, opacity: 0});

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

//Smooth Scrolling 
story.addEventListener('wheel', function(e) {
  var delta = Math.max(-1, Math.min(1, e.deltaY));

  TweenMax.to(story, 0.3, {scrollLeft: '+=' + delta*60, ease: Expo.easeOut});
}, false);


//Turn sounds on or off
musicOnOff.addEventListener('click', function() {
  if(!audio2.paused) {
  TweenMax.to(audio2, 1, {volume: 0, onComplete: function() {
    audio2.pause();
  }});
  }
  else {
  audio2.play();
  TweenMax.to(audio2, 1, {volume: 1});
  }
  if(!audio1.paused) {
  TweenMax.to(audio1, 1, {volume: 0, onComplete: function() {
    audio1.pause();
  }});
  }
  else {
  audio1.play();
  TweenMax.to(audio1, 1, {volume: 1});
  }
}, false);