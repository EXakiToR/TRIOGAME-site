const ctx = canvas.getContext('2d');
let fps = 10; // сколько раз в секунду обновлять экран

let cellCountX = Math.sqrt(canvas.width);
let cellCountY = Math.sqrt(canvas.height);
//пропорция клеток по X
let cellW = Math.floor(canvas.width / cellCountX * 0.90);
//пропорция клеток по Y
let cellH = Math.floor(canvas.height / cellCountY * 0.90);

const eatSound = new Audio('appleCrunch.m4a');
const lose = new Audio('lose.mp3');
const win = new Audio('fanfare.m4a');

const color = 'red orange'.split(' ');
let selectedColor = color[random(color.length)];
const snakeParts = [];
let tail = 1;
class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
let score = 0;
let classicHiScore = 'classicHiScore';
let snakeHeadX = random(cellCountX);
let snakeHeadY = random(cellCountY);

let fruitX = random(cellCountX-1);
let fruitY = random(cellCountY-1);

let xSnakeSpeed = 0;
let ySnakeSpeed = 0;

let prevXSpeed = xSnakeSpeed;
let prevYSpeed = ySnakeSpeed;

function random(param){
    return Math.floor(Math.random() * Math.floor(param));
}

updateGame();
function updateGame(){
    //Фикс самостолкновения (Влево но не сразу вправо, вверх но не сразу вниз и наоборот)
    if (prevYSpeed == -1 && ySnakeSpeed == 1) ySnakeSpeed = prevYSpeed;

    else if (prevYSpeed == 1 && ySnakeSpeed == -1) ySnakeSpeed = prevYSpeed;

    else if (prevXSpeed == -1 && xSnakeSpeed == 1) xSnakeSpeed = prevXSpeed;

    else if (prevXSpeed == 1 && xSnakeSpeed == -1) xSnakeSpeed = prevXSpeed; 

    prevXSpeed = xSnakeSpeed;
    prevYSpeed = ySnakeSpeed;

    clearScreen();
    changeSnakeDirection();

    if (defeatCondition()){
        drawSnake();
        ctx.fillText('ЛУЧШИЙ РЕЗУЛЬТАТ: ' + localStorage.getItem(classicHiScore),canvas.width * 0.55, canvas.height * 0.04);
        ctx.fillStyle = 'red';
        ctx.font = '400% Century Gothic';
        ctx.fillText('Игра окончена!', canvas.width * 0.24, canvas.height * 0.45);
        ctx.fillText('ОЧКИ: ' + score, canvas.width * 0.24, canvas.height * 0.55);
        lose.play();
        return;
    }
    else if (whenFruitEaten()){
        drawSnake();
        ctx.fillText('ЛУЧШИЙ РЕЗУЛЬТАТ: ' + localStorage.getItem(classicHiScore),canvas.width * 0.55, canvas.height * 0.04);
        ctx.fillStyle = 'Lime';
        ctx.font = '400% Century Gothic';
        ctx.fillText('Вы ВЫЙГРАЛИ!!!', canvas.width * 0.24, canvas.height * 0.45);
        ctx.fillText('ОЧКИ: ' + score, canvas.width * 0.24, canvas.height * 0.55);
        win.play();
        return;
    }
    
    drawSnake();
    drawScore();
    setTimeout(updateGame, 1000 / fps);//Выполняет всё внутри каждый раз за 1000 / fps секунд
}

function drawScore(){
    ctx.fillStyle ='white';
    ctx.font = '120% Century Gothic';
    ctx.fillText('ЛУЧШИЙ РЕЗУЛЬТАТ: ' + localStorage.getItem(classicHiScore),canvas.width * 0.55, canvas.height * 0.04);
    ctx.fillText('ОЧКИ: ' + score, canvas.width * 0.04, canvas.height * 0.04);
}

function defeatCondition(){
    if (xSnakeSpeed == 0 && ySnakeSpeed == 0) return false;
    if(snakeHeadX < 0 || snakeHeadX >= cellCountX || snakeHeadY < 0 || snakeHeadY >= cellCountY) return true;
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x == snakeHeadX && part.y == snakeHeadY) return true;
    }
}

function drawSnake(){
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * cellCountX, part.y * cellCountY, cellW, cellH)
    }
    snakeParts.push(new SnakePart(snakeHeadX, snakeHeadY));
    if(snakeParts.length > tail){
        snakeParts.shift();
    }
    ctx.fillStyle = 'greenyellow';
    ctx.fillRect(snakeHeadX * cellCountX, snakeHeadY * cellCountY, cellW,cellH);
}

function drawFruit(){
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(fruitX == part.x && fruitY == part.y){
            fruitX = random(cellCountX-1);
            fruitY = random(cellCountY-1);
        }
    }
    ctx.fillStyle = selectedColor;
    if(score == Math.floor(cellCountX * cellCountY) - 1){
        ctx.fillStyle = color[random(color.length)];
    }
    
    ctx.fillRect(fruitX * cellCountX, fruitY * cellCountY, cellW, cellH);
}

function whenFruitEaten(){
    if(snakeHeadX == fruitX && snakeHeadY == fruitY){
        fruitX = random(cellCountX-1);
        fruitY = random(cellCountY-1);
        tail++;
        score++;
        if(score > localStorage.getItem(classicHiScore)){
            localStorage.setItem(classicHiScore, score);
        }
        eatSound.play();
        if(score == Math.floor(cellCountX * cellCountY)) return true;
        if(score % 7 == 0) fps++;
        selectedColor = color[random(color.length)];
    }
    drawFruit();
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function changeSnakeDirection(){
    snakeHeadX += xSnakeSpeed;
    snakeHeadY += ySnakeSpeed;
}

document.addEventListener('keydown', control)// При нажатии любой клавиши

function control(event){
    if (event.keyCode == 38 || event.keyCode == 87){//Вверх
        xSnakeSpeed = 0;
        ySnakeSpeed = -1;
    }
    else if (event.keyCode == 40 || event.keyCode == 83){//Вниз
        xSnakeSpeed = 0;
        ySnakeSpeed = 1;
    }
    else if (event.keyCode == 37 || event.keyCode == 65){//Влево
        xSnakeSpeed = -1;
        ySnakeSpeed = 0;
    }
    else if (event.keyCode == 39 || event.keyCode == 68){//Вправо
        xSnakeSpeed = 1;
        ySnakeSpeed = 0;
    }
}