class ThrowableObject extends MovableObject {

    constructor(x, y){
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 65;
        this.height= 65; 
        this.throw();
    }

    throw(){
        this.speedY = 21;
        this.applyGravity();
        setInterval (() => {
            this.x += 10;
        }, 25);
    }
}