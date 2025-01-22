class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    bossEnergy = 80;
    lastHit = 0;
    offset = { left: 0, right: 0, top: 0, bottom: 0 }

    /**
     * Applies gravity to the object, updating its position and speed over time.
     * The gravity effect is applied every 1/25th of a second.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground or if its vertical speed is positive.
     * @returns {boolean} True if the object is above the ground or falling down, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Checks for a collision between this object and another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the energy of the object when it is hit. Energy decreases by 0.1.
     * If energy goes below 0, it is set to 0. Updates the last hit timestamp.
     */
    hit() {
        this.energy -= 0.1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is recently hurt (within 0.3 seconds after being hit).
     * @returns {boolean} True if the object is still hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < .3;
    }

    /**
     * Checks if the object is dead (energy is 0).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the boss is dead (boss energy is 0).
     * @returns {boolean} True if the boss is dead, false otherwise.
     */
    bossIsDead() {
        return this.bossEnergy == 0;
    }

    /**
     * Plays an animation by cycling through an array of image paths.
     * @param {string[]} images - Array of image paths to use for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Stops the animation and sets the image to a default image.
     */
    stopAnimation() {
        this.img = this.imageCache['./img/2_character_pepe/2_walk/W-21.png'];
    }

    /**
     * Plays a rotation animation by cycling through the rotation images.
     */
    playRotationAnimation() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES_ROTATE.length;
        const nextImage = this.imageCache[this.IMAGES_ROTATE[this.currentImageIndex]];
        if (nextImage.complete) {
            this.img = nextImage;
        }
    }

    /**
     * Moves the object to the right by the object's speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by the object's speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 20;
    }
}
