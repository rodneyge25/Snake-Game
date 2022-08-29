import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, updateScore, score, snakeSpeed } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime){
if (gameOver) {
    if (confirm('Game Over \nYour Score: ' + score + '\nPress ok to restart')) {
        window.location = '../Snake Game';
   }
    return;
}

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;
    
    lastRenderTime = currentTime;
    
    update();
    draw();
}

window.requestAnimationFrame(main);

function update(){
    updateSnake();
    updateFood();
    checkdeath();
}

function draw(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkdeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}