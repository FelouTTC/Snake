const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const foodImg = new Image();
foodImg.src = "img/food.png";

const zalup = new Image();
zalup.src = "img/zalup.jpg"

const stvol = new Image();
stvol.src = "img/stvol.jpg"

class SnakeS {
  constructor() {
    this.box = 20;
    this.score = 0;
    this.snake = [];
    this.snake[0] = {
      x: 20 * this.box,
      y: 20 * this.box
    };
    this.food = {
      x: Math.floor((Math.random() * 40)) * this.box,
      y: Math.floor((Math.random() * 40 + 5)) * this.box,
    };
  }


  createField() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, 100);
    ctx.closePath();


    for (let i = 0; i <= 40; i++) {
      for (let j = 5; j <= 45; j++) {
        ctx.fillStyle = ((i + j) % 2) ? '#34c924' : '#c2ff99';
        ctx.beginPath();
        ctx.fillRect(i * this.box, j * this.box, this.box, this.box)
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

Snakee = new SnakeS();

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != "right")
    dir = "left";
  else if (event.keyCode == 38 && dir != "down")
    dir = "up";
  else if (event.keyCode == 39 && dir != "left")
    dir = "right";
  else if (event.keyCode == 40 && dir != "up")
    dir = "down";
  else if (event.keyCode == 32)
    dir = "start";
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      reload = setInterval(() => {
        if (dir == "start") {
          window.location.reload();
          clearInterval(reload);
        }
      }, 10);
    }
  }
}

function drawGame() {
  Snakee.createField();
  ctx.drawImage(foodImg, Snakee.food.x, Snakee.food.y, Snakee.box, Snakee.box);
  ctx.drawImage(foodImg, Snakee.box * 1, Snakee.box * 2, Snakee.box * 2, Snakee.box * 2);

  for (let i = 0; i < Snakee.snake.length; i++) {
    vb = i == 0 ? zalup : stvol;
    ctx.drawImage(vb, Snakee.snake[i].x, Snakee.snake[i].y, Snakee.box, Snakee.box);
    ctx.stroke();
  }

  ctx.fillStyle = "Black";
  ctx.font = "50px Arial";
  ctx.fillText(Snakee.score, Snakee.box * 3, Snakee.box * 3.8);
  let snakeX = Snakee.snake[0].x;
  let snakeY = Snakee.snake[0].y;

  if (snakeX == Snakee.food.x && snakeY == Snakee.food.y) {
    Snakee.score++;
    Snakee.food = {
      x: Math.floor((Math.random() * 40)) * Snakee.box,
      y: Math.floor((Math.random() * 40 + 5)) * Snakee.box,
    };
  } else {
    Snakee.snake.pop();
  }



  if (dir == "start") window.location.reload();
  if (dir == "left") snakeX -= Snakee.box;
  if (dir == "right") snakeX += Snakee.box;
  if (dir == "up") snakeY -= Snakee.box;
  if (dir == "down") snakeY += Snakee.box;

  if (snakeX + 1 < 0) {
    snakeX = Snakee.box * 40
  } else if (snakeX > Snakee.box * 40) {
    snakeX = 0
  } else if (snakeY < 5 * Snakee.box) {
    snakeY = Snakee.box * 45
  } else if (snakeY > Snakee.box * 45) {
    snakeY = Snakee.box * 5;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, Snakee.snake);

  Snakee.snake.unshift(newHead);
}

let game = setInterval(drawGame, 60);
