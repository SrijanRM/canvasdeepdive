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
    flowField.animate();
}

window.addEventListener('resize', () => {
    cancelAnimationFrame(flowFieldAnimation)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(cxt, canvas.width, canvas.height)
    flowField.animate();
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
        this.#width = width;
        this.angle = 0;
        console.log('effect loaded ');


    }
    // private method 
    #draw(x, y) {
        const length = 30;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + length, y + length);
        this.#ctx.stroke();
    }

    // public method 
    animate() {
        this.angle +=0.1;
        this.#ctx.clearRect(0, 0, this.#width, this.#height)
        this.#draw(this.#width / 2 + Math.sin(this.angle) * 100 , this.#height / 2 + Math.cos(this.angle) * 100);
        console.log('animate log');
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}



