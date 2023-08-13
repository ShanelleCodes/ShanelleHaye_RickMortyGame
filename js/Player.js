//Hanlde movement and animation of main character (the shooter)
class Player {
    constructor(game) {
        this.game = game;
        this.width = 140;
        this.height = 120;
        this.x = this.game.width * 0.5 - this.width * 0.5; // to center the player
        this.y = this.game.height - this.height; // player will sit at bottom of screen
        this.speed = 5;
        this.lives = 3;
        this.maxLives = 10;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.shootSound = new Audio('assets/audio/laser3.MP3');
        this.shootSound.volume = 0.5; // Adjust the volume as needed

    }
    draw(context) {
        // handle sprite frames
        if (this.game.keys.indexOf('1') > -1) {
            this.frameX = 1;
        } else {
            this.frameX = 0;
        }
        context.drawImage(this.image, this.frameX * this.width, 0, this.width,
            this.height, this.x, this.y, this.width, this.height);
    }
    update() { // update the horizontal position of the player by its speed
        // horizontal movement 
        if (this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if (this.game.keys.indexOf('ArrowRight') > -1) this.x += this.speed;
        // horizontal boundaries 
        if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
        else if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width -
            this.width * 0.5;
    }

    shoot() {
        const projectile = this.game.getProjectile();
        if (projectile) {
            projectile.start(this.x + this.width * 0.5, this.y);
            this.shootSound.play();
        }
    }

    restart() {
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.lives = 3;
    }

}
