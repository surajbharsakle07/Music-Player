const music = document.getElementById('main-audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');


let isPlaying = false;
let songIndex = 0;

// Play or Pause
function togglePlay() {
    if (isPlaying) {
        music.pause();
        isPlaying = false;
        document.getElementById('play-icon').classList.replace('fa-pause', 'fa-play');
    } else {
        music.play();
        isPlaying = true;
        document.getElementById('play-icon').classList.replace('fa-play', 'fa-pause');
    }
}


const songs = [
    {
        name: 'SAAHO BGM', // This must match the filename exactly
        displayName: 'SAAHO BGM',
        artist: 'Played by Media' // Update this to the actual singer
    },

    {
        name: 'Marco_Tony_bgm',
        displayName: 'Marco_Tony_bgm',
        artist: 'Played by Media'
    },
    {
        name: 'Rolex Entry bgm',
        displayName: 'Rolex Entry bgm',
        artist: 'Played by Media'
    }

];

function loadSong(song) {
    title.innerText = song.displayName;
    artist.innerText = song.artist;
    
    // This tells the browser: "Go into the music folder and find the .mp3"
    music.src = `music/${song.name}.mp3`; 
}

// Next/Prev functions
function changeSong(direction) {
    songIndex = (songIndex + direction + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    if (isPlaying) music.play();
}

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar on Click
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeSong(-1));
nextBtn.addEventListener('click', () => changeSong(1));
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', () => changeSong(1));
progressContainer.addEventListener('click', setProgressBar);
volumeSlider.addEventListener('input', (e) => music.volume = e.target.value);

// Initialize
loadSong(songs[songIndex]);