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
  //initCheckInputKey();
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
  clearInput();
}

function initiateSaveAlarmButton() {
  saveAlarmButton.addEventListener("click", () => {
    getInputValue();
  });
}

function saveAlarmAnimation() {
  alarmContainer.style.backgroundColor = "#B97979";
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
  }, 300);
}

function getInputValue() {
  const hour = document.getElementById("input-hour").value;
  const min = document.getElementById("input-min").value;

  if (checkInputValue(hour, min)) {
    saveAlarmAnimation();
    setTimeout(() => {
      createAlarm(hour, min);
      returnToDashboard();
    }, 300);
  } else {
    clearInput();
  }
}

function checkInputValue(hour, min) {
  if (hour === "" || min === "") {
    return false;
  } else if (isNaN(hour.valueOf()) || isNaN(min.valueOf())) {
    return false;
  } else if (hour > 23 || hour < 0 || min > 59 || min < 0) {
    return false;
  } else {
    return true;
  }
}

function checkInput() {
  if (isNaN(input.value)) {
    clearInput();
  }
}

/* function initCheckInputKey() {
  const hour = document.getElementById("input-hour");
  const min = document.getElementById("input-min");
  const reg = new RegExp(/^\d+$/);
  hour.addEventListener("keydown", (event) => {
    if (event.target.valueOf() != reg) {
      clearInput();
    }
  });
  min.addEventListener("keydown", (event) => {
    if (event.target.valueOf() != reg) {
      clearInput();
    }
  });
} */

function clearInput() {
  let inputs = document.querySelectorAll(".alarm-input");
  inputs.forEach((input) => {
    input.value = "";
    input.style.color = "#3D3D3D";
  });
}

function createAlarm(hour, min) {
  alarms.push(new Alarm(hour, min));
  console.log(alarms);
  clearAlarmList();
}

function clearAlarmList() {
  document.querySelectorAll(".alarm-list-item").forEach((e) => e.remove());
  uppdateAlarmList();
}

function uppdateAlarmList() {
  for (let i = 0; i < alarms.length; i++) {
    if (alarms[i].delete === true) {
      alarms.splice(i, 1);
      clearAlarmList();
    } else if (alarms[i].delete === false) {
      createAlarmElements(alarms[i]);
    }
  }
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
  let deleteButton = document.createElement("button");
  deleteButton.className = "alarm-button";
  deleteButton.appendChild(createDeleteAlarmButtonImg());
  initDeleteAlarmButton(deleteButton, obj);
  return deleteButton;
}

function initDeleteAlarmButton(deleteButton, obj) {
  deleteButton.addEventListener("click", () => {
    obj.delete = true;
    clearAlarmList();
    console.log(obj);
  });
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
    element.style.backgroundColor = "#F1F5F9";
  }, 500);
}

initApp();
setInterval(setTime, 1000);
