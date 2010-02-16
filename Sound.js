function music(){
  var audio = document.getElementById('song');
  if(audio.paused)
    audio.play();
  else
    audio.pause();
}
