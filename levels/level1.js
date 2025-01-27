let level1;
function initLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken()
        ],
        [
            new Endboss()
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -720),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -720),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -720),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -720),
            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/air.png', 720),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 720),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 720),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 720),
            new BackgroundObject('./img/5_background/layers/air.png', 720 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 720 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 720 * 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 720 * 2),
            new BackgroundObject('./img/5_background/layers/air.png', 720 * 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 720 * 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 720 * 3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 720 * 3),
            new BackgroundObject('./img/5_background/layers/air.png', 720 * 4),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 720 * 4),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 720 * 4),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 720 * 4),
            new BackgroundObject('./img/5_background/layers/air.png', 720 * 5),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 720 * 5),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 720 * 5),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 720 * 5),
            new BackgroundObject('./img/5_background/layers/air.png', 720 * 6),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 720 * 6),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 720 * 6),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 720 * 6)
        ],
    );
}