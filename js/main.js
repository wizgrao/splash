var renderer = PIXI.autoDetectRenderer(512, 512);

document.body.appendChild(renderer.view);
const timePerStage = 15;
var changeCtr =0;
var frameCtr = 0;
var stage = new PIXI.Container();
var backgroundSprite;
var backgroundTextures = [];
var fr = 0; //background frame
var ctr = 0; //frame counter
var bgNum = 0;
var stageNum = 4;
var backgroundLengths = [6,4,8,1,1,1, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var backgroundURL = ["img/level1.jpg", "img/level2.jpg", "img/level3.jpg",
                      "img/sg/sb/End.png", "img/sg/sb/End1.png",
                    "img/sg/sb/Start_Screen_2.jpg",
                    "img/sg/sb/Start_Screen.jpg",
                  "img/sg/sb/How_To_Play_Description.png",
                "img/sg/sb/How_To_Play_Description_A.png",
              "img/sg/l1/Level_1_Sky.png",
            "img/sg/l1/Level_1_Sky_A.png",
          "img/sg/l1/Level_1_Avoid.png","img/sg/l1/Level_1_Avoid_A 2.png",
        "img/sg/l2/Level_2_Pipe_A.png","img/sg/l2/Level_2_Pipe.png",
      "img/sg/l2/Level_2_Avoid.png","img/sg/l2/Level_2_Avoid_A.png",
    "img/sg/l3/Level_3_Underwater.png","img/sg/l3/Level_3_Underwater_A.png",
    "img/sg/l3/Level_1_Avoid_A1.png", "img/sg/l3/Level_1_Avoid.png", "img/sg/l1/Level_1_Fact.png", "img/sg/l1/Level_1_P.png", 
    "img/sg/l1/Level_1_P_A.png", "img/sg/l2/Level_2_Infiltration_1.png","img/sg/l2/Level_2_Infiltration_2.png", 
    "img/sg/l2/Level_2_Infiltration_3.png", "img/sg/l2/Level_2_Infiltration_4.png","img/sg/l2/Level_2_Infiltration_5.png",
    "img/sg/l2/Level_2_Infiltration_6.png", "img/sg/l2/Level_2_Infiltration_7 2.png", "img/sg/l2/Level_2_Infiltration_8.png",
    "img/sg/l2/Level_2_Infiltration_9.png","img/sg/l2/Level_2_Fact.png", "img/sg/l3/Level_3_Evaporation.png", "img/sg/l3/Level_3_Evaporation_A.png", "img/sg/l3/Untitled_Artwork.png"];
var enemyURL = ["img/sg/l1/Air1.png", "img/sg/l1/Air2.png", "img/sg/l1/Air3.png",
                "img/sg/l2/Sewer1.png", "img/sg/l2/Sewer2.png", "img/sg/l2/Sewer3.png",
              "img/sg/l3/Plastic1.png", "img/sg/l3/Plastic2.png", "img/sg/l3/Plastic3.png"];


var isLeft = false;
var isRight = false;
var isUp = false;
var isDown = false;

var enemies = []

var splish;

var splishTextures = [];
var splishURL = ["img/sg/Drops/Drop1.png","img/sg/Drops/Drop2.png",
                "img/sg/Drops/Drop3.png","img/sg/Drops/Drop4.png",
                "img/sg/Drops/Drop5.png"];

var health = 0;

var enemyTextures = [];


var screen;



var splishVel = 5;
var enemyVel = 3;

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
splishURL.forEach(function(element){
  PIXI.loader.add(element)
});

enemyURL.forEach(function(element){
  PIXI.loader.add(element)
});

PIXI.loader.load(setup);

function setup(){
    for(var i = 0 ; i < backgroundURL.length; i++){
      backgroundTextures.push(PIXI.loader.resources[backgroundURL[i]].texture)
    }

    splishURL.forEach(function(element){
      splishTextures.push(PIXI.loader.resources[element].texture)
    });
    enemyURL.forEach(function(element){
      enemyTextures.push(PIXI.loader.resources[element].texture)
    });

    splish = new PIXI.Sprite(splishTextures[0]);


    backgroundSprite = new PIXI.Sprite(backgroundTextures[0]);
    stage.addChild(backgroundSprite);

    splish.width = 91;
    splish.height = 128;
    console.log(splish);
    renderer.render(stage);

    gameLoop();
}


function stage1(){
  stage.addChild(splish)
  changeCtr ++;
  bgNum = 0;
  splish.y = 0;
  if(isLeft){
    splish.x -= splishVel;
  }
  if(isRight){
    splish.x += splishVel;
  }

  if(splish.x <0){
    splish.x = 0;
  }
  if(splish.x > 512 - splish.width){
    splish.x = 512 - splish.width;
  }
  if(Math.random() < 1.0/60.0){
    var obsNum = Math.floor(Math.random() * 3);
    enemies.push(new PIXI.Sprite(enemyTextures[obsNum]));
    var ind = enemies.length - 1;
    enemies[ind].width = 64;
    enemies[ind].height = 64;
    enemies[ind].x = Math.random()*(512-64);
    enemies[ind].y = 512-64;
    stage.addChild(enemies[ind]);
  }

  for(var i = 0; i < enemies.length; i ++){
    enemies[i].y -= enemyVel;
    if(hitTestRectangle(enemies[i],splish)){
      health +=1;
      stage.removeChild(enemies[i]);
      enemies.splice(i,1);
      i--;
      if(health >= splishTextures.length -1){
        splish.texture = splishTextures[health];
        lose();
        return;
      }
    }
    if(enemies[i].y < -enemies[i].height){
      stage.removeChild(enemies[i]);
      enemies.splice(i,1);
      i--;
    }


  }
  splish.texture = splishTextures[health];

  if(changeCtr >=60*timePerStage){
    document.getElementById("music").src = "pipe.mp3";
    changeCtr = 0;
    splish.x = 0;
    splish.y = 512/2 - 128/2;
    stageNum = 8;
    stage.removeChild(splish);
    for(var i = 0; i < enemies.length; i ++){
      stage.removeChild(enemies[i]);

      enemies.splice(i,1);
      i--;
    }
  }
}
function stage2(){
      stage.addChild(splish);
  changeCtr ++;
  bgNum = 1;
  if(isUp){
    splish.y -= splishVel;
  }
  if(isDown){
    splish.y += splishVel;
  }

  if(splish.y <32){
    splish.y = 32;
  }
  if(splish.y> 512 - 128 - 32){
    splish.y = 512 - 128 - 32;
  }
  if(Math.random() < 1.0/60.0){
    var obsNum = Math.floor(Math.random() * 3)+3;
    enemies.push(new PIXI.Sprite(enemyTextures[obsNum]));
    var ind = enemies.length - 1;
    enemies[ind].width = 64;
    enemies[ind].height = 64;
    enemies[ind].y = Math.random()*(512-128) + 32;
    enemies[ind].x = 512;
    stage.addChild(enemies[ind]);
  }

  for(var i = 0; i < enemies.length; i ++){
    enemies[i].x -= enemyVel;
    if(hitTestRectangle(enemies[i],splish)){
      health +=1;
      stage.removeChild(enemies[i]);
      enemies.splice(i,1);
      i--;
      if(health >= splishTextures.length -1){
        splish.texture = splishTextures[health];
        lose();
        return;
      }
    }
    if(enemies[i].x < - enemies.width){
      stage.removeChild(enemies[i]);
      enemies.splice(i,1);
      i--;
    }


  }
  splish.texture = splishTextures[health];

  if(changeCtr >=60*timePerStage){
    document.getElementById("music").src = "Music/Water theme.mp3";
    changeCtr = 0;
    stageNum = 10;
    stage.removeChild(splish);
    for(var i = 0; i < enemies.length; i ++){
      stage.removeChild(enemies[i]);

      enemies.splice(i,1);
      i--;
    }
  }
}
function stage3(){
      stage.addChild(splish);
  changeCtr ++;
  bgNum = 2;
  if(isUp){
    splish.y -= splishVel;
  }
  if(isDown){
    splish.y += splishVel;
  }

  if(splish.y <0){
    splish.y = 0;
  }
  if(splish.y> 512 - 128){
    splish.y = 512 - 128;
  }
  if(Math.random() < 1.0/60.0){
    var obsNum = Math.floor(Math.random() * 3)+6;
    enemies.push(new PIXI.Sprite(enemyTextures[obsNum]));
    var ind = enemies.length - 1;
    enemies[ind].width = 64;
    enemies[ind].height = 64;
    enemies[ind].y = Math.random()*(512-64);
    enemies[ind].x = 512;
    stage.addChild(enemies[ind]);
  }

  for(var i = 0; i < enemies.length; i ++){
    enemies[i].x -= enemyVel;
    if(hitTestRectangle(enemies[i],splish)){
      health +=1;
      stage.removeChild(enemies[i]);
      enemies.splice(i,1);
      i--;
      if(health >= splishTextures.length -1){
        splish.texture = splishTextures[health];
        lose();
        return;
      }
    }
    if(enemies[i].x < -enemies.width){
      stage.removeChild(enemies[i]);
      enemies.splice(i,1);
      i--;
    }


  }
  splish.texture = splishTextures[health];

  if(changeCtr >=60*timePerStage){
    document.getElementById("music").src = "Music/Sky theme.mp3";
    stage.removeChild(splish)
    changeCtr = 0;
    stageNum = 6;
    for(var i = 0; i < enemies.length; i ++){
      stage.removeChild(enemies[i]);
      enemies.splice(i,1);
      i--;
    }
  }
}
function loseStage(){
  bgNum = 3;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

}
function lose(){
  stageNum = 3;
  bgNum = 3;
  document.getElementById("music").src = "Music/Game Over Screen.mp3"
  for(var i = 0; i < enemies.length; i ++){
    stage.removeChild(enemies[i]);
    enemies.splice(i,1);
    i--;
  }
}
function startStage(){

  bgNum = 5;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

  if(isLeft || isRight || isUp || isDown ){
    stageNum = 5;
    clearButtons();
  }
}
function Fact1Stage(){

  bgNum = 21;

  if(isLeft || isRight || isUp || isDown ){
    stageNum = 0;
    clearButtons();
  }
}
function howToPlayStage(){
  bgNum = 7;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

  if(isLeft || isRight || isUp || isDown ){
    stageNum = 6;
    document.getElementById("music").src = "Music/Sky theme.mp3";
    clearButtons();
  }
}
function skyStage(){


  bgNum = 9;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

  if(isLeft || isRight || isUp || isDown ){
    stageNum = 7;
    clearButtons();
  }
}
function skyAvoid(){
  bgNum = 11;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

  if(isLeft || isRight || isUp || isDown ){
    stageNum = 13;
    clearButtons();
  }
}
function condensation(){
  bgNum = 24;
    if(frameCtr % 63 >=7)
      bgNum = 25;
    if(frameCtr % 63 >=14)
      bgNum = 26;
    if(frameCtr % 63 >=21)
      bgNum = 27;
    if(frameCtr % 63 >=28)
      bgNum = 28;
    if(frameCtr % 63 >=35)
      bgNum = 29;
    if(frameCtr % 63 >=42)
      bgNum = 30;
    if(frameCtr % 63 >=49)
      bgNum = 31;
    if(frameCtr % 63 >=56)
      bgNum = 32;
  
  

  if(isLeft || isRight || isUp || isDown ){
    stageNum = 15 ;
    clearButtons();
  }
}

function fact2(){
  bgNum =33;
 
  if(isLeft || isRight || isUp || isDown ){
    stageNum = 1 ;
    clearButtons();
  }
}
function sewerStage(){

  bgNum = 13;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

  if(isLeft || isRight || isUp || isDown ){
    stageNum = 9;
    clearButtons();
  }
}
function sewerAvoid(){
  bgNum = 15;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

  if(isLeft || isRight || isUp || isDown ){

    stageNum = 14;
    clearButtons();
  }
}
function waterStage(){

  bgNum = 17;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

  if(isLeft || isRight || isUp || isDown ){
    stageNum = 11;
    clearButtons();
  }
}
function evaporation(){

  bgNum = 34;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

  if(isLeft || isRight || isUp || isDown ){
    stageNum = 17;
    clearButtons();
  }
}
function fact3(){

  bgNum = 36;


  if(isLeft || isRight || isUp || isDown ){
    stageNum = 2;
    clearButtons();
  }
}
function preface1(){

  bgNum = 22;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

  if(isLeft || isRight || isUp || isDown ){

    stageNum = 12;
    clearButtons();
  }
}
function waterAvoid(){
  bgNum = 19;
  if(frameCtr % 14 >=7){
    bgNum ++;
  }

  if(isLeft || isRight || isUp || isDown ){

    stageNum = 16;
    clearButtons();
  }
}
var stageMethods = [stage1, stage2, stage3, loseStage, startStage,
  howToPlayStage, skyStage, skyAvoid, sewerStage, sewerAvoid, waterStage, waterAvoid, Fact1Stage,preface1, condensation, fact2,evaporation, fact3];


function updateBackground(){
  ctr++;
  if(ctr%5 == 0){
    fr += 1;
    fr %= backgroundLengths[bgNum];
    ctr =0;
  }
  backgroundSprite.texture  = backgroundTextures[bgNum];

  backgroundSprite.texture.frame = new PIXI.Rectangle(1024*fr,0,1024,1024);
  backgroundSprite.width =  512;
  backgroundSprite.height = 512;
}

function gameLoop() {
  frameCtr ++;
  requestAnimationFrame(gameLoop);
  updateBackground();
  stageMethods[stageNum]();
  renderer.render(stage);
}

function hitTestRectangle(r1, r2) {

  //Calculate `centerX` and `centerY` properties on the sprites
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Calculate the `halfWidth` and `halfHeight` properties of the sprites
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Create a `collision` variable that will tell us
  //if a collision is occurring
  let collision = false;

  //Check whether the shapes of the sprites are overlapping. If they
  //are, set `collision` to `true`
  if (Math.abs(r1.centerX - r2.centerX) < r1.halfWidth + r2.halfWidth
  && Math.abs(r1.centerY - r2.centerY) < r1.halfHeight + r2.halfHeight) {
    collision = true;
  }

  //Return the value of `collision` back to the main program
  return collision;
}
function clearButtons(){
  isDown = false;
  isUp = false;
  isRight = false;
  isLeft = false;
}
