
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




export class Bullet {
    location: Vector2D;
    velocity: Vector2D;

    constructor(location: Vector2D, angle: number, speed: number) {
        this.location = location;
        this.velocity = Vector2D.fromAngleAndMagnitude(angle, speed);
    }

    update() {
        this.location = this.location.add(this.velocity);

        // // Wrap around screen edges
        // if (this.location.x > WIDTH) this.location.x = 0;
        // if (this.location.x < 0) this.location.x = WIDTH;
        // if (this.location.y > HEIGHT) this.location.y = 0;
        // if (this.location.y < 0) this.location.y = HEIGHT;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

export class Ship {
    location: Vector2D;
    delta: Vector2D;
    angle: number;
    speed: number;
    thrust: number;
    bullets: Bullet[]; // Array to store bullets

    constructor() {
        this.location = new Vector2D(WIDTH / 2, HEIGHT / 2);
        this.delta = new Vector2D(0, 0);
        this.angle = 0; // Radians
        this.speed = 0;
        this.thrust = 0;
        this.bullets = []; // Initialize bullets array
    }

    draw(ctx: CanvasRenderingContext2D) {
        // Draw ship
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(10, 15);
        ctx.lineTo(-10, 15);
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();

        if (this.thrust > 0) {
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

        // Draw bullets
        this.bullets.forEach((bullet) => bullet.draw(ctx));
    }

    update() {
        // Update ship position
        this.location = this.location.add(this.delta);

        // Wrap around screen edges
        if (this.location.x > WIDTH) this.location.x = 0;
        if (this.location.x < 0) this.location.x = WIDTH;
        if (this.location.y > HEIGHT) this.location.y = 0;
        if (this.location.y < 0) this.location.y = HEIGHT;

        // Update bullets
        this.bullets.forEach((bullet) => bullet.update());

        // Remove bullets that are off-screen (optional if wrap-around isn't desired)
        this.bullets = this.bullets.filter((bullet) =>
            bullet.location.x >= 0 && bullet.location.x <= WIDTH &&
            bullet.location.y >= 0 && bullet.location.y <= HEIGHT
        );
    }

    rotate(direction: number) {
        this.angle += direction;
    }

    accelerate(amount: number) {
        this.delta = this.delta.add(Vector2D.fromAngleAndMagnitude(this.angle, 0.01));
        this.thrust = 10;
    }

    fire() {
        // Create a new bullet at the ship's location, with the ship's angle
        const bulletSpeed = 5; // Speed of the bullet
        const bulletStartLocation = this.location.add(
            Vector2D.fromAngleAndMagnitude(this.angle, 15)
        ); // Start slightly in front of the ship
        const bullet = new Bullet(bulletStartLocation, this.angle, bulletSpeed);
        this.bullets.push(bullet);
    }
}
