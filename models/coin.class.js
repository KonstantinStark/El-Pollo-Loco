class Coin extends MovableObject {
    y = 20;
    width = 30;
    height = 30;
    offset = {
        top: 10,
        bottom: 5,
        left: 4,
        right: 9,
      };
    IMAGES_COIN = [
        './img/8_coin/coin_3.png'
    ]

    constructor() {
        super().loadImage('./img/8_coin/coin_3.png')
        this.loadImages(this.IMAGES_COIN);
        this.x = 500 + Math.random() * 2000;
        this.y = 100 + Math.random() * 250;

    }
}