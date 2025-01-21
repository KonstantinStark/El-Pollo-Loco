class Chicken extends MovableObject {
    y = 355;
    width = 70;
    height = 70;
    offset = {
        top: 10,
        bottom: 5,
        left: 40,
        right: 9,
    };
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    isDead = false;
    walkingInterval;
    animationInterval;

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700 + Math.random() * 3000;
        this.speed = .15 + Math.random() * 1.5;
        this.animate();
    }

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

    die() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    isDead() {
        return this.energy <= 0;
    }
}