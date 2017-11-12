var renderer = PIXI.autoDetectRenderer(512, 512);

document.body.appendChild(renderer.view);

var changeCtr =0;

var stage = new PIXI.Container();
var backgroundSprite;
var backgroundTextures = [];
var fr = 0; //background frame
var ctr = 0; //frame counter
var stageNum = 0;
var backgroundLengths = [6,4,8];
var backgroundURL = ["img/level1.jpg", "img/level2.jpg", "img/level3.jpg"];

var isLeft = false;
var isRight = false;
var isUp = false;
var isDown = false;


function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}


var left = keyboard(37),
  up = keyboard(38),
  right = keyboard(39),
  down = keyboard(40);

left.press = function(){
  isLeft = true;
}
right.press = function(){
  isRight = true;
}
up.press = function(){
  isUp = true;
}
down.press = function(){
  isDown = true;
}


left.release = function(){
  isLeft = false;
}
right.release = function(){
  isRight = false;
}
up.release = function(){
  isUp = false;
}
down.release = function(){
  isDown = false;
}

backgroundURL.forEach(function(element){
  PIXI.loader.add(element)
});


PIXI.loader.load(setup);


function stage1(){
  changeCtr ++;
  if(changeCtr >=60*5){
    changeCtr = 0;
    stageNum = 1;
  }
  console.log("Stage 0");
}
function stage2(){
  changeCtr ++;
  if(changeCtr >=60*5){
    changeCtr = 0;
    stageNum = 2;
  }
  console.log("Stage 1");
}
function stage3(){
  changeCtr ++;
  if(changeCtr >=60*5){
    changeCtr = 0;
    stageNum = 0;
  }
  console.log("Stage 2");
}


var stageMethods = [stage1, stage2, stage3];
function setup(){
    for(var i = 0 ; i < backgroundURL.length; i++){
      backgroundTextures.push(PIXI.loader.resources[backgroundURL[i]].texture)
    }
    backgroundSprite = new PIXI.Sprite(backgroundTextures[0]);
    stage.addChild(backgroundSprite);
    renderer.render(stage);

    gameLoop();
}

function updateBackground(){
  ctr++;
  if(ctr%10 == 0){
    fr += 1;
    fr %= backgroundLengths[stageNum];
    ctr =0;
  }
  console.log(stageNum);
  backgroundSprite.texture  = backgroundTextures[stageNum];

  backgroundSprite.texture.frame = new PIXI.Rectangle(1024*fr,0,1024,1024);
  backgroundSprite.width =  512;
  backgroundSprite.height = 512;
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  updateBackground();
  stageMethods[stageNum]();
  renderer.render(stage);
}
