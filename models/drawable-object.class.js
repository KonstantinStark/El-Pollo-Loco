class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 300;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '3';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

    drawFrame(ctx) {
        if (this instanceof Coin || this instanceof Bottle || this instanceof Chicken || this instanceof SmallChicken || this instanceof Character || this instanceof Endboss) {
            const xPos = this.x + this.offset.left;
            const yPos = this.y + this.offset.top;
            const width = this.width - this.offset.left - this.offset.right;
            const height = this.height - this.offset.top - this.offset.bottom;

            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(xPos, yPos, width, height);
            ctx.stroke();
        }
    }

    loadImages(images) {
        images.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}