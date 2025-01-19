import {Point, Sprite, Vector2D} from "./sprite.js";
const WIDTH = 800;
const HEIGHT = 600;
export class Asteroid extends Sprite {


    reset(score:number)
    {
        const points:Point[] = [];
        for(let i = 0; i < 10; i++)
        {
            let angle = (Math.PI * 2) / 10 * i;
            let magnitude = Math.random() * 25 + 5;
            const x = magnitude * Math.cos(angle);
            const y = magnitude * Math.sin(angle);
            points.push({x,y});
        }
        this.points = points;

        this.location =  {x:Math.random() * WIDTH,y:
                Math.random() * HEIGHT}
        this.angle = Math.random() * (Math.PI * 2);
        this.delta = Vector2D.fromAngleAndMagnitude(this.angle, 0.1*score);
    }

}
