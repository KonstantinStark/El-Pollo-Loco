class Level {
    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjeects;
    level_end_x = 2700;

    constructor(enemies, clouds, coins, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}