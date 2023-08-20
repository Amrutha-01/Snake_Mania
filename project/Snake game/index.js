const playarea = document.querySelector('.play-area');
let foodX; let foodY;
let directionX=0; let directionY=0;
let snakeBody=[];
let interval;
let snakeX = 5; let snakeY = 10; 
const highScoreEle=document.querySelector(".high-score");
let highScore=localStorage.getItem("high-score")||0;
const scoreEle=document.querySelector(".score");
let score=0;
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 29) + 1;
  foodY = Math.floor(Math.random() * 29) + 1;
};
const changeDirection = (r) => {
  console.log(r);
  if (r.key === "ArrowUp"&&directionY!=1) {
    directionX = 0;
    directionY = -1;
  }
  else if (r.key === "ArrowDown"&&directionY!=-1) {
    directionX = 0;
    directionY = 1;
  }
  else if (r.key === "ArrowLeft"&&directionX!=1) {
    directionX = -1;
    directionY = 0;
  }
  else if (r.key === "ArrowRight"&&directionX!=-1) {
    directionX = 1;
    directionY = 0;
  }
  game();
};
const game = () => {
    let html = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
    if(snakeX===foodX && snakeY===foodY){
      changeFoodPosition();
      snakeBody.push([foodX,foodY]);
      score+=1;
      highScore=score>=highScore?score:highScore;
      localStorage.setItem("high-score",highScore);
      scoreEle.innerHTML=`Score: ${score}`;
      highScoreEle.innerHTML=`High Score: ${highScore}`;
    }
    for(let j=snakeBody.length-1;j>0;j--){
      snakeBody[j]=snakeBody[j-1];
    }
    snakeBody[0]=[snakeX,snakeY];
    snakeX+=directionX;
    snakeY+=directionY;
    if(snakeX<=0||snakeX>30||snakeY<=0||snakeY>30){
      clearInterval(interval);
      alert("Game Over! Press OK to replay");
      location.reload();
    }
    for(let i=0;i<snakeBody.length;i++){
      html += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
      if(i!==0 && snakeBody[0][1]=== snakeBody[i][1] && snakeBody[0][0]=== snakeBody[i][0]){
        clearInterval(interval);
      alert("Game Over! Press OK to replay");
      location.reload();
      }
    }
    playarea.innerHTML = html;
  };
changeFoodPosition();
interval=setInterval(game,125);
document.addEventListener('keydown', changeDirection);