//this file controls the listeners to all the event of the keyboard

export default class InputHandler{

    constructor(paddle, Game) {
        document.addEventListener("keydown", event => {
            
            switch (event.keyCode) {
                //eventlistenterfor moving the paddle to right
                case 37:
                    paddle.moveleft();
                    break;
                //eventlistenterfor moving the paddle to right
                case 39:
                    paddle.moveright();
                    break;
                //eventlistenterfor pausing the game
                case 13:
                    Game.togglepaused();
                    break;
                //eventlistenterfor starting the game
                case 32:
                    Game.start();
                    break;
                //stillworking on these
                case 16:
                    Game.prompt();
                    break;
                

            }
        });
        //same as above both for keyup event
        document.addEventListener("keyup", event => {

            switch (event.keyCode) {
                case 37:
                    if(paddle.speed < 0)
                        paddle.stop();
                    break;

                case 39:
                    if (paddle.speed > 0)
                        paddle.stop();
                    break;
            }

        });
    }
}