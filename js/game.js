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
let win_sound = new Audio('./audio/win.wav')
let chicken_sound = new Audio('./audio/chicken.wav')
let chicken2_sound = new Audio('./audio/chicken2.wav')
ePressed = false; 
music_sound.pause();
music_sound.volume = 0.1;
music_sound.loop = true;

function init() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("startGameButton").addEventListener("click", startGame);
    setupButtonListeners("leftButton", "A");
    setupButtonListeners("rightButton", "D");
    setupButtonListeners("throwButton", "E");
    setupButtonListeners("upButton", "SPACE");
    setupKeyboardListeners();
    setupOrientationListener();
}

function setupButtonListeners(buttonId, key) {
    document.getElementById(buttonId).addEventListener("mousedown", () => {
        keyboard[key] = true;
    });
    document.getElementById(buttonId).addEventListener("mouseup", () => {
        keyboard[key] = false;
    });
    document.getElementById(buttonId).addEventListener("touchstart", () => {
        keyboard[key] = true;
    });
    document.getElementById(buttonId).addEventListener("touchend", () => {
        keyboard[key] = false;
    });
}

function setupOrientationListener() {
    window.matchMedia("(orientation: portrait").addEventListener("change", e => {
        const portrait = e.matches;
        document.getElementById('rotateOverlay').style.display = portrait ? 'block' : 'none';
    });
}

function setupKeyboardListeners() {
    window.addEventListener('keypress', (event) => {
        if (event.key === 'a') keyboard.A = true;
        if (event.key === 'd') keyboard.D = true;
        if (event.key === 'e') keyboard.E = true;
        if (event.key === ' ') keyboard.SPACE = true;
    });

    window.addEventListener('keyup', (event) => {
        if (event.key === 'a') keyboard.A = false;
        if (event.key === 'd') keyboard.D = false;
        if (event.key === 'e') keyboard.E = false;
        if (event.key === ' ') keyboard.SPACE = false;
    });
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

window.matchMedia("(orientation: portrait").addEventListener("change", e => {
    const portrait = e.matches;

    if (portrait) {
        document.getElementById('rotateOverlay').style = 'display: block';
    } else {
        document.getElementById('rotateOverlay').style = 'display: none';
    }
});