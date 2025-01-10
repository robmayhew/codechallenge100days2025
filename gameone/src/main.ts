// src/main.ts

import { Ship } from "./ship.js";
import {Asteroid} from "./asteriod.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;


const WIDTH = canvas.width;
const HEIGHT = canvas.height;
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function gameLoop() {
    clearScreen();

    // Ship controls
    if (keys["a"]) ship.rotate(-0.05);
    if (keys["d"]) ship.rotate(0.05);
    if (keys["w"]) ship.accelerate(0.1);
    if (keys["s"]) ship.accelerate(-0.1);
    if( keys[" "]) ship.fire();

    // Update and draw ship
    ship.update();
    ship.draw(ctx);

    // Update and draw asteroids
    asteroids.forEach((asteroid) => {
        asteroid.update();
        if(asteroid.collides(ship))
        {
          // next up collision detection!
        }
        asteroid.draw(ctx);
    });

    requestAnimationFrame(gameLoop);
}
const keys: { [key: string]: boolean } = {};

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

const ship = new Ship();
const asteroids: Asteroid[] = [];

// Create some random asteroids
for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid(
        Math.random() * WIDTH,
        Math.random() * HEIGHT,
        20 + Math.random() * 30,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
    ));
}


// Start the game loop
gameLoop();
