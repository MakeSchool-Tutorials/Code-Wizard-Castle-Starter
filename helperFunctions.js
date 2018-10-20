function mouseLocation() {
  var string = "mouseX: " + floor(mouseX) + ", mouseY: " + floor(mouseY);
  return string;
}

function randomColor() {
  var randomColor = color(random(255), random(255), random(255));

  return randomColor;
}

function reveal(string, id) {
  var div = document.getElementById(id);
  div.innerHTML = string;
}
