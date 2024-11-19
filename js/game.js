let canvas;
let world;
let keyboard = new Keyboard();
let music_sound = new Audio('./audio/music3.wav');
let jump_sound = new Audio('./audio/jump.wav')
let loose_sound = new Audio('./audio/loose.mp3')
let walking_sound = new Audio('./audio/walk.wav')
let throw_sound = new Audio('./audio/throw.wav')
let coin_sound = new Audio('./audio/coin.wav')
let pick_up_sound = new Audio('./audio/pick.wav')
let scream_sound = new Audio('./audio/scream.wav')
ePressed = false; 
music_sound.pause();
music_sound.volume = 0.15;
music_sound.loop = true;


function init() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("startGameButton").addEventListener("click", startGame);
}

function startGame() {
    music_sound.play();
    document.getElementById("overlay").style.display = "none";
    document.getElementById("canvas").style.visibility = "visible";
    initLevel();
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