class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 300;
    height = 150;
    width = 100;

    /**
     * Loads an image from the given path and assigns it to the object.
     * @param {string} path - The file path of the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object's image onto the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the object's frame if it is an instance of a relevant class.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Coin || 
            this instanceof Bottle || 
            this instanceof Chicken || 
            this instanceof SmallChicken || 
            this instanceof Character || 
            this instanceof Endboss) {
            const xPos = this.x + this.offset.left;
            const yPos = this.y + this.offset.top;
            const width = this.width - this.offset.left - this.offset.right;
            const height = this.height - this.offset.top - this.offset.bottom;
        }
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * @param {string[]} images - An array of image file paths.
     */
    loadImages(images) {
        images.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}