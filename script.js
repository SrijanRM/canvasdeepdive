// 5:14
let canvas;
let ctx;
let flowField;
let flowFieldAnimation;
window.onload = function () {
    canvas = this.document.getElementById('canvas1');
    cxt = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    flowField = new FlowFieldEffect(cxt, canvas.width, canvas.height)
    flowField.animate(0);
}

window.addEventListener('resize', () => {
    cancelAnimationFrame(flowFieldAnimation)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(cxt, canvas.width, canvas.height)
    flowField.animate(0);
})

const mouse = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

class FlowFieldEffect {
    // private class field
    #ctx;
    #width;
    #height;

    constructor(cxt, width, height) {
        this.#ctx = cxt;
        this.#height = height;
        this.#ctx.strokeStyle = 'white';
        this.#ctx.lineWidth = 5;
        this.#width = width;
        // this.angle = 0;
        this.lastTime = 0;
        this.interval = 1000 / 60;
        this.timer = 0;
        this.cellSize = 15
    }
    // private method 
    #drawLine(x, y) {
        const length = 30;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + 5, y + 5);
        // this.#ctx.lineTo(mouse.x, mouse.y);
        this.#ctx.stroke();
    }

    // public method 
    animate(timestamp) {

        let deltaTime = timestamp - this.lastTime
        this.lastTime = timestamp

        if (this.timer > this.interval) {
            // this.angle += 0.1;
            this.#ctx.clearRect(0, 0, this.#width, this.#height)

            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize) {
                    this.#drawLine(x, y);
                }
            }


            this.timer = 0
        } else {
            this.timer += deltaTime
        }

        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));

    }
}



