// Do not modify this file

class Wizard {
  constructor(info = {}) {
    // numbers
    this.x = width/2;
    this.y = height/2;
    this.directionX = 0;
    this.directionY = 0;
    this.walkSpeed = 0;

    // strings
    this.magicalName = info.magicalName;

    // colors
    this.defaultColor = 0;
    this.skinColor = info.skinColor || this.defaultColor + 50;
    this.robeColor = info.robeColor || this.defaultColor + 50;
    this.hatColor = info.hatColor || this.defaultColor + 50;
    this.wandColor = info.wandColor || this.defaultColor + 50;
    this.magicalNameColor = info.magicalNameColor || this.defaultColor;
  }

  animate() {
    this.updateDirection();
    this.drawSpeech();
    this.drawBody();
  }

  updateDirection() {
    // update directionX
    if (this.x < mouseX - 5) {
      this.directionX = 1;
    } else if (this.x > mouseX + 5) {
      this.directionX = -1;
    } else {
      this.directionX = 0;
    }
    // update directionY
    if (this.y < mouseY - 5) {
      this.directionY = 1;
    } else if (this.y > mouseY + 5) {
      this.directionY = -1;
    } else {
      this.directionY = 0;
    }
  }

  updatePosition() {
    // update x and y
    this.x = this.x + (this.directionX * this.walkSpeed);
    this.y = this.y + (this.directionY * this.walkSpeed);

    // limit x to within the canvas
    this.x = min(this.x, width);
    this.x = max(this.x, 0);

    // limit y to within the canvas
    this.y = min(this.y, height);
    this.y = max(this.y, 0);
  }

  drawBody() {
    // legs
    fill(this.skinColor || this.defaultColor);
    rect(this.x + 1, this.y - 20, 10, 20); // right leg
    rect(this.x - 11, this.y - 20, 10, 20); // left leg

    // robes
    fill(this.robeColor || this.defaultColor);
    rect(this.x - 16, this.y - 75, 30, 60, 20, 20, 0, 0);

    // head
    fill(this.skinColor || this.defaultColor);
    ellipse(this.x + this.directionX * 5, this.y - 85, 25, 35);

    // hat
    fill(this.hatColor || this.defaultColor);
    triangle(
      this.x - 14 + (this.directionX * 5), this.y - 90,
      this.x + 14 + (this.directionX * 5), this.y - 90,
      this.x, this.y - 120);

    this.drawName();

    // wand
    this.wandTipX = this.x + this.directionX * 35;
    this.wandTipY = this.y - 60;
    stroke(this.wandColor || this.defaultColor);
    strokeWeight(2);
    line(this.x + this.directionX * 25, this.y - 40, this.wandTipX, this.wandTipY)

    // hand
    noStroke();
    fill(this.skinColor || this.defaultColor);
    ellipse(this.x + this.directionX * 25, wizard.y - 40, 8, 8);
  }

  drawName() {
    if (this.magicalName) {
      noStroke();
      fill(this.magicalNameColor || this.defaultColor);
      textSize(14);
      text(this.magicalName[0], this.x - 6 + this.directionX * 8, this.y - 50);
    }
  }

  drawSpeech() {
    this.speechVisibility = this.speechVisibility || 0;
    this.speechVisibility -= 2;
    var visibility = max(0, this.speechVisibility);

    var bubbleColor = color(255);
    bubbleColor.setAlpha(visibility);
    var textColor = color(0);
    textColor.setAlpha(visibility);

    noStroke();
    fill(bubbleColor);
    rect(this.x + 25, this.y - 105, 100, 20, 10);
    fill(textColor);
    textSize(14);
    text(this.speech || "", this.x + 30, this.y - 90);
  }

  say(text) {
    this.speech = text;
    this.speechVisibility = 255;
  }

  animateWand() {
    fill(255);
    ellipse(this.wandTipX, this.wandTipY, 20, 20);
  }

  currentSpellName() {
    var string = this.currentSpell + "";
    var words = string.split('(');
    var final = words[0].split(" ");

    return "Current Spell: " + final[1];
  }

  castSpell() {
    if (this.currentSpell) {
      this.currentSpell();
    }
  }
}
