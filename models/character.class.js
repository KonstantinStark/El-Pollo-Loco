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
    walking_sound = new Audio('./audio/walk.wav')
    jump_sound = new Audio('./audio/jump.wav')
    loose_sound = new Audio('./audio/loose.mp3')

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
        let deadImage= false;
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.D && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.A && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;

            if (this.isDead() && !deadAnimation) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.showGameOverScreen();
                }, 1000);
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
        let gameOverText = document.createElement("div");
        gameOverText.innerHTML = "Game Over";
        gameOverText.style.position = "absolute";
        gameOverText.style.top = "50%";
        gameOverText.style.left = "50%";
        gameOverText.style.transform = "translate(-50%, -50%)";
        gameOverText.style.fontSize = "80px";
        gameOverText.style.color = "red";
        gameOverText.style.zIndex = "100";
        gameOverText.style.textShadow = "5px 5px 10px rgba(0, 0, 0, 0.5)";
        document.body.appendChild(gameOverText);

        let tryAgainButton = document.createElement("button");
        tryAgainButton.innerHTML = "Try Again";
        tryAgainButton.style.position = "absolute";
        tryAgainButton.style.top = "60%";
        tryAgainButton.style.left = "50%";
        tryAgainButton.style.transform = "translateX(-50%)";
        tryAgainButton.style.fontSize = "20px";
        document.body.appendChild(tryAgainButton);

        tryAgainButton.addEventListener("click", () => {
            window.location.reload();
        });
    }
}
