class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 55;
    x = 3900;
    offset = {
        top: 50,
        bottom: 5,
        left: 4,
        right: 9,
    };

    hadFirstContact = false;
    world;
    isAttacking = false;
    speed = 25;
    animationInterval;

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(world) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    /**
     * Animates the Endboss by playing different animations based on its state.
     * Handles movement, attack, and death sequences.
     */
    animate() {
        let i = 0;
        let animationInterval = setInterval(() => {
            if (this.bossIsDead()) {
                this.isBossDead();
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.moveLeft();
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
            if (this.lastHit > 0 && this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            i++;
            this.hadFirstContactWithCharacter();
        }, 150);
    }

    /**
     * Handles the Endboss' death animation and triggers the win screen after the animation ends.
     */
    isBossDead() {
        this.playAnimation(this.IMAGES_DEAD);
        const animationDuration = this.IMAGES_DEAD.length * 250;
        setTimeout(() => {
            if (!this.winScreenShown) {
                this.world.showWinScreen();
                this.winScreenShown = true;
            }
            clearInterval(this.animationInterval);
        }, animationDuration);
    }

    /**
     * Checks if the Endboss had first contact with the character and updates the state accordingly.
     */
    hadFirstContactWithCharacter() {
        if (this.world && this.world.character && this.world.character.x > 3400 && !this.hadFirstContact) {
            i = 0;
            this.hadFirstContact = true;
        }
    }
}