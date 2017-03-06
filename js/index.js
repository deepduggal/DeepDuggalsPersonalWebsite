var navTrigger = document.querySelector('.navTrigger'), 
    nav = document.querySelector('nav'),
    loading = document.querySelector('.loading'), 
    audio = document.querySelector('audio');

navTrigger.onclick = function() {
  if(nav.style.display === 'block') {
    nav.style.display = 'none';
  }
  else {
    nav.style.display = 'block';
  }
};

window.addEventListener('load', function() {
  audio.play();
  fadeIn(audio, 1000);
  loading.style.animation = 'disappear 1s';
  setTimeout(function() {
    loading.style.display = 'none';
  }, 1000);
}, false);
window.addEventListener('scroll', function() {
  console.log('scrolled');
  if(window.scrollY >= window.innerHeight) {
    TweenMax.to('.spotlightItem', 0.3, {top: '-200%'});
  }
}, false)
;
function fadeIn(audio, speed) {
  audio.volume = 0;
  var timer = setInterval(function() {
    if(audio.volume >= 0.9) {
      clearInterval(timer);
    }
    else {
      audio.volume += (1/10);
    }
  }, speed/10);
}