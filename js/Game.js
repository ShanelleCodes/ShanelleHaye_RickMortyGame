//Contains the main game logic 
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.player = new Player(this);

        //projectiles 
        this.projectilesPool = [];
        this.numberOfProjectiles = 15;
        this.createProjectiles();
        this.fired = false;

        //enemys
        this.columns = 2;
        this.rows = 2;
        this.enemySize = 80;

        //enemy waves
        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;
        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150;

        //game score
        this.score = 0;
        this.gameOver = false;

        //game over sound
        this.gameOverMusic = new Audio('assets/audio/this-is-a-bunch-of-bull-crap.mp3');
        this.isGameOverMusicPlaying = false; // Add a flag to track if the music is playing

        //event listeners 
        window.addEventListener('keydown', e => {
            if (e.key === '1' && !this.fired) this.player.shoot();
            this.fired = true;
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if (e.key === 'r' && this.gameOver) this.restart();
        });
        window.addEventListener('keyup', e => {
            this.fired = false;
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index, 1);
        });
    }

    render(context, deltaTime) {
        //sprite timing
        if (this.spriteTimer > this.spriteInterval) {
            this.spriteUpdate = true;
            this.spriteTimer = 0;
        } else {
            this.spriteUpdate = false;
            this.spriteTimer += deltaTime;
        }

        this.drawStatusText(context);
        this.player.draw(context);
        this.player.update();
        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        })
        this.waves.forEach(wave => {
            wave.render(context);
            if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
                this.newWave();
                this.waveCount++;
                wave.nextWaveTrigger = true;
                if (this.player.lives < this.player.maxLives) this.player.lives++;
            }
        })
        if (this.gameOver && !this.isGameOverMusicPlaying) { // Check if game over and music not playing
            this.gameOverMusic.play(); // Play the game over music
            this.isGameOverMusicPlaying = true; // Set the flag to true
            this.drawStatusText(context); // Draw the "game over" text
        }
    }

    //create projectiles object pool 
    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.projectilesPool.push(new Projectile());
        }
    }
    //get free projectile object from the pool 
    getProjectile() {
        for (let i = 0; i < this.projectilesPool.length; i++) {
            if (this.projectilesPool[i].free) return this.projectilesPool[i];
        }
    }
    //collision detection between 2 rectangles
    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        )
    }
    drawStatusText(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.fillText('SCORE: ' + this.score, 20, 40);
        context.fillText('WAVE: ' + this.waveCount, 20, 80);
        for (let i = 0; i < this.player.maxLives; i++) {
            context.strokeRect(20 + 25 * i, 100, 10, 30)
        }
        for (let i = 0; i < this.player.lives; i++) {
            context.fillRect(20 + 25 * i, 100, 10, 30)
        }
        if (this.gameOver) {
            context.textAlign = 'center';
            context.font = '40px Impact';
            context.fillText('OMG SO EMBARRASING!', this.width * 0.5, this.height * 0.35);
            context.font = '100px Impact';
            context.fillText('GAME OVER!', this.width * 0.5, this.height * 0.5);
            context.font = '30px Impact';
            context.fillText('PRESS R TO RESTART!', this.width * 0.5, this.height * 0.5 + 40);

        }
        context.restore();
    }
    newWave() {
        this.playRandomWaveSound();
        if (Math.random() < 0.5 && this.columns * this.enemySize < this.width * 0.8) {
            this.columns++;
        } else if (this.rows * this.enemySize < this.height * 0.6) {
            this.rows++;
        }
        this.waves.push(new Wave(this));
    }
    playRandomWaveSound() {
        const randomSoundIndex = Math.floor(Math.random() * waveSounds.length);
        const waveSound = new Audio(waveSounds[randomSoundIndex]);
        waveSound.volume = 0.6; // Adjust the volume as needed
        waveSound.play();
    }
    restart() {
        this.player.restart();
        this.columns = 2;
        this.rows = 2;
        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;
        this.score = 0;
        this.gameOver = false;
    }
}



