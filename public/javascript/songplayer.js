document.addEventListener("DOMContentLoaded", function() {
    // Get references to the audio element and control buttons
    const audio = document.getElementById('myAudio');
    const playButton = document.querySelector('[name="pause"]');
    const backwardButton = document.querySelector('[name="backwards"]');
    const forwardButton = document.querySelector('[name="forward"]');
    const muteButton = document.querySelector('[name="muted"]');
    const volumeSlider = document.querySelector('input[type="range"]');

    // Play/pause functionality
    playButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '<img id="play" src="images/pause_button.png" alt="pause"></img>';
    } else {
        audio.pause();
        playButton.innerHTML = '<img id="play" src="images/play_button.png" alt="play"></img>';
    }
    });

    // Skip backward functionality
    backwardButton.addEventListener('click', function () {
    audio.currentTime -= 5; // You can adjust the time to skip backward
    });

    // Skip forward functionality
    forwardButton.addEventListener('click', function () {
    audio.currentTime += 5; // You can adjust the time to skip forward
    });

    // Mute/unmute functionality
    let isMuted = false;
    muteButton.addEventListener('click', function () {
    isMuted = !isMuted;
    audio.muted = isMuted;
    muteButton.innerHTML = `<img src="images/${isMuted ? 'muted' : 'unmuted'}.png" alt="${isMuted ? 'muted' : 'unmuted'}"></img>`;
    });

    // Volume control functionality
    volumeSlider.addEventListener('input', function () {
    audio.volume = volumeSlider.value / 100;
    });
});