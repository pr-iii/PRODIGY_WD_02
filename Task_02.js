// script.js

let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startStopBtn.innerText = "Pause";
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startStopBtn.innerText = "Resume";
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerText = "Start";
    display.innerText = "00:00:00.000";
    difference = 0;
    lapCounter = 0;
    laps.innerHTML = '';
}

function lapTime() {
    if (running) {
        const lapTime = display.innerText;
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${++lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    display.innerText = (hours < 10 ? "0" + hours : hours) + ":" + 
                        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                        (seconds < 10 ? "0" + seconds : seconds) + "." + 
                        (milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds);
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', lapTime);