import { detectcollision } from '../src/detectcollision.mjs';

//controls activites of the ball
export default class ball{
    constructor(Game) {
        this.image = document.getElementById("game_ball");

        this.gameWidth = Game.gameWidth;
        this.gameHeight = Game.gameHeight;
        this.size = 24;
        this.game = Game;
        this.resetgame();
    };
    //starts the game afresh when the ball hits the base
    resetgame() {
        this.position = { x: 10, y: 400 };
        this.speed = { x: 4, y: -4 };
    };

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    };

    update(deltaTime) {

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        //collision with right andd left side of wall
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }
        //collision on top
        if ( this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }
        //collision on bottom
        if (this.position.y + this.size > this.gameHeight ) {
            this.game.live--;
            this.resetgame();
        }
        //collision with paddle
        if (detectcollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}