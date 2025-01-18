class ThrowableObject extends MovableObject {
    IMAGES_ROTATE = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    hasHitEnemy = false;

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
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

        let animationInterval = setInterval(() => {
            this.playRotationAnimation();
            if (this.hasHitEnemy) {                
                this.playAnimation(this.IMAGES_SPLASH);
                setTimeout(() => {
                    this.energy = 0;
                    clearInterval(animationInterval);
                }, 2000);
            }
        }, 100);
    }
}

