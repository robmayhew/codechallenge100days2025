const WIDTH = 800;
const HEIGHT = 600;

export class Asteroid {
    x: number;
    y: number;
    radius: number;
    speedX: number;
    speedY: number;
    points: number;
    jaggedness: number;

    constructor(x: number, y: number, radius: number, speedX: number, speedY: number, points: number = 6) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.points = points;
        this.jaggedness = Math.random() * 10;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const angleStep = (Math.PI * 2) / this.points;
        let angle = 0;

        ctx.beginPath();

        for (let i = 0; i < this.points; i++) {
            // Maintain a fixed "jagged" offset
            const offset = 1 + this.jaggedness * Math.sin(i); // Creating a fixed offset for each point
            const xOffset = Math.cos(angle) * this.radius * offset;
            const yOffset = Math.sin(angle) * this.radius * offset;

            if (i === 0) {
                ctx.moveTo(this.x + xOffset, this.y + yOffset);
            } else {
                ctx.lineTo(this.x + xOffset, this.y + yOffset);
            }

            angle += angleStep;
        }

        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
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
