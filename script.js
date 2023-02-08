const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const timeDisplay = document.getElementById("time");
const lapsList = document.getElementById("laps");

// Initialize the necessary variables
let startTime, elapsedTime, interval;
let isRunning = false;

// Add click event listeners to all the buttons
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTimer);

// Function to start the timer
function startTimer() {
  // Disable the start button and enable the stop button
  startBtn.setAttribute("disabled", "true");
  stopBtn.removeAttribute("disabled");

  // Set the start time
  startTime = startTime || Date.now();

  // Set isRunning to true
  isRunning = true;

  // Start the interval timer to update the elapsed time display
  interval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timeDisplay.innerHTML = formatTime(elapsedTime);
  }, 1);
}

// Function to stop the timer
function stopTimer() {
  // Disable the stop button and enable the start button
  stopBtn.setAttribute("disabled", "true");
  startBtn.removeAttribute("disabled");

  // Clear the interval timer
  clearInterval(interval);

  // Set isRunning to false
  isRunning = false;
}

// Function to reset the timer
function resetTimer() {
  // Stop the timer
  stopTimer();

  // Reset the start time, elapsed time, and time display
  startTime = null;
  elapsedTime = 0;
  timeDisplay.innerHTML = "00:00.00";

  // Clear the laps list
  lapsList.innerHTML = "";
}

// Function to lap the timer
function lapTimer() {
  // Check if the timer is running
  if (!isRunning) {
    return;
  }

  // Calculate the lap time
  const lapTime = formatTime(elapsedTime);

  // Create a new list item for the lap time
  const lap = document.createElement("li");
  lap.innerHTML = lapTime;

  // Append the list item to the laps list
  lapsList.appendChild(lap);
}

// Function to format the elapsed time into a readable format
function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = ((time % 60000) / 1000).toFixed(2);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

resetTimer();
