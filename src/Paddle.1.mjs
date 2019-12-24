export default class Paddle {
    constructor(Game) {
        this.width = 130;
        this.height = 20;
        this.gameWidth = Game.gameWidth;

        this.speed = 0;
        this.maxspeed = 8;

        this.position = {
            x: Game.gameWidth / 2 - this.width / 2,
            y: Game.gameHeight - this.height - 10,
        };
        
    }
    
    moveleft() {
        this.speed = -this.maxspeed;
    };

    moveright() {
        this.speed = this.maxspeed;
    };

    stop() {
        this.speed = 0;
    };

    draw(ctx) {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    };

    update(deltaTime) {

        this.position.x += this.speed;

        if (this.position.x < 0)
            this.position.x = 0;
        if (this.position.x + this.width > this.gameWidth)
            this.position.x = this.gameWidth - this.width; 

    };
    
}
 