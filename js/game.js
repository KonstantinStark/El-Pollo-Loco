let canvas;
let world;
let keyboard = new Keyboard();
let ePressed = false;
let music_sound = new Audio('./audio/music3.wav');
music_sound.pause();
music_sound.volume = .15;
music_sound.loop = true;

function init() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("startGameButton").addEventListener("click", startGame);
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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