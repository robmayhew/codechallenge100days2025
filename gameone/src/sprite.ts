export type Point = { x: number; y: number };
export type Vector = { dx: number; dy: number };

export class Vector2D {
    constructor(public x: number, public y: number) {}

    // Add another vector to this vector
    add(vector: Vector2D): Vector2D {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    // Subtract another vector from this vector
    subtract(vector: Vector2D): Vector2D {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    // Multiply the vector by a scalar
    multiply(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    // Divide the vector by a scalar
    divide(scalar: number): Vector2D {
        if (scalar === 0) throw new Error("Division by zero is not allowed.");
        return new Vector2D(this.x / scalar, this.y / scalar);
    }

    // Calculate the dot product of this vector and another vector
    dot(vector: Vector2D): number {
        return this.x * vector.x + this.y * vector.y;
    }

    // Calculate the magnitude (length) of the vector
    magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    // Normalize the vector (make its magnitude 1)
    normalize(): Vector2D {
        const mag = this.magnitude();
        if (mag === 0) throw new Error("Cannot normalize a zero vector.");
        return this.divide(mag);
    }

    rotate(angle: number): Vector2D {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Vector2D(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        );
    }

    static fromAngleAndMagnitude(angle: number, magnitude: number): Vector2D {
        const x = Math.cos(angle) * magnitude;
        const y = Math.sin(angle) * magnitude;
        return new Vector2D(x, y);
    }

    // Calculate the distance between two vectors
    static distance(a: Vector2D, b: Vector2D): number {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    // Override toString for easy debugging
    toString(): string {
        return `Vector2D(${this.x}, ${this.y})`;
    }
}


const WIDTH = 800;
const HEIGHT   = 600;

export class Sprite {
    private points: Point[]; // Outline points relative to the center (0,0)
    public location: Point; // Current position on the graph
    public angle: number; // Current angle the sprite is pointing at
    public delta: Vector2D; // Speed and direction
    public color: string;
    constructor(points: Point[],
                location: Point = { x: 0, y: 0 },
                angle: number = 0,
                delta = new Vector2D(0,0)) {
        this.points = points;
        this.location = location;
        this.angle = angle;
        this.delta = delta;
        this.color = 'white';
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.angle);
        ctx.strokeStyle = this.color;
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
        this.location.x += this.delta.x;
        this.location.y += this.delta.y;
       // this.angle+= Math.PI / 64;
        // Wrap around screen edges
        if (this.location.x > WIDTH) this.location.x = 0;
        if (this.location.x < 0) this.location.x = WIDTH;
        if (this.location.y > HEIGHT) this.location.y = 0;
        if (this.location.y < 0) this.location.y = HEIGHT;

    }

    collides(sprite: Sprite) {
        let radius1 = 0;
        this.points.forEach((p) => {
            const r = Math.sqrt(p.x * p.x + p.y * p.y);
            if (r > radius1) radius1 = r;
        });

        // Calculate other sprite's bounding radius
        let radius2 = 0;
        sprite.points.forEach((p) => {
            const r = Math.sqrt(p.x * p.x + p.y * p.y);
            if (r > radius2) radius2 = r;
        });

        // Calculate the distance between the centers
        const dx = this.location.x - sprite.location.x;
        const dy = this.location.y - sprite.location.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Return true if the distance is less than the sum of the radii
        return distance < radius1 + radius2;
    }
}
