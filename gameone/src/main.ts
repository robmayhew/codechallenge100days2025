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
let gameOver = false;
function gameLoop() {
    clearScreen();

    // Ship controls
    if (keys["a"]) ship.angle += -0.05;
    if (keys["d"]) ship.angle += 0.05;
    if(keys["r"])
    {
        gameOver = false;
        score = 0;
        asteroids.forEach((asteroid) => {
           asteroid.reset(score);
        });
    }
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

    ctx.strokeStyle = "white";
    ctx.font = "48px Arial";
    ctx.strokeText("Score: "+ score, 20,30);
    if(gameOver)
    {
        ctx.strokeText("GAME OVER", WIDTH/2 - 100,HEIGHT/2);
        ctx.strokeText("Press R to restart", WIDTH/2 - 100,HEIGHT/2+40);
    }else{
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
                if(asteroid.collides(ship))
                {
                    gameOver = true;
                }
            }else{
                asteroid.color = 'white';
            }
            asteroid.render(ctx);
        });
        for (let i = 0; i < asteroids.length; i++) {
            for (let j = i + 1; j < asteroids.length; j++) {
                const aa = asteroids[i];
                const bb = asteroids[j];
                if(aa.collides(bb))
                {
                    aa.angle = Math.random() * Math.PI;
                    aa.delta = Vector2D.fromAngleAndMagnitude(aa.angle, 0.1*score+0.01);
                }
            }
        }

        ctx.strokeStyle = "white";
        ctx.font = "48px Arial";
        ctx.strokeText("Score: "+ score, 20,30);
    }
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
