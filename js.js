const canvasWrapper = document.querySelector('.canvas');

const createCanvas = function createCanvas(squaresInLine) {
    // let canvas = document.createElement('div');
    let canvas = [];
    const corrections = 10; /* из-за потери точности пришлось добавить корректировку в 10px 
                                и flex-shrink для square */
    const squareHeight = (parseInt(getComputedStyle(canvasWrapper).height) + corrections )/ squaresInLine + 'px';
    const squareWidth = (parseInt(getComputedStyle(canvasWrapper).width) + corrections )/ squaresInLine + 'px';

    for (let j = 0; j < squaresInLine; j++) {
        let row = document.createElement('div');
        row.classList.add('canvas__row')
        for (let i = 0; i < squaresInLine; i++) {
            row.append(createSquare(squareHeight, squareWidth));
        }
        canvas.push(row);
    }
    return canvas;
}

const createSquare = function createSquare(height, width) {
    let square = document.createElement('div');
    square.classList.add('canvas__square');
    square.style.height = height;
    square.style.width = width;
    return square;
}

const colorize = function colorizeSquare (target, color) {
    target.style.backgroundColor = `rgb(${color})`;
} 

const randomizeColor = function randomizeColor () {
    let rgb = [0,0,0];
    return rgb.map(() =>  Math.floor(Math.random() * 255) + 1).join(',');
}

canvasWrapper.addEventListener('mouseover',(e) => {
    if (!e.target.classList.contains('canvas__square')) return;
    colorize(e.target, randomizeColor());
    }
)

canvasWrapper.append(...createCanvas(90));