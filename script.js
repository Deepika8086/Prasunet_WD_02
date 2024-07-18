// Stopwatch variables
let stopwatchInterval;
let startTime;
let pausedTime = 0;
let running = false;

// DOM elements
const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('laps');

// Start the stopwatch
function startStopwatch() {
    if (!running) {
        startTime = Date.now() - pausedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10);
        running = true;
        startButton.textContent = 'Resume';
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    } else {
        // Resume
        startTime = Date.now() - pausedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10);
        startButton.textContent = 'Resume';
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

// Pause the stopwatch
function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    pausedTime = Date.now() - startTime;
    running = false;
    startButton.textContent = 'Resume';
    pauseButton.disabled = true;
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(stopwatchInterval);
    running = false;
    pausedTime = 0;
    display.textContent = '00:00:00.000';
    startButton.textContent = 'Start';
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapsList.innerHTML = '';
}

// Update the stopwatch display
function updateStopwatch() {
    const elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Format time as HH:MM:SS.mmm
function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor(milliseconds / 60000) % 60;
    let seconds = Math.floor(milliseconds / 1000) % 60;
    let millis = milliseconds % 1000;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
}

// Record a lap
function recordLap() {
    const lapTime = formatTime(Date.now() - startTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}
