var audio1 = new Audio('./res/sounds/reverse-clang.wav'),
    audio2 = new Audio('./res/sounds/tubular-bells.ogg'),
    musicOnOff = document.querySelector('.music.bttn');

window.addEventListener('DOMContentLoaded', function() {
  // Play title audio
  audio1.play();
  TweenMax.from(audio1, 4, {volume: 0}); //fadeIn

  //Load audio for next view
  audio2.load();

  //Loading Text Fade In
  TweenMax.staggerFrom(['.loading .title', '.loading .episode-title'], 2, {opacity: 0}, 1);
  TweenMax.from('.loading .subject', 1, {delay: 3, opacity: 0});

  // Loading Text Movement
  TweenMax.staggerTo(['.loading .title', '.loading .episode-title'], 5.7, {left: '101%', ease: SlowMo.ease.config(0.9, 0.9, false)});
  TweenMax.to('.loading .subject', 5.7, {right: '101%', ease: SlowMo.ease.config(0.9, 0.95, false)});

  //Play Intro Audio
  setTimeout(function() {
    audio2.play();
    audio2.loop = true;
  }, 6700);
  TweenMax.from(audio2, 1, {volume: 0}); //fadeIn

  //Loading Out
  TweenMax.to('.loading', 1, {delay: 7.7, opacity: 0, display: 'none'});

  // Intro In
  TweenMax.from('.intro', 1, {delay: 7.7, opacity: 0, display: 'none'});

  // var intro = document.querySelector('.intro');

  // // Paper Plane Loop
  // var plane = document.createElement('img');
  // plane.setAttribute('src', 'res/img/paper-plane.png');
  // plane.style.cssText = 'position: absolute; z-index: -1; left: -50%; top: 100%;';
  // intro.appendChild(plane);

  // setInterval(function() {
  //   TweenMax.to(plane, 0, {left: '-50%', top: '100%'});
  //   TweenMax.to(plane, 4, {delay: 4, left: '75%', top: '-50%'});
  // }, 20000);
}, false);

musicOnOff.addEventListener('click', function() {
  if(!audio2.paused || !audio1.paused) {
    TweenMax.to([audio1, audio2], 1, {volume: 0, onComplete: function() {
      audio1.pause();
      audio2.pause();
    }});
  }
  else {
    TweenMax.to(audio1, 1, {volume: 1});
    TweenMax.to(audio2, 1, {volume: 1});
    audio1.play();
    audio2.play();
  }
}, false);