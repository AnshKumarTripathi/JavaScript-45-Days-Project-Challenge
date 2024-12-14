// app.js

function updateTime() {
  // Get the current time
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Format time as HH:MM:SS
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let formattedTime = `${hours}:${minutes}:${seconds}`;

  // Display the time in the HTML
  document.getElementById("time-container").textContent = formattedTime;
}

// Update the time every second
setInterval(updateTime, 1000);

// Call updateTime once to display the clock immediately when the page loads
updateTime();
