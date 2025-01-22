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
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    world;
    isDeadAnimationPlayed = false;

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png')
        this.world = this.world;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Animates the character, handling movement, jumping, and death sequences.
     * Continuously updates the character's animation state.
     */
    animate() {
        let animationInterval = setInterval(() => {
            walking_sound.pause();
            if (!this.isDead() && !this.isEndbossDead()) {
                this.movement();
            }
            if (this.isDead() && !this.isDeadAnimationPlayed) {
               this.isDeadAnimation();
            }
            if (this.world.level.endboss[0].bossEnergy === 0) {
                this.img = null;
                clearInterval(animationInterval)
            };
        }, 1000 / 60);
        this.animationInterval();
    }

    /**
     * Handles the character's movement based on user input.
     */
    movement() {
        if (this.world.keyboard.D && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (!this.isAboveGround()) {
                walking_sound.play();
            }
        }
        if (this.world.keyboard.A && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if (!this.isAboveGround()) {
                walking_sound.play();
            }
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Plays the death animation and triggers the game over screen when finished.
     */
    isDeadAnimation () {
        this.isDeadAnimationPlayed = true; // Update the property
        scream_sound.play();
        this.playAnimation(this.IMAGES_DEAD);
        const animationDuration = this.IMAGES_DEAD.length * 170;
        setTimeout(() => {
            this.world.showGameOverScreen();
            this.img = null;
        }, animationDuration);
    }

    /**
     * Manages the animation interval for different states such as walking, jumping, and idle.
     */
    animationInterval () {
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
                        this.playAnimation(this.IMAGES_IDLE);
                    }
                }
            } else if (this.isDead() && !this.isDeadAnimationPlayed) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 150);
    }

    /**
     * Checks if the end boss is dead.
     * @returns {boolean} True if the end boss has no energy left, otherwise false.
     */
    isEndbossDead() {
        return this.world.level.endboss[0].bossEnergy == 0;
    }

    /**
     * Makes the character jump by setting the vertical speed.
     */
    jump() {
        jump_sound.play();
        this.speedY = 20;
    }
}
