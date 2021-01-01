"use strict";

const hoursSpan = document.getElementById("hour");
const minutesSpan = document.getElementById("minute");
const secondsSpan = document.getElementById("second");
const dateParagraf = document.getElementById("date");
const alarmContainer = document.getElementById("alarm-container");
const clockContainer = document.querySelector(".clock-container");
const newAlarmButton = document.getElementById("menu");
let alarms = [];

function Alarm() {
  this.active = true;
  this.alarmTime = false;

  function setActive(active) {
    this.active = active;
  }

  function getActive() {
    return this.active;
  }

  function setAlarmTime(alarmTime) {
    this.alarmTime = alarmTime;
  }

  function getAlarmTime() {
    return this.alarmTime;
  }
}

function initApp() {
  dateParagraf.textContent = getDate();
  setTime();
  initiateNewAlarmButton();
}

function getDate() {
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${date.getFullYear()}-${month}-${day}`;
}

function initiateNewAlarmButton() {
  newAlarmButton.addEventListener("click", () => {
    alarmContainer.style.display = "block";
    clockContainer.style.display = "none";
    newAlarmButton.style.display = "none";
    initiateExitAlarmButton();
  });
}

function initiateExitAlarmButton() {
  const exitAlarmButton = document.getElementById("exit-alarm-button");
  exitAlarmButton.style.display = "inline-block";
  
  exitAlarmButton.addEventListener("click", () => {
    clockContainer.style.display = "block";
    alarmContainer.style.display = "none";
    exitAlarmButton.style.display = "none";
    newAlarmButton.style.display = "inline-block";
  });
}

function setTime() {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  hoursSpan.textContent = `${hour}:`;
  if (hour < 10) {
    hoursSpan.textContent = `0${hour}:`;
  }

  minutesSpan.textContent = `${minute}:`;
  if (minute < 10) {
    minutesSpan.textContent = `0${minute}:`;
  }

  secondsSpan.textContent = `${second}`;
  if (second < 10) {
    secondsSpan.textContent = `0${second}`;
  }

  if (hour === 0 && minute === 0 && second === 0) {
    dateParagraf.textContent = getDate();
  } else if (hour === 23 && minute === 59 && second > 49) {
    transform();
  }
}

//last ten seconds every hour the
function transform() {
  let element = document.getElementById("container");
  element.style.backgroundColor = "#f8cbc9";

  setTimeout(() => {
    element.style.backgroundColor = "#CDE3CA";
  }, 500);
}

initApp();
setInterval(setTime, 1000);
