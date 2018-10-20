function drawWizard() {
  if (wizard) {
    wizard.animate();

    if (mouseIsPressed || broom && broom.levitate) {
      wizard.animateWand();
    }
  }
}

function drawPet() {
  if (pet) {
    pet.color = pet.color || randomColor();

    if (pet.type == "cat") {
      drawCat(pet.x, pet.y, pet.color);

    } else if (pet.type == "frog") {
      drawFrog(pet.x, pet.y, pet.color);

    } else if (pet.type == "ghost") {
      drawGhost(pet.x, pet.y, pet.color);

    } else {
      drawUnknown(pet.x, pet.y, pet.color);
    }
  }
}

function drawCat(x, y, color) {
  noStroke();
  fill(color);

  // body
  ellipse(x, y + 20, 30, 35);

  // head
  ellipse(x, y - 10, 40, 35);
  triangle(x - 20, y - 10, x -2, y - 25, x - 18, y - 40);
  triangle(x, y - 25, x + 20, y - 10, x + 15, y - 40);

  // eyes
  fill("limegreen");
  ellipse(x - 8, y - 15, 12, 10);
  ellipse(x + 8, y - 15, 12, 10);
}

function drawFrog(x, y, color) {
  noStroke();
  fill(color);

  // body
  ellipse(x, y + 20, 30, 35);

  // head
  ellipse(x, y, 50, 25);
  ellipse(x + 6, y - 10, 20, 20);
  ellipse(x - 6, y - 10, 20, 20);

  // eyes
  fill("yellow");
  ellipse(x + 6, y - 15, 10, 8);
  ellipse(x - 6, y - 15, 10, 8);
}

function drawGhost(x, y, color) {
  // make color transparent
  color.setAlpha(150);

  // head / body
  noStroke();
  fill(color);
  rect(x - 15, y - 30, 30, 60, 20, 20, 0, 0);

  // eyes
  fill("black");
  ellipse(x - 5, y - 15, 8, 8);
  ellipse(x + 5, y - 15, 8, 8);
}

function drawUnknown(x, y, color) {
  // create shaking effect
  x = x + random(-1, 1);
  y = y + random(-1, 1);

  noStroke();
  fill(color);
  textSize(60);
  text("?", x - 10, y);
}

function drawTiles() {
  stroke("#b2b0ae");
  strokeWeight(1);
  var tileSize = 50;
  for (var column = 0; column < width; column += tileSize) {
    line(0, column, width, column);
  }
  for (var row = 0; row < height; row += tileSize) {
    line(row, 0, row, height);
  }

  // draw darker lines separating the rooms
  strokeWeight(3);
  line(0, height/2, width, height/2);
  line(width/2, 0, width/2, height);
}

function drawCastle(x = 0, y = 0){
  // draw each room
  drawTiles();
  drawBedroom(x, y);
  drawStudy(x + width/2, y);
  drawKitchen(x, y + height/2);
  drawGreatRoom(x + width/2, y + height/2);
}

function drawBedroom(x, y) {
  drawRoomLabel("Bedroom",  x + 5, y + 190);

  // draw bed
  var bedX = x + 10;
  var bedY = y + 2;
  stroke("brown");
  strokeWeight(5);
  rect(bedX, bedY, 80, 135);

  // draw covers
  noStroke();
  fill("white");
  rect(bedX, bedY, 80, 35);
  fill("lightblue");
  rect(bedX, bedY + 35, 80, 100);
}

function drawKitchen(x, y) {
  drawRoomLabel("Kitchen",  x + 5, y + 190);

  // draw fireplace
  var fireplaceX = x;
  var fireplaceY = y + 30;
  fill("gray");
  rect(fireplaceX, fireplaceY, 60, 80);

  // draw cauldron
  var cauldX = x + 10;
  var cauldY = y + 50;
  fill("darkgray");
  rect(cauldX - 4, cauldY - 3, 48, 6, 20);
  rect(cauldX, cauldY, 40, 40, 0, 0, 20, 20);

  // draw fire
  var fireX = x + 15;
  var fireY = y + 95;
  fill("orange");

  while (fireX < 40) {
    var flameHeight = 0;

    triangle(fireX, fireY, fireX + 10, fireY, fireX + 5, fireY - flameHeight);
    fireX += 7;
  }
}

function drawStudy(x, y) {
  drawRoomLabel("Study",  x + 160, y + 190);

  // draw desk
  fill("brown");
  var deskX = x + width/2 - 60;
  var deskY = y + 20;
  rect(deskX, deskY, 60, 140);
}

function drawGreatRoom(x, y) {
  drawRoomLabel("Great Room", x + 120, y + 190);

  // draw rug
  var rugX = x + 25;
  var rugY = y + 25;

  fill("darkblue");
  strokeWeight(3);
  stroke("black");
  rect(rugX, rugY, 140, 100, 2);
}

function drawRoomLabel(string, x, y) {
  fill(0, 0, 0, 50);
  noStroke();
  textSize(14);
  text(string, x, y);
}

function drawBroom() {
  if (broom) {

    if (broom.levitate) {
      broom.x = mouseX;
      broom.y = mouseY;
    }

    push();
    translate(broom.x, broom.y);

    angleMode(DEGREES);
    if (broom.levitate) {
      rotate(90);
    } else {
      rotate(5);
    }

    strokeWeight(3);
    stroke("brown");

    line(0 , 0, -60, 0);
    noStroke();
    fill("yellow");
    rect(0, -10, 30, 20);

    pop();
  }
}

function drawScroll() {
  if (magicScroll) {
    push();
    translate(magicScroll.x, magicScroll.y);
    angleMode(DEGREES);
    rotate(85);

    noStroke();
    fill("cream");
    rect(0, 0, 100, 30);
    fill("gold");
    rect(-5, -3, 6, 36, 5);
    rect(100, -3, 6, 36, 5);

    magicScroll.color = magicScroll.color || randomColor();
    magicScroll.inkVisibility = magicScroll.inkVisibility || 0;
    magicScroll.inkVisibility -= magicScroll.disappearSpeed || 5;
    var visibility = max(magicScroll.inkVisibility, 0);

    magicScroll.color.setAlpha(visibility);

    fill(magicScroll.color);
    textSize(14);
    text(magicScroll.message || "Code magic", 10, 20);

    pop();
  }
}
