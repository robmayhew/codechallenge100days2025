import {Point, Sprite, Vector2D} from "./sprite.js";


export class Bullet extends Sprite
{
    timeToLive:number;
    constructor(points: Point[],
                location: Point = { x: 0, y: 0 },
                angle: number = 0,
                delta = new Vector2D(0,0)) {
        super(points, location, angle, delta);
        this.timeToLive = 0;
    }

    reset()
    {
        this.timeToLive = 50;
    }


    tick()
    {
        super.tick();
        if(this.timeToLive > 0) {
            this.timeToLive--;
        }
        if(this.timeToLive <= 0)
        {
            this.delta = new Vector2D(0,0);
            this.location = {x:-10000, y:-10000};
        }
    }
}