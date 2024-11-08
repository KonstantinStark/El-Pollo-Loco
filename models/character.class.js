class Character extends MovableObject {
    y = 135;
    width = 180;
    height = 300;


    constructor(){
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png')
        this.loadImages([
            './img/2_character_pepe/2_walk/W-21.png',
            './img/2_character_pepe/2_walk/W-22.png',
            './img/2_character_pepe/2_walk/W-23.png',
            './img/2_character_pepe/2_walk/W-24.png',
            './img/2_character_pepe/2_walk/W-25.png',
            './img/2_character_pepe/2_walk/W-26.png'
        ]);
    }

    jump() {

    }
}