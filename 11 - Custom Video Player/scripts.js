const player = document.querySelector('.player');
const video = document.querySelector('.player__video');
const playBtn = document.querySelector('.player__button');
const playbackRateInput = document.querySelector('input[name=playbackRate]');
const volumeInput = document.querySelector('input[name=volume]');
const progressBarFilled = document.querySelector('.progress__filled');
const progressBar = document.querySelector('.progress');
const playerButtons = document.querySelectorAll('[data-skip]');
const fullscreenBtn = document.querySelector('.fullscreen');

progressBarFilled.style.flexBasis = 0;

const isPlaying = video => !video.paused && !video.ended && video.readyState > 2;

function toggleVideo() {
    if(isPlaying(video)) {
        video.pause();
        playBtn.textContent = '►';
    }else {
        video.play();
        playBtn.textContent = '❚❚';
    }
}

playBtn.addEventListener('click', toggleVideo);
video.addEventListener('click', toggleVideo);

playbackRateInput.addEventListener('change', function() {
    video.playbackRate = this.value;
});

volumeInput.addEventListener('change', function() {
    video.volume = this.value;
});

video.addEventListener('timeupdate', function() {
    progressBarFilled.style.flexBasis = this.currentTime / this.duration * 100 + '%';
});

video.addEventListener('ended', () => playBtn.textContent = '►');

function skipVideo() {
    video.currentTime += +this.dataset.skip;
    
    if(video.currentTime < 0) {
        video.currentTime = 0;
    }else if(video.currentTime > video.duration) {
        video.currentTime = video.duration;
    }
}

playerButtons.forEach(btn => btn.addEventListener('click', skipVideo));

function scrub(e) {
    const ratio = e.offsetX / progressBar.offsetWidth;
    progressBarFilled.style.flexBasis = ratio * 100 + '%';
    video.currentTime = video.duration * ratio;
}

let mouseMove = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousedown', () => mouseMove = true);
progressBar.addEventListener('mousemove', e => mouseMove && scrub(e));
progressBar.addEventListener('mouseup', () => mouseMove = false);
progressBar.addEventListener('mouseleave', () => mouseMove = false);

let fullscreen = false;
function makeFullscreen() {
    if(!fullscreen) {
        player.style.width = window.innerWidth + 'px';
        player.style.height = window.innerHeight + 'px';
        this.innerHTML = '&minus;';
    }else {
        player.style.width = 'auto';
        player.style.height = 'auto';
        this.innerHTML = '&#x26F6;';
    }

    fullscreen = !fullscreen;
}

function adaptFullscreen() {
    if(fullscreen) {
        player.style.width = window.innerWidth + 'px';
        player.style.height = window.innerHeight + 'px';
    }
}

fullscreenBtn.addEventListener('click', makeFullscreen);
window.addEventListener('resize', adaptFullscreen);

