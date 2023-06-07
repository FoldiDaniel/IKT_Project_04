export class Obstacle {
    constructor(game, role) {
        this.game = game;
        this.role = role == 1 ? 'point' : 'bomb';
        this.r = 12;
        this.position = { x: Math.random() * (this.game.width-this.r), y: 0 };
    }

    draw(context) {
        context.fillStyle = this.role == 'point' ? 'yellow' : 'red';
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2)
        context.fill();
    }

    move() {
        this.position.y += this.game.speed;
    }
}