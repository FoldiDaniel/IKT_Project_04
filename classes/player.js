export class Player {
    constructor(game) {
        this.game = game;

        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;

        this.width = 120;
        this.height = 30;

        this.position = { x: 0, y: 0 };
    }

    draw(context) {
        context.fillStyle = 'blue'
        context.beginPath();
        context.rect(this.position.x, this.game.height - this.height, this.width, this.height)
        context.fill();

    }

    move() {
        if (this.game.mouse.pressed) {
            this.position.x = this.game.mouse.x;
            if (this.position.x + this.width > this.game.width) {
                this.position.x = this.game.width - this.width;
            }
        }
    }

}