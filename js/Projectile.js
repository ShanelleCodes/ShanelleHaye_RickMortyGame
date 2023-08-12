//Handle lasers the player is shooting
class Projectile {
    constructor() {
        this.width = 4;
        this.height = 40;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.free = true;
    }
    draw(context) {
        if (!this.free) {
            context.save();
            context.fillStyle = 'cyan';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.restore();
        }
    }
    update() {
        if (!this.free) {
            this.y -= this.speed;
            if (this.y < 0 - this.height) this.reset();
        }
    }

    //Helper Methods 
    start(x, y) { //runs when the object is taken from the object pool 
        this.x = x - this.width * 0.5;
        this.y = y;
        this.free = false;
    }
    reset() { //runs when the object is no longer needed and is returned back to the pool 
        this.free = true;
    }
}
