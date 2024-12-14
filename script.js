// script.js

let timer;
let isRunning = false;
let pomodoroTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 15 * 60;
let remainingTime = pomodoroTime;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const alarm = document.getElementById("alarm");

const sessionButtons = document.querySelectorAll(".session-button");
const tasksList = document.getElementById("tasks");
const taskInput = document.getElementById("task-input");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("add-task").addEventListener("click", addTask);

// Session switching
sessionButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    switchSession(e.target.id);
    updateDisplay(); // Update timer display immediately when session is switched
  })
);

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
  }
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
}

function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  remainingTime = getCurrentSessionTime();
  updateDisplay();
}

function updateTimer() {
  if (remainingTime > 0) {
    remainingTime--;
    updateDisplay();
  } else {
    alarm.play();
    resetTimer();
  }
}

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function switchSession(sessionId) {
  sessionButtons.forEach((button) => button.classList.remove("active"));
  document.getElementById(sessionId).classList.add("active");

  if (sessionId === "pomodoro") {
    remainingTime = pomodoroTime;
  } else if (sessionId === "short-break") {
    remainingTime = shortBreakTime;
  } else if (sessionId === "long-break") {
    remainingTime = longBreakTime;
  }
}

function getCurrentSessionTime() {
  const activeButton = document.querySelector(".session-button.active").id;
  if (activeButton === "pomodoro") return pomodoroTime;
  if (activeButton === "short-break") return shortBreakTime;
  if (activeButton === "long-break") return longBreakTime;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const li = document.createElement("li");

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-task");
    deleteButton.addEventListener("click", () => li.remove());

    li.appendChild(taskContent);
    li.appendChild(deleteButton);
    tasksList.appendChild(li);

    taskInput.value = "";
  }
}
