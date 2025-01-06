const WIDTH = 800;
const HEIGHT   = 600;

export class Asteroid {
    x: number;
    y: number;
    radius: number;
    speedX: number;
    speedY: number;

    constructor(x: number, y: number, radius: number, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
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
}
