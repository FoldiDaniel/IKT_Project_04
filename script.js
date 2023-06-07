import { Game } from "./classes/game.js";

window.addEventListener('load', function () {

    const canvas = document.querySelector('#canvas1');

    canvas.width = 650;
    canvas.height = 720;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black'; // kitöltés színe
    ctx.lineWidth = 3; // vonalvastagság
    ctx.strokeStyle = 'black'; // körvonal színe
    ctx.font = '30px Helvetica'; // betűméret, betűtípus

    const game = new Game(canvas);
    game.init();


    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // törlöljük a vásznat
        game.render(ctx);
        requestAnimationFrame(animate); // 60 FPS amimáció sebesség
    }

    animate();
})
