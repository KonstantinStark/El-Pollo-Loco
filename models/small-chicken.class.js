class SmallChicken extends MovableObject {
    y = 384;
    width = 40;
    height = 40;
    offset = {
        top: 10,
        bottom: 5,
        left: 40,
        right: 9,
      };
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    isDead = false;
    walkingInterval;
    animationInterval;

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700 + Math.random() * 3000;
        this.speed = .15 + Math.random() * 1.5;
        this.animate();
    }

    /**
     * Starts the walking and animation intervals for the small chicken.
     * The chicken moves left and plays the walking animation unless it is dead.
     */
    animate() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 75);
    }

    /**
     * Handles the death of the small chicken.
     * Stops the walking and animation intervals and plays the death animation.
     */
    die() {
        this.isDead = true;
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        this.playAnimation(this.IMAGES_DEAD);
    }
}