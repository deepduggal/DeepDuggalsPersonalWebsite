
//Stored Elems
var people = document.querySelector('.people'),
    allPeople = people.querySelectorAll('.person');

//Big Text
(window.fitText=function(a){function c(){for(var a=0,c=b.length;a<c;a++)b[a].style.fontSize=b[a].clientWidth/6+"px"}a=a||".fitText";var b=document.querySelectorAll(a);c(),window.addEventListener("resize",c,!1),window.addEventListener("orientationchange",c,!1)})();

//Audio 
var audio = new Audio(),
    jobsAudio = ['https://s3.amazonaws.com/hark-audio/270aed22-5f90-42c7-8473-23c52814898c.mp3', 'https://s3.amazonaws.com/hark-audio/d82c0b30-3d83-497b-a06b-4fb34896c5b6.mp3', 'https://s3.amazonaws.com/hark-audio/0030f1d3-e562-49e6-9f1a-ace2dff7476d.mp3'],
    einsteinAudio = [],
    muskAudio = [];

people.addEventListener('mouseover', function(e) {
  for (var target=e.target; target && target!=this; target=target.parentNode) {
  if(target.classList.contains('person')) {
    //Resize all people, handle hovered person
    allPeople.forEach(function(el) {
      var middle = el.querySelector('.middle'),
          foreground = el.querySelector('.foreground');
      
      if(el !== target) {
        TweenMax.to(el, 1, {width: '10%'});
        TweenMax.to(middle, 1, {maxWidth: '10%'});
        TweenMax.to(foreground, 1, {maxWidth: '10%'});
      }
      else {
        TweenMax.to(target, 1, {width: '80%'});
        TweenMax.to(middle, 1, {maxWidth: '80%'});
        TweenMax.to(foreground, 1, {maxWidth: '80%'});
        
        //Person specific handlers
        if(target.classList.contains('jobs')) {
          jobsHover();
        } else if(target.classList.contains('einstein')) {
          einsteinHover();
        } else if(target.classList.contains('musk')) {
          muskHover();
        }
      }
    });
  }
  }
}, false);
people.addEventListener('mouseout', function(e) {
  fadeOut();
  setTimeout(audio.pause(), 1000);
  
  allPeople.forEach(function(el) {
  var middle = el.querySelector('.middle'),
      foreground = el.querySelector('.foreground');
    
  TweenMax.to(middle, 1, {maxWidth: '33.333%'});
  TweenMax.to(foreground, 1, {maxWidth: '33.333%'});
  TweenMax.to(el, 1, {width: '33.333%'});
  });
}, false);

//Handle Hover
function jobsHover() {
  randomAudio(jobsAudio);
}
function einsteinHover() {
  randomAudio(einsteinAudio);
}
function muskHover() {
  randomAudio(muskAudio);
}

/* AUDIO */
//Play random audio from array of audio src
function randomAudio(arr) {
  if(!audio || !arr) { return ''; }
  else {
    audio.src = arr[randomInt(0, arr.length)];
    audio.play();
    fadeIn();
  }
}
function fadeIn() {
  TweenMax.to(audio, 1, {volume: 1})
}
function fadeOut() {
  TweenMax.to(audio, 1, {volume: 0})
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}