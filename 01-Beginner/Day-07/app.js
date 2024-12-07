var seconds = 0;
var minutes = 0;
var hours = 0;
var timer;
var interval;

// Function to increment the timer
function incrementSeconds() {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
    if (minutes >= 60) {
      hours += 1;
      minutes = 0;
    }
  }
  timer.innerHTML =
    formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}

// Function to start the timer
function startTimer() {
  if (!interval) {
    interval = setInterval(incrementSeconds, 1000);
  }
}

// Function to stop the timer
function stopTimer() {
  clearInterval(interval);
  interval = null;
}

// Function to reset the timer
function resetTimer() {
  clearInterval(interval);
  interval = null;
  seconds = 0;
  minutes = 0;
  hours = 0;
  timer.innerHTML = "00:00:00";
}

// Function to format time to always have two digits
function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  timer = document.getElementById("timer");
  timer.innerHTML = "00:00:00";
});
