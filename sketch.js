var monkey, monkeyimg, monkey_still;
var jungle, jungleimg;
var ground;
var banana, bananaimg, bananagroup;
var stone, stoneimg, stonegroup;
var score;
var restart, restartimg, gameOver, gameimg;
var gameState;

function preload() {
  jungleimg = loadImage("images/jungle.jpg");
  stoneimg = loadImage("images/stone.png");
  bananaimg = loadImage("images/Banana.png");
  restartimg = loadImage("images/restart.png");
  gameimg = loadImage("images/gameOver.png");
  monkey_still = loadImage("images/Monkey_03.png");
  monkeyimg = loadAnimation("images/Monkey_01.png", "images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_04.png", "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png", "images/Monkey_08.png", "images/Monkey_09.png", "images/Monkey_10.png");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400, 150);
  jungle.addImage(jungleimg);
  jungle.velocityX = -4;
  jungle.scale = 1.2;

  ground = createSprite(400, 365, 800, 10);
  ground.visible = false;

  monkey = createSprite(200, 320, 0, 0);
  monkey.addAnimation("running", monkeyimg);
  monkey.scale = 0.14;
  monkey.addAnimation("still", monkey_still);

  restart = createSprite(400, 200, 0, 0);
  restart.addImage(restartimg);
  gameOver = createSprite(400, 250, 0, 0);
  gameOver.addImage(gameimg);
  gameOver.visible = false;
  restart.visible = false;

  bananagroup = new Group();
  stonegroup = new Group();

  gameState = "play";

  score = 0;

}

function draw() {

  if (keyDown("space") && monkey.collide(ground) && gameState === "play") {
    monkey.velocityY = -16;
  }
  monkey.velocityY += 0.8;
  monkey.collide(ground);

  //for conditions when game state is in play
  if (gameState === "play") {

    if (jungle.x < 200) {
      jungle.x = jungle.width / 2;
    }

    //to spawn bananas
    if (frameCount % 120 === 0) {
      bananas();
    }

    //to spawn rocks
    if (frameCount % 200 === 0) {
      obstacles();
    }

    //for winning and loosing conditions

    if (bananagroup.isTouching(monkey)) {
      bananagroup.destroyEach();
      score += 5;
    }

    if (stonegroup.isTouching(monkey)) {
      stonegroup.destroyEach();

      gameState = "end";
    }


  } if (gameState === "end") {

    jungle.velocityX = 0;

    monkey.changeAnimation("still", monkey_still);

    bananagroup.destroyEach();
    stonegroup.destroyEach();
    
    score = 0;

    gameOver.visible = true;
    restart.visible = true;

  }

  //   to restart the game
  if (mousePressedOver(restart) && gameState === "end") {

    gameState = "play";
    monkey.changeAnimation("running", monkeyimg);
    gameOver.visible = false;
    restart.visible = false;
    jungle.velocityX = -4;

    score = 0;
  }

  drawSprites();

  //for displaying score
  fill("yellow");
  textSize(20);
  text("Score: " + score, 520, 30);

}

function bananas() {

  banana = createSprite(815, random(150, 250), 0, 0);
  banana.addImage(bananaimg);
  banana.scale = 0.06;
  banana.velocityX = -(6 + score / 70);
  banana.lifetime = 220;
  bananagroup.add(banana);

}

function obstacles() {

  stones = createSprite(815, 360, 0, 0);
  stones.addImage(stoneimg);
  stones.scale = 0.2;
  stones.velocityX = -(6 + score / 70);
  stones.lifetime = 220;
  stones.setCollider("circle", 0, 30, 220);
  stonegroup.add(stones);

}