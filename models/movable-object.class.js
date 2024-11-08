class MovableObject {
    x = 120;
    y = 300;
    img;
    height = 150;
    width = 100;
    imageCache = [];

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving Right');
    }

    moveLeft() {
        console.log('Moving Left');
    }
}