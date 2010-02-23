function submitScore() {
  var highScore = document.getElementById("HighScore").innerHTML;
  var name = document.getElementById("name").value;
  //var url = "http://localhost:8888/sign";
  var url = "http://avalanchescores.appspot.com/sign";
  var parameters = "score=" + highScore + "&name=" + name;
  var req = new XMLHttpRequest();
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send(parameters);
  window.open("http://avalanchescores.appspot.com/","High scores!","");
}