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
        // this.#ctx.strokeStyle = 'white';
        this.#ctx.lineWidth = 1;
        this.#width = width;
        // this.angle = 0;
        this.lastTime = 0;
        this.interval = 1000 / 60;
        this.timer = 0;
        this.cellSize = 15;
        this.gradient;
        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient;
        this.radius = 0;
        this.vr = 0.03;
    }
    #createGradient() {
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height)
        this.gradient.addColorStop("0.1", "#ff5c33");
        this.gradient.addColorStop("0.2", "#ff66b3");
        this.gradient.addColorStop("0.4", "#ccccff");
        this.gradient.addColorStop("0.6", "#b2ffff");
        this.gradient.addColorStop("0.8", "#80ff80");
        this.gradient.addColorStop("0.9", "#ffff33");
    }
    // private method 
    #drawLine(angle, x, y) {
        const length = 30;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + Math.cos(angle) * 20, y + Math.sin(angle) * 20);
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
            this.radius += this.vr;
            console.log(this.radius);
            
            if (this.radius > 7 || this.radius < -7) this.vr *= -1;

            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize) {
                    const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * this.radius;
                    this.#drawLine(angle, x, y);
                }
            }


            this.timer = 0
        } else {
            this.timer += deltaTime
        }

        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));

    }
}



