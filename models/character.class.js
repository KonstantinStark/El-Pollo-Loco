class Character extends MovableObject {
    y = 80;
    width = 180;
    height = 300;
    speed = 6;
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
    jump_sound = new Audio('./audio/jump.wav')
    loose_sound = new Audio('./audio/loose.mp3')
    walking_sound = new Audio('./audio/walk.wav')

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        let deadAnimation = false;
        let deadImage = false;
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.D && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.A && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;

            if (this.isDead() && !deadAnimation) {
                this.playAnimation(this.IMAGES_DEAD);
                this.showGameOverScreen();
                this.img = null;
                deadAnimation = true;
                deadImage = true;
            } else if (deadImage) {
                this.img = null;
            }

        }, 1000 / 60);

        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.D || this.world.keyboard.A) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 40);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 150);
    }

    jump() {
        this.jump_sound.play();
        this.speedY = 20;
    }

    showGameOverScreen() {
        this.loose_sound.play();

        let gameOverImage = document.createElement("img");
        gameOverImage.src = "./img/9_intro_outro_screens/game_over/game over.png";
        gameOverImage.style.position = "fixed";
        gameOverImage.style.top = "0";
        gameOverImage.style.left = "0";
        gameOverImage.style.width = "100%";
        gameOverImage.style.height = "100%";
        gameOverImage.style.objectFit = "cover";
        gameOverImage.style.zIndex = "100";
        document.body.appendChild(gameOverImage);

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
        document.body.appendChild(tryAgainButton);

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
            window.location.reload();
        });
    }
}
