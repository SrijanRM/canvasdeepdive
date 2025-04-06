// 5:14
window.onload = function () {
    const canvas = this.document.getElementById('canvas1');
    const cxt = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const flowField = new FlowFieldEffect(cxt, canvas.width, canvas.height)
}

class FlowFieldEffect {
    // private class field
    #ctx;
    #width;
    #height;

    constructor(cxt, width, height) {
        this.#ctx = cxt;
        this.#height = height;
        this.#width = width;
    }
}
