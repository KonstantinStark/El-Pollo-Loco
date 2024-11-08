let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
}

window.addEventListener('keypress', (event) => {
    if (event.key === 'a') {
        keyboard.A = true;
    }

    if (event.key === 'd') {
        keyboard.D = true;
    }

    if (event.key === 'e') {
        keyboard.E = true;
    }

    if (event.key === ' ') {
        keyboard.SPACE = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key === 'a') {
        keyboard.A = false;
    }

    if (event.key === 'd') {
        keyboard.D = false;
    }

    if (event.key === 'e') {
        keyboard.E = false;
    }

    if (event.key === ' ') {
        keyboard.SPACE = false;
    }
});