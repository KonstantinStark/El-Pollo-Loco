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
music_sound.volume = 0.10;
music_sound.loop = true;


function init() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("startGameButton").addEventListener("click", startGame);
}

function init() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("startGameButton").addEventListener("click", startGame);
    document.getElementById("leftButton").addEventListener("mousedown", () => {
        keyboard.A = true;
    });
    document.getElementById("leftButton").addEventListener("mouseup", () => {
        keyboard.A = false;
    });
    document.getElementById("leftButton").addEventListener("touchstart", () => {
        keyboard.A = true;
    });
    document.getElementById("leftButton").addEventListener("touchend", () => {
        keyboard.A = false;
    });

    document.getElementById("rightButton").addEventListener("mousedown", () => {
        keyboard.D = true;
    });
    document.getElementById("rightButton").addEventListener("mouseup", () => {
        keyboard.D = false;
    });
    document.getElementById("rightButton").addEventListener("touchstart", () => {
        keyboard.D = true;
    });
    document.getElementById("rightButton").addEventListener("touchend", () => {
        keyboard.D = false;
    });

    document.getElementById("throwButton").addEventListener("mousedown", () => {
        keyboard.E = true;
    });
    document.getElementById("throwButton").addEventListener("mouseup", () => {
        keyboard.E = false;
    });
    document.getElementById("throwButton").addEventListener("touchstart", () => {
        keyboard.E = true;
    });
    document.getElementById("throwButton").addEventListener("touchend", () => {
        keyboard.E = false;
    });

    document.getElementById("upButton").addEventListener("mousedown", () => {
        keyboard.SPACE = true;
    });
    document.getElementById("upButton").addEventListener("mouseup", () => {
        keyboard.SPACE = false;
    });
    document.getElementById("upButton").addEventListener("touchstart", () => {
        keyboard.SPACE = true;
    });
    document.getElementById("upButton").addEventListener("touchend", () => {
        keyboard.SPACE = false;
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