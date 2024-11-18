class Level {
    enemies;
    endboss;
    clouds;
    coins;
    bottles;
    backgroundObjeects;
    level_end_x = 3800;

    constructor(enemies, endboss, clouds, coins, bottles, backgroundObjects){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}