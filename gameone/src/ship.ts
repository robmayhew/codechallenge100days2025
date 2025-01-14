import {Vector,Point, Sprite} from "./sprite.js";

const WIDTH = 800;
const HEIGHT   = 600;






// export class Bullet {
//     location: Vector2D;
//     velocity: Vector2D;
//
//     constructor(location: Vector2D, angle: number, speed: number) {
//         this.location = location;
//         this.velocity = Vector2D.fromAngleAndMagnitude(angle, speed);
//     }
//
//     update() {
//         this.location = this.location.add(this.velocity);
//
//         // // Wrap around screen edges
//         // if (this.location.x > WIDTH) this.location.x = 0;
//         // if (this.location.x < 0) this.location.x = WIDTH;
//         // if (this.location.y > HEIGHT) this.location.y = 0;
//         // if (this.location.y < 0) this.location.y = HEIGHT;
//     }
//
//     draw(ctx: CanvasRenderingContext2D) {
//         ctx.beginPath();
//         ctx.arc(this.location.x, this.location.y, 2, 0, Math.PI * 2);
//         ctx.fillStyle = "white";
//         ctx.fill();
//     }
// }
const spritePoints: Point[] = [
    { x: 10, y: 0 },
    { x: -7, y: -7 },
    { x: -7, y: 7 }
];

export class Ship extends Sprite{



    constructor() {
        super(spritePoints)
        this.location = {x:(WIDTH / 2), y:HEIGHT / 2};

        //this.angle = 0; // Radians
        // this.speed = 0;
        // this.thrust = 0;
        // this.bullets = []; // Initialize bullets array
    }
    render(ctx: CanvasRenderingContext2D) {
        super.render(ctx);
        /*
         if (this.thrust > 0) {
            ctx.beginPath();
            ctx.moveTo(0, 30);
            ctx.lineTo(7, 15);
            ctx.lineTo(-7, 15);
            ctx.closePath();
            ctx.strokeStyle = "white";
            ctx.stroke();

            this.thrust--;

         */
    }



    tick() {
        super.tick();
        // Update ship position
        this.delta = this.delta.multiply(0.99);

        //this.location = this.location.add(this.delta);

        // Wrap around screen edges


        // Update bullets
      //  this.bullets.forEach((bullet) => bullet.update());

        // Remove bullets that are off-screen (optional if wrap-around isn't desired)
        // this.bullets = this.bullets.filter((bullet) =>
        //     bullet.location.x >= 0 && bullet.location.x <= WIDTH &&
        //     bullet.location.y >= 0 && bullet.location.y <= HEIGHT
        // );
    }

    // rotate(direction: number) {
    //     this.angle += direction;
    // }

    // accelerate(amount: number) {
    //     this.delta = this.delta.add(Vector2D.fromAngleAndMagnitude(this.angle, 0.01));
    //     this.thrust = 10;
    // }
    //
    // fire() {
    //     // // Create a new bullet at the ship's location, with the ship's angle
    //     // const bulletSpeed = 5; // Speed of the bullet
    //     // const bulletStartLocation = this.location.add(
    //     //     Vector2D.fromAngleAndMagnitude(this.angle, 15)
    //     // ); // Start slightly in front of the ship
    //     // const bullet = new Bullet(bulletStartLocation, this.angle, bulletSpeed);
    //     // this.bullets.push(bullet);
    // }
}
