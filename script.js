let snake = [{ x : 0 , y : 0}];
let food = { x : 0 , y : 0};
let direction = 'right';

const gameContainer = document.getElementById('gameContainer');

function restart(){
    snake = [{ x : 0 , y : 0}];
    direction = 'right';
    const snakeElement = document.getElementById('snake');
    snakeElement.style.backgroundColor = 'chartreuse';
    createFood();
    setInterval( moveSnake , 300);
}

function createFood(){
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
    const fruit = document.getElementById('fruit');
    fruit.style.left = food.x + 'px';
    fruit.style.top  = food.y + 'px';
}
//to move snake
function moveSnake(){
 const head = { x : snake[0].x , y : snake[0].y };
 switch(direction){
    case 'up':
        head.y-=20;
        break;
    case 'down':
        head.y+=20;
        break;
    case 'left':
        head.x-=20;  
        break;  
    case 'right':
        head.x+=20;
        break;
 }

//to check snake is out of boundry or not
if(head.x<0 || head.x>=gameContainer.clientWidth || head.y<0 || head.y>=gameContainer.clientHeight)
    {
        gameOver();

        return;
    }

// Add the new head to the beginning of the snake array
snake.unshift(head);

 //to check if fruit is eaten or not
 if(head.x == food.x && head.y == food.y)
    {
        createFood();
    }
 else{
    snake.pop();          // If the snake hasn't eaten the fruit, remove the last segment of the snake
}

 
 creatTail();
}

function creatTail(){
    const snakeElement = document.getElementById('snake');
    snakeElement.innerHTML ='';
    snakeElement.style.backgroundColor = 'rgb(174, 175, 171)';
   
    for (let i = 0; i < snake.length; i++) {
        const segmentDiv = document.createElement('div');
        segmentDiv.style.width = '20px';
        segmentDiv.style.height = '20px';
        segmentDiv.style.backgroundColor = 'chartreuse';
        segmentDiv.style.position = 'absolute';
        segmentDiv.style.left = snake[i].x + 'px';
        segmentDiv.style.top = snake[i].y + 'px';
        snakeElement.appendChild(segmentDiv);
    }
}

function gameOver() {
    const gameOverElement = document.getElementById('gameOver');
    gameOverElement.style.display = 'block';
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down')
                direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up')
                direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right')
                direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left')
                direction = 'right';
            break;
    }
});

createFood();
setInterval( moveSnake , 100);