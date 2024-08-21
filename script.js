let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isRunning = false;
let interval;
let lapCounter = 0;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const playPauseButton = document.getElementById('playPauseButton');
const lapsElement = document.getElementById('laps');
const clearButton = document.getElementById('clearButton');

function updateWatch() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    minutesElement.textContent = `${formatTime(minutes)} :`;
    secondsElement.textContent = `${formatTime(seconds)} :`;
    millisecondsElement.textContent = formatMilliseconds(milliseconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(time) {
    return time < 100 ? `0${Math.floor(time / 10)}` : Math.floor(time / 10);
}

function startStopWatch() {
    if (isRunning) {
        clearInterval(interval);
        playPauseButton.textContent = 'Play';
    } else {
        interval = setInterval(updateWatch, 10);
        playPauseButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function resetWatch() {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    isRunning = false;
    playPauseButton.textContent = 'Play';
    updateWatch();
    lapsElement.innerHTML = '';
    clearButton.classList.add('display-none');
    lapCounter = 0;
}

function recordLap() {
    if (!isRunning) return;

    lapCounter++;
    const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
    const lapItem = document.createElement('li');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `<span class="number">#${lapCounter}</span><span class="time-stamp">${lapTime}</span>`;
    lapsElement.appendChild(lapItem);
    clearButton.classList.remove('display-none');
}

function clearLaps() {
    lapsElement.innerHTML = '';
    clearButton.classList.add('display-none');
}
