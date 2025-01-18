class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarHealthEndboss = new StatusBarHealthEndboss();
    throwableObjects = [];
    throwCooldown = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.endboss.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsCoin();
            this.checkCollisionsBottle();
            this.checkCollisionsWithEndboss();
            this.checkCharacterCollisionsWithEndboss();
        }, 1);
    }

    checkThrowObjects() {
        if (this.keyboard.E && !ePressed && this.statusBarBottle.percentage >= 20 && !this.throwCooldown) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.setPercentage(this.statusBarBottle.percentage - 20);
            this.throwCooldown = true;
            setTimeout(() => {
                this.throwCooldown = false;
            }, 1000);
        }
        if (!this.keyboard.E) {
            ePressed = false;
        }
    }

    checkCharacterCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsWithEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.level.endboss[0].isColliding(bottle)) {
                bottle.hasHitEnemy = true;
                this.endbossIsHit();
                this.statusBarHealthEndboss.percentage -= 10;
                if (this.statusBarHealthEndboss.percentage < 0) {
                    this.statusBarHealthEndboss.percentage = 0;
                }
                this.statusBarHealthEndboss.setPercentage(this.statusBarHealthEndboss.percentage);
                let index = this.throwableObjects.indexOf(bottle);
                if (index > -1) {
                    this.throwableObjects.splice(index, 1);
                }
            }
        });        
    }

    endbossIsHit() {
        this.level.endboss[0].bossEnergy -= 10;
        if (this.level.endboss[0].bossEnergy < 0) {
            this.level.endboss[0].bossEnergy = 0;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy)
            }
        });
    }

    checkCollisionsCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                coin_sound.currentTime = 0;
                coin_sound.play();
                this.statusBarCoin.percentage += 10;
                if (this.statusBarCoin.percentage > 100) {
                    this.statusBarCoin.percentage = 100;
                }
                this.statusBarCoin.setPercentage(this.statusBarCoin.percentage);
                this.level.coins.splice(index, 1);
            }
        });
    }

    checkCollisionsBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.statusBarBottle.percentage < 100) {
                pick_up_sound.currentTime = 0;
                pick_up_sound.play();
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentage + 20);
                const index = this.level.bottles.indexOf(bottle);
                if (index > -1) {
                    this.level.bottles.splice(index, 1);
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);

        if (this.character.x >= this.level.endboss[0].x - 800) {
            this.addToMap(this.statusBarHealthEndboss);
        }

        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);

        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects)
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
    if (mo.img && mo.img.complete) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
}

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    showGameOverScreen() {
        loose_sound.play();

        let gameOverImage = document.createElement("img");
        gameOverImage.src = "./img/9_intro_outro_screens/game_over/game over2.png";
        gameOverImage.style.position = "fixed";
        gameOverImage.style.top = "30%";
        gameOverImage.style.left = "50";
        gameOverImage.style.width = "30%";
        gameOverImage.style.height = "30%";
        gameOverImage.style.objectFit = "contain";
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