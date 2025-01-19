// src/main.ts

import { Ship } from "./ship.js";
import {Asteroid} from "./asteriod.js";
import {Point, Sprite, Vector2D} from "./sprite.js";
import {Bullet} from "./bullet.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;


const WIDTH = canvas.width;
const HEIGHT = canvas.height;
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

let score = 0;

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
    if( keys[" "])
    {
        bullet.location = {x:ship.location.x,y:ship.location.y};
        bullet.angle = ship.angle;
        bullet.delta = Vector2D.fromAngleAndMagnitude(bullet.angle,10);
        bullet.reset();
    }

    // Update and draw ship
    ship.tick();
    ship.render(ctx);

    bullet.render(ctx);
    bullet.tick();
    // Update and draw asteroids
    asteroids.forEach((asteroid) => {
        asteroid.tick();
        if(asteroid.collides(ship) || asteroid.collides(bullet))
        {
            asteroid.color = 'red'
            if(asteroid.collides(bullet))
            {
                score++;
                bullet.reset();
                asteroid.reset(score);

            }
        }else{
            asteroid.color = 'white';
        }
        asteroid.render(ctx);
    });
    ctx.strokeStyle = "white";
    ctx.font = "48px Arial";
    ctx.strokeText("Score: "+ score, 20,30);

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

const bullet = new Bullet([{x:3,y:0},
    {x:0,y:3},
    {x:0,y:-3},
    {x:-3,y:-3}]);


// Create some random asteroids
for (let i = 0; i < 5; i++) {

    const a = new Asteroid();
    a.reset(score);
    asteroids.push(a);
}

// Start the game loop
gameLoop();
