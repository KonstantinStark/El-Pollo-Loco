class Level {
    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjeects;
    level_end_x = 3500;

    constructor(enemies, clouds, coins, bottles, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}