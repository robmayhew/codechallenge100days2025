
const WIDTH = 800;
const HEIGHT   = 600;

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



export class Ship {
    location: Vector2D;
    delta: Vector2D;
    angle: number;
    speed: number;
    thrust: number;

    constructor() {
        this.location = new Vector2D(WIDTH / 2, HEIGHT/2);
        this.delta = new Vector2D(0,0);
        this.angle = 0; // Radians
        this.speed = 0;
        this.thrust = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.angle + (Math.PI/2));
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(10, 15);
        ctx.lineTo(-10, 15);
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();

        if(this.thrust > 0)
        {
            ctx.beginPath();
            ctx.moveTo(0, 30);
            ctx.lineTo(7, 15);
            ctx.lineTo(-7, 15);
            ctx.closePath();
            ctx.strokeStyle = "white";
            ctx.stroke();

            this.thrust--;
        }
        ctx.restore();
    }

    update() {

        this.location = this.location.add(this.delta);
        //this.delta = this.delta.multiply(0.50);

        // Wrap around screen edges
        if (this.location.x > WIDTH) this.location.x = 0;
        if (this.location.x < 0) this.location.x = WIDTH;
        if (this.location.y > HEIGHT) this.location.y = 0;
        if (this.location.y < 0) this.location.y = HEIGHT;
    }

    rotate(direction: number) {

        this.angle += direction;

    }

    accelerate(amount: number) {
        this.delta = this.delta.add(Vector2D.fromAngleAndMagnitude(this.angle, 0.01));
        this.thrust = 10;
    }
}
