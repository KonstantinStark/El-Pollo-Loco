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

    checkCollisionsWithEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.level.endboss[0].isColliding(bottle)) {
                this.statusBarHealthEndboss.percentage -= 20; 
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
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
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
}