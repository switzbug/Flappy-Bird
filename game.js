var context;
var screenWidth;
var screenHeight;
var ball;
var wall = [];
var enemy = [];
var gameStatus;
var mouseX;
var mouseY;
var gameOver;
var running = false;
var raf;
var restartButton
var test_interval1;
var test_interval2;
var restartButton;
var score = 0;
var play;
var scoreBoard;
var score2;
var t;

start();

function start() {
    gameIntialize();
    gameDraw();
    gameLoop();
    gameOver.style.visibility = "hidden";
}

function Ball() {
    this.radius = 16;
    this.x = 25;
    this.y = screenHeight / 2;
    this.ballDraw = function() {
        context.beginPath();
        context.arc(this.x, this.y, 16, 0, 2 * Math.PI);
        context.fillStyle = 'green';
        context.fill();
    }
};


function Wall() {
    this.thickness = 10;
    this.wallPositionY = screenHeight;
    this.wallPositionX = screenWidth;
    this.spacing = 0;

    if (this.wallPositionY > 400 && this.wallPositionY <= 500) {
        this.spacing = Math.floor(Math.random() * (100 - 50) + 50);
    } else if (this.wallPositionY > 500) {
        this.spacing = Math.floor(Math.random() * (200 - 100) + 100);
    } else {
        this.spacing = 45;
    }

    this.heightFromTheTop = Math.floor(Math.random() * (this.wallPositionY / 6 - 3 / 4 * this.wallPositionY) + 3 / 4 * this.wallPositionY);
    this.heightFromTheBottom = this.wallPositionY - (this.heightFromTheTop + this.spacing);
    this.speed = 6;

    this.draw = function() {

        context.fillStyle = 'yellow';
        context.fillRect(this.wallPositionX, 0, this.thickness, this.heightFromTheTop);
        context.fillRect(this.wallPositionX, this.wallPositionY - this.heightFromTheBottom, this.thickness, this.heightFromTheBottom);
    }

    this.update = function() {
        this.wallPositionX = this.wallPositionX - this.speed;
    }

    this.offscreen = function() {
        if (this.wallPositionX < -this.thickness) {
            return true;
        } else {
            return false;
        }
    }
    this.check = function(ball) {
        if (ball.x + ball.radius > this.wallPositionX && ball.x - ball.radius < this.wallPositionX + this.thickness) {
            if (ball.y - ball.radius < this.heightFromTheTop || ball.y + ball.radius > this.heightFromTheTop + this.spacing) {
                return true;
            }
        }

    }
};

function Enemy() {
    this.enradius = 7;
    this.enx = screenWidth;
    this.eni = Math.floor(Math.random() * 2);
    this.eny = this.eni * screenHeight / 2 + Math.floor(screenHeight / Math.floor((Math.random() * (16 - 2) + 2)));
    this.enspeedx = 3;
    this.enspeedy = 3;

    this.endraw = function() {
        context.beginPath();
        context.arc(this.enx, this.eny, this.enradius, 0, 2 * Math.PI);
        context.fillStyle = 'blue';
        context.fill();

    }
    this.enupdate = function(ball) {
        this.enx = this.enx - this.enspeedx;

        if (ball.y < this.eny) {
            this.eny = this.eny - this.enspeedy;
        } else if (ball.y > this.eny) {
            this.eny = this.eny + this.enspeedy;
        }

    }
    this.encheckenemy = function(ball) {

        if (((this.enx - this.enradius < ball.x + ball.radius) && (this.enx - this.enradius > ball.x - ball.radius)) || ((this.enx + this.enradius < ball.x + ball.radius) && (this.enx + this.radius > ball.x - ball.radius))) {
            if (((this.eny + this.enradius > ball.y - ball.radius) && (this.eny + this.enradius < ball.y + ball.radius)) || ((this.eny - this.enradius > ball.y - ball.radius) && (this.eny - this.enradius < ball.y + ball.radius))) {
                return true;
            }
        }
    }
    this.enoffscreenenemy = function() {
        if (this.enx < -2 * this.enradius) {
            return true;
        }
    }

};



function gameIntialize() {
    var canvass = document.getElementById('canvas');

    context = canvas.getContext('2d');
    gameOver = document.getElementById('gameOver')
    restartButton = document.getElementById('restartButton');
    play = document.getElementById('play');
    scoreboard = document.getElementById('scoreboard');
    score2 = document.getElementById('score2');

    play.style.visibility = "visible";

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;


    canvas.width = screenWidth;
    canvas.height = screenHeight;

    ball = new Ball();
    wall.push(new Wall());
    enemy.push(new Enemy());
    drawScoreBoard();

    restartButton.addEventListener("click", reset);
    window.addEventListener('resize', resizeScreen, false);

    canvas.addEventListener('mousemove', function(e) {
        if (!running) {
            var xpos = e.clientX;
            var ypos = e.clientY;
            if (xpos >= screenWidth / 4) {
                ball.x = screenWidth / 4;
                ball.y = ypos;
            } else if (xpos <= screenWidth / 15) {
                ball.x = screenWidth / 15;
                ball.y = ypos;
            } else {
                {
                    ball.x = xpos;
                    ball.y = ypos;
                }
            }

        }
    });


}

function gameDraw() {
    context.fillStyle = "#aaaaaa";
    context.fillRect(0, 0, screenWidth, screenHeight);

    ball.ballDraw();

    for (var i = wall.length - 1; i >= 0; i--) {

        wall[i].draw();
        wall[i].update();

        if (wall[i].offscreen()) {
            wall.splice(i, 1);
        }
        if (wall[i].check(ball)) {
            gameOverR();
            break;
            restartButton.addEventListener("click", reset);
        }
    }

    for (var j = enemy.length - 1; j >= 0; j--) {
        enemy[j].endraw();
        enemy[j].enupdate(ball);

        if (enemy[j].enoffscreenenemy()) {
            enemy.splice(j, 1);
        }

        if (enemy[j].encheckenemy(ball)) {
            gameOverR();
            break;
            restartButton.addEventListener("click", reset);
        }
    }
    raf = window.requestAnimationFrame(gameDraw);
}

function gameLoop() {
    test_interval1 = setInterval(function() {
        wall.push(new Wall());
    }, 1500);
    test_interval2 = setInterval(function() {
        enemy.push(new Enemy());
    }, 5000);
    t = setInterval(function() {
        score++;
        drawScoreBoard();
    }, 1000);
}


function resizeScreen() {
    var newGameScreenWidth;
    var newGameScreenHeight;

    newGameScreenWidth = window.innerWidth;
    newGameScreenHeight = window.innerHeight;

    screenWidth = newGameScreenWidth;
    screenHeight = newGameScreenHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    gameDraw();
}

function reset() {
    score = 0;
    start();
}

function gameOverR() {
    gameOver.style.visibility = "visible";
    play.style.visibility = "hidden";

    score2.innerHTML = "Score : " + score;

    gameOver.style.top = (screenHeight / 2) - 140 + "px";
    gameOver.style.left = (screenWidth / 2) - 160 + "px";

    clearInterval(test_interval1);
    clearInterval(test_interval2);
    clearInterval(t);

    while (wall.length >= 1) {
        wall.pop();
    }
    while (enemy.length >= 1) {
        enemy.pop();
    }
}

function drawScoreBoard() {
    scoreboard.innerHTML = "Score : " + score;
}
