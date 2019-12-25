//main js file
import game from './game.mjs';

let restart = document.getElementById('restart');
let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");

 const GAME_WIDTH = 800;
 const GAME_HEIGHT = 600;
 let Game ;
function start(){
     Game = new game(GAME_WIDTH, GAME_HEIGHT);
}
start()

function start() {
    Game = new game(GAME_WIDTH, GAME_HEIGHT);
}
start()

let lastime = 0;
 


function gameLoop(timestamp) {
    let deltaTime = timestamp - lastime;
    lastime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    Game.update(deltaTime);
    Game.draw(ctx);

    

    requestAnimationFrame(gameLoop);

}
requestAnimationFrame(gameLoop);

restart.onclick = function () {
    start()
}

