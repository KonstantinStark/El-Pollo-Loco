function startGame() {
    music_sound.play();
    document.getElementById("overlay").style.display = "none";
    document.getElementById("canvas").style.visibility = "visible";
    console.log("Spiel gestartet!");
}

function toggleMute() {
    let muteIcon = document.getElementById("muteIcon");
    if (music_sound.muted) {
        music_sound.muted = false;
        muteIcon.src = "./img/10_icons/on.svg";
    } else {
        music_sound.muted = true;
        muteIcon.src = "./img/10_icons/mute.svg";
    }
}