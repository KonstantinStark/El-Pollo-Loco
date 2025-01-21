function toggleMute() {
    let muteIcon = document.getElementById("muteIcon");

    if (music_sound.muted) {
        music_sound.muted = false;
        jump_sound.muted = false;
        loose_sound.muted = false;
        walking_sound.muted = false;
        throw_sound.muted = false;
        pick_up_sound.muted = false;  
        coin_sound.muted = false; 
        scream_sound.muted = false; 
        chicken_sound.muted = false; 
        chicken2_sound.muted = false; 
        muteIcon.src = "./img/10_icons/on.svg";
    } else {
        music_sound.muted = true;
        jump_sound.muted = true;
        loose_sound.muted = true;
        walking_sound.muted = true;
        throw_sound.muted = true;
        pick_up_sound.muted = true; 
        coin_sound.muted = true; 
        scream_sound.muted = true;
        chicken_sound.muted = true; 
        chicken2_sound.muted = true; 
        muteIcon.src = "./img/10_icons/mute.svg";
    }
}