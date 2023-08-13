//sound effects for each wave
const waveSounds = [
    'assets/audio/SHOW ME WHAT YOU GOT - AUDIO FROM JAYUZUMI.COM.mp3',
    'assets/audio/IM GONNA KICK YOUR ASS.mp3',
    'assets/audio/WUBALUBADUBDUB.mp3'
];


//display popup window instructions 
window.addEventListener('load', function () {
    setTimeout(
        function open(event) {
            document.querySelector('.popup').style.display = "block";
        },
        100
    )
});

//close popup window 
document.getElementById('startGame').addEventListener('click', function () {
    document.querySelector('.popup').style.display = 'none';
});

//play music when game starts
let play = document.getElementById('popup');
function playMusic() {
    let audio = new Audio('assets/audio/rick and morty theme.mp3');
    audio.volume = 0.50;
    audio.loop = true; // Set loop to true to continuously loop the music
    audio.play();

    // Remove the click event listener to ensure the music plays only once
    play.removeEventListener('click', playMusic);
}
play.addEventListener('click', playMusic);

//loads game window
function startGame() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.font = '30px Impact';

    const game = new Game(canvas);

    let lastTime = 0;
    function animate(timeStamp) { // player animation loop  
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx, deltaTime);
        window.requestAnimationFrame(animate);
    }
    animate(0);
}
document.getElementById('startGame');
