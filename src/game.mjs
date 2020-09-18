//this is the main game file, controls
//controls every aspect and links every aspect of the game

import Paddle from '../src/Paddle.1.mjs';
import InputHandler from '../src/input.mjs';
import ball from '../src/ball.mjs';
import bricks from '../src/bricks.mjs';


import { buildLevel, level1, level2, level3, level4 } from '../src/levels.mjs';


//different gamestate or canvas
const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    MENUTONXTLEVEL: 5,
    INSTRUCTIONS: 6
};

export default class game {
    constructor(gameWidth, gameHeight, bricksPerRow) {
        
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.gamestate = GAMESTATE.MENU;
        this.gameball = new ball(this);
        this.paddle = new Paddle(this);
        this.live = 3;
        this.Brick = [];
        this.levels = [level1, level2, level3, level4];
        this.currentlevel = 0;
        this.gameobjs = [];
        new InputHandler(this.paddle, this);
    }
    
    start() {
        if (this.gamestate !== GAMESTATE.INSTRUCTIONS &&
            this.gamestate !== GAMESTATE.NEWLEVEL &&
            this.gamestate !== GAMESTATE.MENUTONXTLEVEL &&
            this.gamestate !== GAMESTATE.GAMEOVER) {
            return;
        };

        if (this.gamestate === GAMESTATE.MENUTONXTLEVEL) {
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }
        

        this.Brick = buildLevel(this, this.levels[this.currentlevel]);
        this.gameball.resetgame();
        this.gameobjs = [this.gameball, this.paddle,];

        this.gamestate = GAMESTATE.RUNNING;
       
    }

    update(deltaTime) {
        if (this.live == 0) {
            this.gamestate = GAMESTATE.GAMEOVER;
        };

        if (this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.INSTRUCTIONS ||
            this.gamestate === GAMESTATE.MENUTONXTLEVEL) {
            return;

        };

        
        //action for changing to new level
        if (this.Brick.length === 0) {
            this.currentlevel++;
            this.gamestate = GAMESTATE.MENUTONXTLEVEL;           
            
           
        };
        
        

        [...this.gameobjs, ...this.Brick].forEach(object => (object.update(deltaTime)
 
        ));
        this.Brick = this.Brick.filter(Brick => !Brick.markedfordeletion)
    }
    //draws every element in canvas(ctx)
    draw(ctx) {
        [...this.gameobjs, ...this.Brick].forEach(object => (object.draw(ctx)
        ));
        
        //displays the pause event
        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = " 100px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
            ctx.font = "50px Arial";
            ctx.fillText("Press enter to continue", this.gameWidth / 2, this.gameHeight / 2 + 100)
            ctx.font = "30px Arial";
            ctx.fillText("You have " + this.live +
                " lives remaining", this.gameWidth / 2, this.gameHeight / 2 + 200)
        };

        //displays the menu canvas
        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = " 50px Arial";
            ctx.fillStyle = "orange";
            ctx.textAlign = "center";
            ctx.fillText("BLOCK BREAKER GAME", this.gameWidth / 2, this.gameHeight / 2 - 150);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Press SHIFT to Continue", this.gameWidth / 2, this.gameHeight / 2 + 50)
            
            ctx.font = "25px Arial";
            ctx.fillStyle = "grey";
            ctx.textAlign = "right";
            ctx.fillText("Powered by Greenfonts",
                this.gameWidth / 2 + 300, this.gameHeight / 2 + 250)

        }
        //displays the gameover canvas
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = " 50px Arial";
            ctx.fillStyle = "orange";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2 - 150);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Start New Game", this.gameWidth / 2, this.gameHeight / 2 + 100)

        }
        if (this.gamestate === GAMESTATE.INSTRUCTIONS) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = " 50px Arial";
            ctx.fillStyle = "orange";
            ctx.textAlign = "center";
            ctx.fillText("INSTRUCTIONS", this.gameWidth / 2, this.gameHeight / 2 - 150);

            ctx.fillStyle = "white";
            ctx.font = "25px Arial";
            ctx.fillText("Please read the instructions carefully", this.gameWidth / 2, this.gameHeight / 2 - 80);
            
            ctx.textAlign = "left";
            ctx.fillStyle = "white";
            ctx.font = "25px Arial";
            ctx.fillText( "*  " + "You have 3 lives in the Game",
                this.gameWidth / 2 - 350, this.gameHeight / 2 + 50)
            
            ctx.fillText("*  " +"Press Enter to Pause the Game", this.gameWidth / 2 - 350, this.gameHeight / 2 + 100)
            
            ctx.fillText("*  " + "Press SPACEBAR to Start the Game", this.gameWidth / 2 - 350, this.gameHeight / 2 + 150)
            

        }
    
        if (this.gamestate === GAMESTATE.MENUTONXTLEVEL) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = " 30px Arial";
            ctx.fillStyle = "orange";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to Continue to  Level " + (this.currentlevel + 1), this.gameWidth / 2, this.gameHeight / 2);
            
        }
    }
    //controls the pausing of game
    togglepaused() {
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        }
        else {
            this.gamestate = GAMESTATE.PAUSED;
        }

    };
    //stillworking ont this
    prompt() {
        if (this.gamestate === GAMESTATE.MENU) {
            this.gamestate = GAMESTATE.INSTRUCTIONS;
        }
        else {
            return;
        };
             
    };
    
    
}
