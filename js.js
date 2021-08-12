const canvasWrapper = document.querySelector('.canvas');
const menu = document.querySelector('.menu');
let selectedColor = '#000000';
let randomColorModOn = false;

const createCanvas = function createCanvas(squaresInLine) {
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
    target.style.backgroundColor = color;
} 

const randomizeColor = function randomizeColor () {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

const changeColor = function changeSelectedColor(color) {
    selectedColor = color;
}

const displayPixelsRatio = function displayPixelsRatio (value) {
    menu.querySelector('#menu__label-for-pixels').innerHTML = `${value} x ${value}`;
}

canvasWrapper.addEventListener('mouseover',(e) => {
    if (!e.target.classList.contains('canvas__square')) return;
    if (randomColorModOn) {
        colorize(e.target, randomizeColor());
    }else{
        colorize(e.target, selectedColor);
    }
})

menu.querySelector('[name="pick"]').addEventListener('change', (e) => {
    randomColorModOn = false;
    changeColor(e.target.value);
})
menu.querySelector('[name="random"]').addEventListener('click', (e) => {
    randomColorModOn = !randomColorModOn;
    e.target.classList.toggle('button-switcher-active');
})
menu.querySelector('[name="clear"]').addEventListener('click', () => {
    const squares = [...canvasWrapper.querySelectorAll('.canvas__square')];
    squares.map((node) => node.style.backgroundColor = '');
})
menu.querySelector('[name="pixels"]').addEventListener('input', (e) => {
    let rows = canvasWrapper.querySelectorAll('.canvas__row');
    [...rows].map((node) => node.remove());
    displayPixelsRatio(e.target.value)
    canvasWrapper.append(...createCanvas(e.target.value));
});

canvasWrapper.append(...createCanvas(menu.querySelector('[name="pixels"]').value));
