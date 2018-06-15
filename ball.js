function Ball() {
  this.y = height/2;
  this.x = 64;


  this.show = function() {
    fill('#ff1c1c');
    ellipse(mouseX, mouseY, 32, 32);
  }



}
