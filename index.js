"use strict";

const hoursSpan = document.getElementById("hour");
const minutesSpan = document.getElementById("minute");
const secondsSpan = document.getElementById("second");
const dateParagraf = document.getElementById("date");
const alarmContainer = document.getElementById("alarm-container");
const clockContainer = document.querySelector(".clock-container");
const newAlarmButton = document.getElementById("menu");
const saveAlarmButton = document.getElementById("save-alarm-button");
const exitAlarmButton = document.getElementById("exit-alarm-button");
let alarmList = document.getElementById("alarm-list");
let alarms = [];

function Alarm(hour, minute) {
  this.hour = hour;
  this.minute = minute;
  this.alarmTime = `${this.hour}:${this.minute}`;
  this.active = true;
  this.delete = false;
}

function initApp() {
  dateParagraf.textContent = getDate();
  setTime();
  initiateNewAlarmButton();
  initiateExitAlarmButton();
  initiateSaveAlarmButton();
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
    exitAlarmButton.style.display = "inline-block";
  });
}

function initiateExitAlarmButton() {
  exitAlarmButton.addEventListener("click", () => {
    returnToDashboard();
  });
}

function returnToDashboard() {
  clockContainer.style.display = "block";
  alarmContainer.style.display = "none";
  alarmContainer.style.backgroundColor = "#F8F1F1";
  alarmContainer.style.opacity = "100%";
  exitAlarmButton.style.display = "none";
  newAlarmButton.style.display = "inline-block";
}

function initiateSaveAlarmButton() {
  saveAlarmButton.addEventListener("click", () => {
    saveAlarmAnimation();
  });
}

function saveAlarmAnimation() {
  alarmContainer.style.backgroundColor = "#FADCDB";
  alarmContainer.style.opacity = "70%";

  setTimeout(() => {
    let inputs = document.querySelectorAll(".alarm-input");
    let placeholder = document.querySelectorAll("::placeholder");
    inputs.forEach((element) => {
      element.style.color = "white";
    });
    placeholder.forEach((element) => {
      element.style.color = "white";
    });

    returnToDashboard();
    setTimeout(() => {
      createAlarm();
    }, 350);
  }, 300);
}

function createAlarm() {
  alarms.push(new Alarm("22", "22"));
  console.log(alarms);
  clearAlarmList();
  uppdateAlarmList();
}

function clearAlarmList() {
  document.querySelectorAll(".alarm-list-item").forEach((e) => e.remove());
}

function uppdateAlarmList() {
  alarms.forEach((alarm) => {
    if (alarm.delete === false) {
      createAlarmElements(alarm);
    } else if (alarm.delete === false) {
    }
  });
}

function createAlarmElements(obj) {
  alarmList.prepend(createAlarmListItem(obj));
}

function createAlarmListItem(obj) {
  const alarmListItem = document.createElement("li");
  alarmListItem.className = "alarm-list-item";
  alarmListItem.appendChild(createActiveButton(obj));
  alarmListItem.appendChild(createAlarmHeader(obj));
  alarmListItem.appendChild(createDeleteAlarmButton(obj));
  return alarmListItem;
}

function createAlarmHeader(obj) {
  const alarmHeader = document.createElement("h5");
  alarmHeader.textContent = obj.alarmTime;
  return alarmHeader;
}

function createActiveButton() {
  const activeButton = document.createElement("button");
  activeButton.className = "alarm-button";
  activeButton.appendChild(createActiveButtonImg());
  return activeButton;
}

function createActiveButtonImg() {
  const activeImg = document.createElement("img");
  activeImg.src = "/media/alarm-fill.svg";
  return activeImg;
}

function createDeleteAlarmButton(obj) {
  const deleteButton = document.createElement("button");
  deleteButton.className = "alarm-button";
  deleteButton.appendChild(createDeleteAlarmButtonImg());
  return deleteButton;
}

function createDeleteAlarmButtonImg() {
  const deleteImg = document.createElement("img");
  deleteImg.src = "/media/x.svg";
  return deleteImg;
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
