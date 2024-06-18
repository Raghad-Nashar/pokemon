// ============ variables ===================

const ScorElement=document.getElementById('score');
let Score=0;

sound = new Audio('assets/coin.mp3')
const player_speed=1.8;
const Grass_class='grass',
      grass_cont =50;
const BALL_CLASS='pokeball',
      ball_cont =5;

 let playerpos ={
   x:0,
   y:0,
 }
 let playervel ={
   x:0,
   y:0,
 }

 const PLAYER =document.querySelector('.player');

 const StartPlayerPos ={
    x: window.innerWidth /2,
    y: window.innerHeight /2,
 }

// ============ Game Function ===========

function start(){
    generateRondomElment(Grass_class,grass_cont);
    generateRondomElment(BALL_CLASS,ball_cont);
    playerpos= StartPlayerPos;
}

function update(){
    playerpos.x += playervel.x;
    playerpos.y += playervel.y;
    PLAYER.style.left = playerpos.x +"px";
    PLAYER.style.top = playerpos.y +"px";
    
    checkCollisions()

    requestAnimationFrame(update);
}

// ==========handle player movement=======

window.addEventListener('keydown', e =>{
  if(e.key == "ArrowUp"){
    playervel.y=-1 * player_speed ;
    PLAYER.style.backgroundImage= "url('assets/player_front.png')";

  }
  if(e.key == "ArrowDown"){
    playervel.y= 1 * player_speed ;
    PLAYER.style.backgroundImage= "url('assets/player_back.png')";

  }
  if(e.key == "ArrowLeft"){
    playervel.x=-1 * player_speed ;
    PLAYER.style.backgroundImage= "url('assets/player_left.png')";

  }
  if(e.key == "ArrowRight"){
    playervel.x=1 * player_speed ;
    PLAYER.style.backgroundImage= "url('assets/player_right.png')";

  }
  PLAYER.classList.add('walk')

})
window.addEventListener('keyup',e =>{
  playervel.x=0;
  playervel.y=0;

  PLAYER.classList.remove('walk')

})

function generateRondomElment(className,elementCounnt){

    for(let cont =0 ;cont <elementCounnt;cont++){
        const newElement =document.createElement('div');
        newElement.classList.add(className);
        newElement.style.left =Math.random()* 100 +"%" ;
        newElement.style.top =Math.random()* 100 +"%" ;
        document.body.appendChild(newElement)
    }
}

function checkCollisions(){
  balls =document.querySelectorAll('.pokeball');
  balls.forEach(ball =>{
    if(collision(ball,PLAYER)){
      console.log('dfdsf')

      ball.style.left =Math.random()* 100 +"%" ;
      ball.style.top =Math.random()* 100 +"%" ;

      sound.play()
      Score++;



      ScorElement.innerHTML=`Score :  ${Score}`
          
      
    }
    
  })
}

// ==== check collsion between 2 dives ====

function collision($div1,$div2){
  var x1=$div1.getBoundingClientRect().left;
  var y1=$div1.getBoundingClientRect().left;
  var h1 =$div1.clientHeight;
  var w1 =$div1.clientHeight;
  var b1 =y1+h1;
  var r1 =x1+w1;




  var x2=$div2.getBoundingClientRect().left;
  var y2=$div2.getBoundingClientRect().left;
  var h2 =$div2.clientHeight;
  var w2 =$div2.clientHeight;
  var b2 =y2+h2;
  var r2 =x2+w2;

  if(b1 <y2 || y1>b2 || r1<x2 ||x1>r2) return false;
  return true;


}








// =============== Run The Game ==========
start();
update();