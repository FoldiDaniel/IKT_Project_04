import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.player = new Player(this)
        this.obstacles = [];


        this.score = 0;


        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }
        this.maxCountdown = 120;
        this.countDown = this.maxCountdown;
        this.speed = 5;
        this.stopped = false;

        canvas.addEventListener('mousedown', (e) => {

            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = true;
        })
        document.addEventListener('mouseup', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = false;
        })
        canvas.addEventListener('mousemove', (e) => {
            if (this.mouse.pressed) {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            }
        })
    }

    render(context) {
        this.player.move();
        this.player.draw(context);
        this.countDown--;
        if (this.countDown == 0) {
            this.countDown = this.maxCountdown;
            this.obstacles.push(new Obstacle(this, Math.round(Math.random())))
        }
        this.obstacles.forEach(obstacle => {
            obstacle.move();
            if (obstacle.position.y > this.height) {
                if (obstacle.role == 'point') {
                    this.score = 0;
                }
                this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
            } else if (obstacle.position.y + obstacle.r >= this.height - this.player.height) {
                if (obstacle.position.x + obstacle.r > this.player.position.x && obstacle.position.x - obstacle.r < this.player.position.x + this.player.width) {
                    if (obstacle.role == 'point') {
                        this.score++;
                    } else {
                        this.score = 0;
                    }
                    this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);

                }
            }
            obstacle.draw(context);
        })
        context.fillStyle = "black";
        context.fillText(`Score: ${this.score}`, 8, 36);
        this.setSpeed();
    }

    init() {
        this.score = 0;
        this.obstacles = [];
        this.obstacles.push(new Obstacle(this, 1))
    }

    setSpeed() {
        if (this.score < 5) {
            this.speed = 7;
            this.maxCountdown = 95;
        } else if (this.score < 12) {
            this.speed = 10;
            this.maxCountdown = 70;
        } else if (this.score < 25) {
            this.speed = 12
            this.maxCountdown = 55;
        } else {
            this.speed = 15;
            this.maxCountdown = 30;
        }
    }

}