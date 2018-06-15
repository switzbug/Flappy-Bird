function Wall() {
  this.spacing = random(50,150);
  this.top = random(height / 6, 3 / 4 * height);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 80;
  this.speed = 6;

  this.highlight = false;

  this.hits = function(ball) {
    if (mouseY < this.top || mouseY > height - this.bottom) {
      if (mouseX> this.x && mouseX < this.x + this.w) {
        this.highlight = true;
        this.speed=0;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    fill('#aaaaaa');
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}
