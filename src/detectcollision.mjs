// import ball from '../src/ball.mjs';


export function detectcollision(gameball, gameobject) {
    
    let Ballbottom = gameball.position.y + gameball.size;
    let Balltop = gameball.position.y;
    let objecttop = gameobject.position.y;
    let objectbottom = gameobject.position.y + gameobject.height;    
    let objectleft = gameobject.position.x;
    let objectright = gameobject.position.x + gameobject.width;

    if (Ballbottom >= objecttop &&
        Balltop <= objectbottom &&
        gameball.position.x >= objectleft &&
        objectright >= gameball.position.x + gameball.size)
    {
        return true;
    }
    else {
        return false;
    }
}