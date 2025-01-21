class Character extends MovableObject {
    y = 80;
    width = 180;
    height = 300;
    speed = 6;
    offset = {
        top: 100,
        bottom: 5,
        left: 4,
        right: 9,
    };
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    world;

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png')
        this.world = this.world;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.handleMovement();
        this.handleAnimation();
    }

    handleMovement() {
        let isDeadAnimationPlayed = false;
        let animationInterval = setInterval(() => {
            walking_sound.pause();
            if (!this.isDead() && !this.isEndbossDead()) {
                if (this.world.keyboard.D && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    if (!this.isAboveGround()) walking_sound.play();
                }
                if (this.world.keyboard.A && this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    if (!this.isAboveGround()) walking_sound.play();
                }
                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                }
                this.world.camera_x = -this.x + 100;
            }
            if (this.isDead() && !isDeadAnimationPlayed) {
                this.playDeathAnimation();
                isDeadAnimationPlayed = true;
            }
            if (this.world.level.endboss[0].bossEnergy === 0) {
                this.img = null;
                clearInterval(animationInterval);
            }
        }, 1000 / 60);
    }

    handleAnimation() {
        setInterval(() => {
            if (!this.isDead() && !this.isEndbossDead()) {
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                } else {
                    if (this.world.keyboard.D || this.world.keyboard.A) {
                        this.playAnimation(this.IMAGES_WALKING);
                    } else {
                        this.stopAnimation();
                    }
                }
            }
        }, 180);
    }

    isEndbossDead() {
        return this.world.level.endboss[0].bossEnergy == 0
    }

    jump() {
        jump_sound.play();
        this.speedY = 20;
    }
}
