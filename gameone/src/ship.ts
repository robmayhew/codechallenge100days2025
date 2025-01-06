
const WIDTH = 800;
const HEIGHT   = 600;

export class Ship {
    x: number;
    y: number;
    angle: number;
    speed: number;

    constructor() {
        this.x = WIDTH / 2;
        this.y = HEIGHT / 2;
        this.angle = 0; // Radians
        this.speed = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(5, 10);
        ctx.lineTo(-5, 10);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Wrap around screen edges
        if (this.x > WIDTH) this.x = 0;
        if (this.x < 0) this.x = WIDTH;
        if (this.y > HEIGHT) this.y = 0;
        if (this.y < 0) this.y = HEIGHT;
    }

    rotate(direction: number) {
        this.angle += direction;
    }

    accelerate(amount: number) {
        this.speed += amount;
    }
}
