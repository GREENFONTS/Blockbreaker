import { detectcollision } from '../src/detectcollision.mjs';


export default class bricks {
    constructor(Game, position) {
        this.image = document.getElementById("bricks");

        this.game = Game;
        this.width = 80;
        this.height = 24;

        this.position = position;
        this.markedfordeletion = false;
    }

    update() {
         if (detectcollision(this.game.gameball, this)) {
             this.game.gameball.speed.y = -this.game.gameball.speed.y;
             
             this.markedfordeletion = true;
         }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    };
}