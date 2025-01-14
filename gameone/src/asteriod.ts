import {Ship} from "./ship.js";
import {Vector2D} from "./sprite.js";

const WIDTH = 800;
const HEIGHT = 600;

export class Point {
    constructor(public x: number, public y: number) {}

    // Translate the point by a vector
    translate(vector: Vector2D): Point {
        return new Point(this.x + vector.x, this.y + vector.y);
    }

    // Calculate the distance between this point and another point
    distanceTo(point: Point): number {
        return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2);
    }

    // Override toString for easy debugging
    toString(): string {
        return `Point(${this.x}, ${this.y})`;
    }
}

export class Asteroid {
    x: number;
    y: number;
    radius: number;
    speedX: number;
    speedY: number;
    points: Point[];
    jaggedness: number;

    constructor(x: number, y: number, radius: number, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.points = [];
        for(let i = 0; i < 10; i++)
        {
            let angle = (Math.PI * 2) / 10 * i;
            let magnitude = Math.random() * 25 + 5;
            const x = magnitude * Math.cos(angle);
            const y = magnitude * Math.sin(angle);
            this.points.push(new Point(x,y));
        }


        this.jaggedness = Math.random() * 10;
    }

    draw(ctx: CanvasRenderingContext2D) {

        ctx.beginPath();

        for (let i = 0; i < this.points.length; i++) {
            // Maintain a fixed "jagged" offset

            const xOffset = this.points[i].x;
            const yOffset = this.points[i].y;

            if (i === 0) {
                ctx.moveTo(this.x + xOffset, this.y + yOffset);
            } else {
                ctx.lineTo(this.x + xOffset, this.y + yOffset);
            }


        }

        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen edges
        if (this.x > WIDTH + this.radius) this.x = -this.radius;
        if (this.x < -this.radius) this.x = WIDTH + this.radius;
        if (this.y > HEIGHT + this.radius) this.y = -this.radius;
        if (this.y < -this.radius) this.y = HEIGHT + this.radius;
    }

    collides(ship: Ship) {
        if(ship.location.x - this.x < 20 && ship.location.y - this.y < 20)
        {
            return true;
        }
    }
}
