var navTrigger = document.getElementsByClassName('navTrigger')[0], 
    nav = document.getElementsByTagName('nav')[0];

navTrigger.onclick = function() {
  if(nav.style.display === 'block') {
    nav.style.display = 'none';
  }
  else {
    nav.style.display = 'block';
  }
};