// src/main.ts

import { Ship } from "./ship.js";
import {Asteroid} from "./asteriod.js";
import {Point, Sprite, Vector2D} from "./sprite.js";

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
    if (keys["a"]) ship.angle += -0.05;
    if (keys["d"]) ship.angle += 0.05;
    if (keys["w"]){
        const v = Vector2D.fromAngleAndMagnitude(ship.angle,0.2)
        ship.delta = ship.delta.add(v);
    }
    //if (keys["s"]) ship.accelerate(-0.1);
//    if( keys[" "]) ship.fire();

    // Update and draw ship
    ship.tick();
    ship.render(ctx);

    // Update and draw asteroids
    asteroids.forEach((asteroid) => {
        asteroid.tick();
        if(asteroid.collides(ship))
        {
            asteroid.color = 'red'
        }else{
            asteroid.color = 'white';
        }
        asteroid.render(ctx);
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
    const points:Point[] = [];
    for(let i = 0; i < 10; i++)
    {
        let angle = (Math.PI * 2) / 10 * i;
        let magnitude = Math.random() * 25 + 5;
        const x = magnitude * Math.cos(angle);
        const y = magnitude * Math.sin(angle);
        points.push({x,y});
    }
    const  p =  {x:Math.random() * WIDTH,y:
        Math.random() * HEIGHT}
    const a = new Asteroid(points,p);
    a.angle = Math.random() * (Math.PI * 2);
    a.delta = Vector2D.fromAngleAndMagnitude(a.angle, 0.1);
    asteroids.push(a);
}

// Start the game loop
gameLoop();
