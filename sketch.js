var player, playerAnimation;
var bg1, bg1Image;
var bg2, bg2Image;
var enemy, enemyAnimation;
var friend, friendimage;
var coin, coinImage;
var bomb, bombImg
var orangeImage, bananaImage, appleImage;
var burstImg;
var rewardSelector;
var score = 0
var fruits = 10  
var coinGroup;
var enemyGroup;
var gameState = "play"
var button;

function preload(){
  bg1Image = loadImage("bg.png")
  bg2Image = loadImage("Bg2.jpg")
  playerAnimation = loadAnimation("player.png","Player1.png", "player2.png")
  coinImage =loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png")
  bombImg = loadImage("Bomb.png")
  orangeImage = loadImage("orange.png")
  bananaImage = loadImage("banana.png")
  appleImage = loadImage("apple.png")

}

function reducer(){
  if(frameCount % 120==0){
    fruits = fruits-2
  }
}

function setup() {
  createCanvas(800,700);
  bg1 = createSprite(400,-7000)
  bg1.scale=3
coinGroup=createGroup()
enemyGroup=createGroup()
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
  if(gameState == "play"){
  camera.on();
  camera.x = player.x
  camera.y = player.y 
reducer()
  // wall1.x = player.x
  wall1.y = player.y
  // wall2.x = player.x
  wall2.y = player.y

  player.bounceOff(wall1)
  player.bounceOff(wall2)

  console.log(player.y)
  
  drawSprites();
  fill("black")
  textSize(25)
  // text("Fruits:"+fruits, player.x-300,player.y -200)
  text("Score:"+score, player.x-300,player.y -200)
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

  //  if(player.y <-380){
  //   player.y = 1100
  //  }

  if(coinGroup.isTouching(player)){
    coinGroup[0].destroy()
    score ++
  }

  if(enemyGroup.isTouching(player)){
    player.visible = false
    gameState = "end"
  } 

   SpawnCoin()
   SpawnEnemy()

   randomSelector = Math.round(random(1,4))
  }else{
    background("black");
     button = createButton("Restart")
    textSize(35)
    fill("white")
    // text("Fruits:"+fruits, player.x-300,player.y -200)
    text("Your Score is "+score, camera.x-130, camera.y-100)
     button.position(300,400);
    button.style("font-size","40px")
    button.mousePressed(()=>{
    window.location.reload();
      
    })
  }
}

function SpawnEnemy(){
  if(frameCount% 120==0){
  enemy = createSprite(player.x+random(-150,+100), player.y-400, 30,30)
// enemy.addAnimation("enemy",enemyImage)
enemy.addImage(bombImg)
enemy.velocityY = 5
enemy.scale = 0.08
enemyGroup.add(enemy)
  }
}


function SpawnCoin(){
  if(frameCount% 50==0){
  coin = createSprite(player.x+random(-150,+100), player.y-400, 30,30)
switch(randomSelector){
case 1: coin.addAnimation("coin",coinImage)
break;
case 2: coin.addImage("apple",appleImage)
break;
case 3: coin.addImage("banana",bananaImage)
break;
case 4: coin.addImage("orange",orangeImage)
}
coin.velocityY = 5
coin.scale = 0.5
coinGroup.add(coin)
  }


}
