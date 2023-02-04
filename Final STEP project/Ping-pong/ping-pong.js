const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let puddleHit = new Audio('puddleHit.m4a');
let wallHit = new Audio('wallHit.m4a');
let scoredSound = new Audio('scoredSound.m4a');
let fps = 50;

const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "orange"
}

const user = {
    x : 0,
    y : (canvas.height - 100)/2,
    width : 10,
    height : 100,
    score : 0,
    color : "white"
}

const computer = {
    x : canvas.width - 10,
    y : (canvas.height - 100)/2,
    width : 10,
    height : 100,
    score : 0,
    color : "white"
}

const grid = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "white"
}
function floor(value){
    value.x = Math.floor(value.x);
    value.y = Math.floor(value.y);
    return value;
}
function drawRect(x, y, width, height, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawDisc(x, y, radius, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

canvas.addEventListener("mousemove", getMousePos);

function getMousePos(event){
    let rectangle = canvas.getBoundingClientRect();
    user.y = event.clientY - rectangle.top - user.height/2;
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = (user.score > computer.score) ? 7 : -7;
    ball.velocityY = (user.score > computer.score) ? 7 : -7;
    ball.speed = 7;
}

function drawGrid(){
    for(let i = 0; i <= canvas.height; i+=20){
        drawRect(grid.x, grid.y + i, grid.width, grid.height, grid.color);
    }
}

function drawScore(text, x, y){
    ctx.fillStyle = "#FFF";
    ctx.font = "65px Century Gothic";
    ctx.fillText(text, x, y);
}

function collision(ball, puddle){
    puddle.top = puddle.y;
    puddle.bottom = puddle.y + puddle.height;
    puddle.left = puddle.x;
    puddle.right = puddle.x + puddle.width;
    
    ball.top = ball.y - ball.radius * 2;
    ball.bottom = ball.y + ball.radius * 2;
    ball.left = ball.x - ball.radius * 1.5;
    ball.right = ball.x + ball.radius * 1.5;
    
    return puddle.left < ball.right && puddle.top < ball.bottom && puddle.right > ball.left && puddle.bottom > ball.top;
}

function updatePosition(){
    if(ball.x + ball.radius < 0){
        computer.score++;
        scoredSound.play();
        resetBall();
    }
    else if(ball.x - ball.radius > canvas.width){
        user.score++;
        scoredSound.play();
        resetBall();
    }
    
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    computer.y += ((ball.y - (computer.y + computer.height/2))) * 0.2;
    
    if(ball.y - ball.radius * 2 < 0 || ball.y + ball.radius * 2 > canvas.height){
        ball.velocityY = -ball.velocityY;
        wallHit.play();
    }
    
    let player = (ball.x + ball.radius * 2 < canvas.width/2) ? user : computer;
    
    if(collision(ball, floor(player))){
        puddleHit.play();
        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
        let angle = (Math.PI/4) * collidePoint;
        let direction = (ball.x < canvas.width/2) ? 1 : -1;
        ball.velocityX = Math.round(direction * ball.speed * Math.cos(angle));
        ball.velocityY = Math.round(ball.speed * Math.sin(angle));
        ball.speed += 0.7;
    }
}

function drawGame(){
    updatePosition();
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawScore(user.score, canvas.width/4, canvas.height/5);
    drawScore(computer.score, 3 * canvas.width/4, canvas.height/5);
    
    drawGrid();
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawDisc(ball.x, ball.y, ball.radius, ball.color);
}
setInterval(drawGame, 1000 / fps);