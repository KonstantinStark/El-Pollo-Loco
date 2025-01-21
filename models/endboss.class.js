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
    speed = 50;

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
        this.world = world;
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        let i = 0;
        let animationInterval = setInterval(() => {
            if (this.bossIsDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                const animationDuration = this.IMAGES_DEAD.length * 250;
                setTimeout(() => {
                    this.showWinScreen();
                    this.img = null;
                    clearInterval(animationInterval);
                }, animationDuration);
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
            if (this.world && this.world.character && this.world.character.x > 3400 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 150);
    }

    showWinScreen() {
        this.pauseAndPlayMusic();
        const gameWinImage = this.createWinImage();
        const tryAgainButton = this.createTryAgainButton();
    
        document.body.appendChild(gameWinImage);
        document.body.appendChild(tryAgainButton);
    
        this.setupTryAgainButtonEvents(tryAgainButton, gameWinImage);
    }
    
    pauseAndPlayMusic() {
        music_sound.pause();
        win_sound.play();
    }
    
    createWinImage() {
        let gameWinImage = document.createElement("img");
        gameWinImage.src = "./img/9_intro_outro_screens/win/win_2.png";
        gameWinImage.style.position = "fixed";
        gameWinImage.style.top = "30%";
        gameWinImage.style.left = "50";
        gameWinImage.style.width = "30%";
        gameWinImage.style.height = "30%";
        gameWinImage.style.objectFit = "contain";
        gameWinImage.style.zIndex = "100";
        return gameWinImage;
    }
    
    createTryAgainButton() {
        let tryAgainButton = document.createElement("button");
        tryAgainButton.innerHTML = "Try Again";
        tryAgainButton.style.fontFamily = "'MexicanTequila'";
        tryAgainButton.style.position = "absolute";
        tryAgainButton.style.bottom = "65px";
        tryAgainButton.style.padding = "5px 10px";
        tryAgainButton.style.paddingTop = "10px";
        tryAgainButton.style.fontSize = "50px";
        tryAgainButton.style.cursor = "pointer";
        tryAgainButton.style.border = "solid 2px black";
        tryAgainButton.style.borderRadius = "5px";
        tryAgainButton.style.color = "#a0220a";
        tryAgainButton.style.boxShadow = "10px 10px 15px rgba(0, 0, 0, 0.5)";
        tryAgainButton.style.backgroundColor = "#ffcd00";
        tryAgainButton.style.transition = "all 0.3s ease";
        tryAgainButton.style.zIndex = "101";
        return tryAgainButton;
    }
    
    setupTryAgainButtonEvents(tryAgainButton, gameWinImage) {
        tryAgainButton.addEventListener("mouseover", () => {
            tryAgainButton.style.backgroundColor = "#a0220a";
            tryAgainButton.style.color = "#fff";
            tryAgainButton.style.boxShadow = "0px 0px 20px rgba(160, 34, 10, 0.7)";
            tryAgainButton.style.transform = "scale(1.1)";
        });
    
        tryAgainButton.addEventListener("mouseout", () => {
            tryAgainButton.style.backgroundColor = "#ffcd00";
            tryAgainButton.style.color = "#a0220a";
            tryAgainButton.style.boxShadow = "10px 10px 15px rgba(0, 0, 0, 0.5)";
            tryAgainButton.style.transform = "scale(1)";
        });
    
        tryAgainButton.addEventListener("click", () => {
            this.world.reset();
            document.body.removeChild(gameWinImage);
            document.body.removeChild(tryAgainButton);
        });
    }
    
}