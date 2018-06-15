var ball;
var walls = [];
var gameOverMenu = document.getElementById("gameOver");
var restartButton = document.getElementById("restartButton");

function setup() {
  createCanvas(640, 480);
  ball = new Ball();
  walls.push(new Wall());
  gameOverMenu.style.visibility="hidden";
}
var n=75
function draw() {
  background('#3b6f96');

  for (var i = walls.length-1; i >= 0; i--) {
    walls[i].show();
    walls[i].update();

    if (walls[i].hits(ball)) {


gameOverMenu.style.visibility="visible";
gameOverMenu.style.top=height/2-130;
gameOverMenu.style.left=width/2-170;
while(walls.length>=1){
  walls.pop();
}
restartButton.addEventListener("click",reset);



      break;
    }

    if (walls[i].offscreen()) {
      walls.splice(i, 1);
    }



  ball.show();

  if (frameCount % n == 0) {
    walls.push(new Wall());
  }
}

}
function reset()
{
  setup();
  draw();
}
