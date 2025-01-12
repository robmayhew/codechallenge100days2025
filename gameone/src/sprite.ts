export type Point = { x: number; y: number };
export type Vector = { dx: number; dy: number };

const WIDTH = 800;
const HEIGHT   = 600;

export class Sprite {
    private points: Point[]; // Outline points relative to the center (0,0)
    public location: Point; // Current position on the graph
    public angle: number; // Current angle the sprite is pointing at
    public delta: Vector; // Speed and direction

    constructor(points: Point[], location: Point = { x: 0, y: 0 }, angle: number = 0, delta: Vector = { dx: 0, dy: 0 }) {
        this.points = points;
        this.location = location;
        this.angle = angle;
        this.delta = delta;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        this.points.forEach((point, index) => {
            const x = point.x;
            const y = point.y;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

    tick() {
        // Update the position of the sprite based on the delta vector
        this.location.x += this.delta.dx;
        this.location.y += this.delta.dy;
       // this.angle+= Math.PI / 64;
        // Wrap around screen edges
        if (this.location.x > WIDTH) this.location.x = 0;
        if (this.location.x < 0) this.location.x = WIDTH;
        if (this.location.y > HEIGHT) this.location.y = 0;
        if (this.location.y < 0) this.location.y = HEIGHT;

    }

    getCollisionBox(): { x: number; y: number; width: number; height: number } {
        const rotatedPoints = this.points.map(point => {
            const rotatedX = point.x * Math.cos(this.angle) - point.y * Math.sin(this.angle);
            const rotatedY = point.x * Math.sin(this.angle) + point.y * Math.cos(this.angle);
            return { x: rotatedX, y: rotatedY };
        });

        const minX = Math.min(...rotatedPoints.map(p => p.x)) + this.location.x;
        const maxX = Math.max(...rotatedPoints.map(p => p.x)) + this.location.x;
        const minY = Math.min(...rotatedPoints.map(p => p.y)) + this.location.y;
        const maxY = Math.max(...rotatedPoints.map(p => p.y)) + this.location.y;

        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    }
}
