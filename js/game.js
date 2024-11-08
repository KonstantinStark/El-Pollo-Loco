let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My Character is', world.character);
}

window.addEventListener('keypress', (event) => {
    if (event.key === 'A') {
        keyboard.a = true;
    }

    if (event.key === 'D') {
        keyboard.d = true;
    }

    if (event.key === 'E') {
        keyboard.e = true;
    }

    if (event.key === ' ') {
        keyboard.space = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key === 'A') {
        keyboard.a = false;
    }

    if (event.key === 'D') {
        keyboard.d = false;
    }

    if (event.key === 'E') {
        keyboard.e = false;
    }

    if (event.key === ' ') {
        keyboard.space = false;
    }
});