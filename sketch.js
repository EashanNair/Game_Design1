var player, playerAnimation;
var bg1, bg1Image;
var bg2, bg2Image;
var enemy, enemyAnimation;
var friend, friendimage;
var coin, coinImage;

function preload(){
  bg1Image = loadImage("Bg1.jpg")
  bg2Image = loadImage("Bg2.jpg")
  playerAnimation = loadAnimation("player.png","Player1.png", "player2.png")
  coinImage =loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png")
}


function setup() {
  createCanvas(800,700);
  bg1 = createSprite(400,360)
  bg1.scale=3

  bg1.addImage(bg1Image)
  player = createSprite(400, 200, 50, 50);
  player.addAnimation("player",playerAnimation)
  wall1 = createSprite(600,player.y,50,300)
  wall1.visible = false
  wall2 = createSprite(200,player.y,50,300)
  wall2.visible = false
  player.scale=2
 
}

function draw() {
  // background(bg1Image);  
  camera.on();
  camera.x = player.x
  camera.y = player.y

  // wall1.x = player.x
  wall1.y = player.y

  // wall2.x = player.x
  wall2.y = player.y

  player.bounceOff(wall1)
  player.bounceOff(wall2)

  console.log(player.y)
  
  drawSprites();
  if(keyDown(UP_ARROW)){
   player.y = player.y - 10
  }

  if(keyDown(DOWN_ARROW)){
    player.y = player.y + 10
   }

   if(keyDown(RIGHT_ARROW)){
    player.x = player.x + 10
   }

   if(keyDown(LEFT_ARROW)){
    player.x = player.x - 10
   }

   if(player.y <-380){
    player.y = 1100
   }

   SpawnCoin()
   SpawnEnemy()
}

function SpawnEnemy(){
  if(frameCount% 120==0){
  enemy = createSprite(player.x+random(-150,+100), player.y-400, 30,30)
// enemy.addAnimation("enemy",enemyImage)
enemy.velocityY = 5
enemy.scale = 0.5
  }
}


function SpawnCoin(){
  if(frameCount% 100==0){
  coin = createSprite(player.x+random(-150,+100), player.y-400, 30,30)
coin.addAnimation("coin",coinImage)
coin.velocityY = 5
coin.scale = 0.5
  }
}