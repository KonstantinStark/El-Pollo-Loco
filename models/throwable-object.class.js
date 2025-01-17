class ThrowableObject extends MovableObject {
    IMAGES_ROTATE = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    hasHitEnemy = false;

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_ROTATE);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.currentImageIndex = 0;
        this.img = this.imageCache[this.IMAGES_ROTATE[0]];
        this.throw();
    }
    
    throw() {
        throw_sound.play();
        this.speedY = 21;
        this.applyGravity();

        setInterval(() => {
            this.x += 10;
        }, 25);

        setInterval(() => {
            // wenn die flasche enemy trifft soll die rotate stoppen und die splash animation starten
            // außerdem soll die flasche nach 2 sekunden verschwinden
            this.playRotationAnimation();
            if (this.hasHitEnemy) {
                this.playAnimation(this.IMAGES_SPLASH);
                setTimeout(() => {
                    this.energy = 0;
                }, 2000);
            }
        }, 100);
    }
}

