var monkey, monkey_running
var gameOver, gameOverImage
var banana, bananaImage
var stone, stoneImage
var FoodGroup, banana
var stoneGroup, stone
var stone1Group, stone1
var bananaScore = 0
var bg, backgroundImage, invisibleGround;
var START
var PLAY = 1
var END = 0
var gameState = START

function preload() {

  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  backgroundImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  gameOverImage = loadImage("gameover.png")

}

function setup() {
  createCanvas(800, 500);

  bg = createSprite(0,0,800,500)
  bg.scale = 1.5;
  bg.velocityX = -5
  bg.addImage("BG", backgroundImage);
  bg.x = bg.width / 2;

  invisibleGround = createSprite(250, 380, 500, 10);
  invisibleGround.visible = false;

  monkey = createSprite(40, 350, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.setCollider("circle", 0, 0, 300);

  gameOver = createSprite(300, 300)
  gameOver.addImage(gameOverImage);

  FoodGroup = new Group();
  stoneGroup = new Group();
  stone1Group = new Group();
  
}


function draw() {
  background("white");

  drawSprites();
  if (gameState === START) {
    invisibleGround.visible = false;
    bg.visible = false;
    monkey.visible = false;
    bg.velocityX = 0;
    stoneGroup.velocityX = 0;
    FoodGroup.velocityX = 0;
    stroke("Black");
    fill("black");
    textSize(20)
    text("Press 'S' Key To Start The Game", 150, 250)
    gameOver.visible = false;
  }

  if (keyDown("s") && gameState === START) {
    gameState = PLAY;
  }

  if (gameState === PLAY) {

    if (keyDown("space") && monkey.y >= 280) {
      monkey.velocityY = -12
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisibleGround);

    stroke("Black");
    textSize(20);
    fill("black");

    bg.velocityX = -6;
    stoneGroup.velocityX = -6;
    stone1Group.velocityX = -6;
    FoodGroup.velocityX = -6;
    gameOver.visible = false;
    bg.visible = true;
    monkey.visible = true;

    text("BANANA SCORE: " + bananaScore, 160, 80);
    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }

    banana();
    stone();
    stone1();

    var rand = Math.round(random(10, 60));
    switch (bananaScore) {

      case 10:
        monkey.scale = 0.12
        break;

      case 20:
        monkey.scale = 0.14

        break;
      case 30:
        monkey.scale = 0.16

        break;
      case 40:
        monkey.scale = 0.18

        break;
      case 50:
        monkey.scale = 0.20

        break;
      case 60:
        monkey.scale = 0.22
        break;

      default:
        break;
    }

    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      bananaScore = bananaScore + 2;
    }

    if (monkey.isTouching(stoneGroup)) {
      monkey.scale = 0.02;
     // gameState = END;
      stoneGroup.destroyEach();
    }
    
     if (monkey.isTouching(stone1Group)) {
      gameState = END;
      stone1Group.destroyEach();
    }

  } else if (gameState === END) {
    bg.velocityX = 0;
    stoneGroup.velocityX = 0;
    stone1Group.velocityX = 0;
    FoodGroup.velocityX = 0;
    bg.visible = false;
    gameOver.visible = true;
    monkey.visible = false;
  }
}

function banana() {
  if (frameCount % 130 === 0) {
    var banana = createSprite(800, Math.round(random(170, 290)), 20, 20)
    banana.setCollider("circle", 0, 0, 200);
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.lifetime = 200;
    banana.scale = 0.05;
    FoodGroup.add(banana);
  }
}

function stone() {
  if (frameCount % 150 === 0) {
    var stone = createSprite(800, Math.round(random(350, 390)), 20, 20);
    Math.round(random())
    stone.setCollider("circle", 0, 0, 250);
    stone.addImage(stoneImage);
    stone.velocityX = -6;
    stone.lifetime = 200;
    stone.scale = 0.15;
    stoneGroup.add(stone);
  }
}

function stone1() {
  if (frameCount % 300 === 0) {
    var stone1 = createSprite(800, Math.round(random(350, 390)), 20, 20);
    stone1.setCollider("circle", 0, 0, 250);
    stone1.addImage(stoneImage);
    stone1.velocityX = -6;
    stone1.lifetime = 200;
    stone1.scale = 0.15;
    stone1Group.add(stone1);
  }
}